/**
 * @fileoverview  Upload component
 * @author        Dr. J. Quader
 * @copyright     © 2013-2024 by J. Quader
 */
import React, { useRef, useState } from 'react'

import DoneIcon from '@mui/icons-material/Done'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export const Upload = () => {
  const inputEl = useRef(null)
  const [result, setResult] = useState([])
  const [error, setError] = useState()
  const [uploadedFilenames, setUploadedFilenames] = useState([])

  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const xhr = useRef(null)

  async function onChange({ target: { validity, files } }) {
    if (validity.valid && files.length) {
      setUploading(true)
      setProgress(0)

      // Define the GraphQL mutation matching your schema
      const operations = {
        query: `
          mutation UploadFiles($files: [Upload!]!, $bucketName: String) {
            uploadFiles(files: $files, bucketName: $bucketName) {
              id
              thumbId
              filename
              status
              reason
            }
          }
        `,
        variables: {
          files: Array.from(files).map(() => null),
          bucketName: 'video'
        } // Adapt 'bucketName' as necessary
      }

      const map = {}
      Array.from(files).forEach((_, index) => {
        map[index] = [`variables.files.${index}`]
      })

      const formData = new FormData()
      formData.append('operations', JSON.stringify(operations))
      formData.append('map', JSON.stringify(map))
      Array.from(files).forEach((file, index) => {
        formData.append(index.toString(), file as Blob)
      })

      const filenames = Array.from(files as File[]).map((file) => file?.name)
      setUploadedFilenames(filenames) // Store filenames in state

      xhr.current = new XMLHttpRequest()
      xhr.current.open('POST', 'http://localhost:3040/graphql', true) // Adjust the URL to your GraphQL endpoint

      xhr.current.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100
          setProgress(percentComplete)
        }
      }

      xhr.current.onload = () => {
        if (xhr.current.status === 200) {
          const response = JSON.parse(xhr.current.responseText)
          const uploadedFiles = response?.data?.uploadFiles
          setResult(uploadedFiles)
          setUploading(false)
        } else {
          setError(xhr.current.statusText)
          setUploading(false)
        }
      }

      xhr.current.onerror = () => {
        setError(xhr.current.statusText)
        setUploading(false)
      }

      xhr.current.send(formData)
    }
  }

  const cancelUpload = async () => {
    if (xhr.current) {
      xhr.current.abort()
      setUploading(false)
      setProgress(0)
      setResult([])
      setError(null)
      if (inputEl.current) {
        inputEl.current.value = ''
      }

      // Assuming 'uploadedFilenames' stores filenames of successfully uploaded files
      if (uploadedFilenames.length > 0) {
        const deleteMutation = `
        mutation DeleteFileByFilename($filename: String!) {
          deleteFileByFilename(filename: $filename) {
            success
            message
          }
        }
      `

        // Issue a delete request for each uploaded file
        uploadedFilenames.forEach(async (filename) => {
          try {
            const response = await fetch('http://localhost:3040/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify({
                query: deleteMutation,
                variables: { filename }
              })
            })

            const result = await response.json()
            if (result.data.deleteFileByFilename) {
              console.log('File deleted successfully')
            } else {
              console.log('Failed to delete the file')
            }
            // Handle response
          } catch (error) {
            console.error('Error deleting file:', error)
            // Handle error
          }
        })

        // Reset the stored filenames after attempting deletion
        setUploadedFilenames([])
      }
    }
  }

  return (
    <Paper elevation={1} sx={{ padding: 2, mt: 2, minWidth: 500 }}>
      <Button variant="contained" component="label" fullWidth disableElevation>
        Upload
        <input
          hidden
          type="file"
          ref={inputEl}
          required
          accept="video/*"
          onChange={onChange}
        />
      </Button>

      {uploading && <LinearProgress variant="determinate" value={progress} />}

      {result.length > 0 && (
        <List>
          {result?.map((r, index) => {
            return (
              <ListItem
                key={index}
                sx={{
                  px: 2,
                  borderRadius: 2,
                  backgroundColor: (theme) =>
                    r?.reason
                      ? theme.palette.error.light
                      : theme.palette.grey[200],
                  borderWidth: r?.reason ? 1 : 0,
                  borderStyle: 'solid',
                  borderColor: (theme) =>
                    r?.reason ? theme.palette.error.dark : 'inherit',
                  color: (theme) =>
                    r?.reason ? theme.palette.error.contrastText : 'inherit'
                }}
              >
                <ListItemIcon>
                  {r?.reason || error ? (
                    <ErrorOutlineIcon
                      sx={{
                        // color: (theme) => theme.palette.error.contrastText
                        color: 'red'
                      }}
                    />
                  ) : (
                    <DoneIcon color="success" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={`${r?.filename ? r?.filename : ''} ${
                    r?.reason ? `- ${r?.reason}` : ``
                  }`}
                />
              </ListItem>
            )
          })}
        </List>
      )}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={uploading}
        transitionDuration={500}
      >
        <Box>
          <CircularProgress
            color="inherit"
            sx={{ display: 'block', margin: 'auto', mb: 2 }}
            size={80}
          />
          <Typography variant="body1">
            Uploading {Math.round(progress)}%
          </Typography>
          <Button
            onClick={cancelUpload}
            className="btn btn-primary"
            sx={{ mt: 2 }}
            variant="contained"
          >
            Cancel Upload
          </Button>
        </Box>
      </Backdrop>
    </Paper>
  )
}

export default Upload

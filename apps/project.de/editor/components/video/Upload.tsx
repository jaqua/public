/**
 * @fileoverview  Upload component
 * @author        Dr. J. Quader
 * @copyright     © 2013-2024 by J. Quader
 */
import React, { useRef } from 'react'

import { resolve } from 'path'

import DoneIcon from '@mui/icons-material/Done'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import {
  GetFilesDocument,
  UploadResult,
  useUploadFilesMutation
} from '@jaqua/project.de/graphql'

export type Props = {
  id?: string
}

const testing = async () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      resolve('File was found')
    }, 500)
    setTimeout(() => {
      rej('File not found')
    }, 1000)
  })

export const Upload = ({ id }: Props) => {
  const inputEl = useRef(null)
  const [upload] = useUploadFilesMutation({
    refetchQueries: [
      {
        query: GetFilesDocument
      }
    ]
  })

  const [result, setResult] = React.useState<Array<UploadResult>>([])
  const [uploading, setUploading] = React.useState<boolean>(false)

  async function onChange({ target: { validity, files } }) {
    const bucketName = 'video'

    console.log(validity, Array.from(files))

    // const state = true
    // if (state) return state

    if (validity.valid && files?.[0]) {
      setUploading(true)
      try {
        // Upload file
        const {
          data: { uploadFiles: resultUpload }
        } = await upload({
          variables: { files, bucketName }
        })
        setResult(resultUpload)

        // Display results
        if (resultUpload.find((d) => d.reason)) {
          setResult(resultUpload)
        }
      } catch (error) {
        inputEl.current.value = ''
        console.error(error)
        setUploading(false)
      } finally {
        setUploading(false)
        inputEl.current.value = ''
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
          accept="video"
          onChange={onChange}
        />
      </Button>

      <Button
        onClick={() => {
          testing()
            .then((res) => console.log(res))
            .catch((err) => {
              try {
                throw 'File not found'
              } catch (error) {
                console.error(error)
                console.error(err)
              }
            })
        }}
        variant="contained"
        component="label"
        fullWidth
        disableElevation
      >
        Press Me
      </Button>

      {result ? (
        <List>
          {result.map((r) => (
            <ListItem
              key={r.filename}
              sx={{
                px: 2,
                borderRadius: 2,
                backgroundColor: (theme) =>
                  r.reason
                    ? theme.palette.error.light
                    : theme.palette.grey[200],
                borderWidth: r.reason ? 1 : 0,
                borderStyle: 'solid',
                borderColor: (theme) =>
                  r.reason ? theme.palette.error.dark : 'inherit',
                color: (theme) =>
                  r.reason ? theme.palette.error.contrastText : 'inherit'
              }}
            >
              <ListItemIcon>
                {r.reason ? (
                  <ErrorOutlineIcon
                    sx={{
                      color: (theme) => theme.palette.error.contrastText
                    }}
                  />
                ) : (
                  <DoneIcon color="success" />
                )}
              </ListItemIcon>
              {/* <ListItemText
                primary={r.filename + ' ' + (r.reason ? '- ' + r.reason : '')}
              /> */}
              <pre>
                <code>{JSON.stringify(r, null, 2)}</code>
              </pre>
            </ListItem>
          ))}
        </List>
      ) : null}

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
          <Typography variant="body1">Uploading</Typography>
        </Box>
      </Backdrop>
    </Paper>
  )
}

export default Upload

import { forwardRef } from 'react'

import { GridFSBucket, GridFSFile, MongoServerError, ObjectId } from 'mongodb'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { ThemeProvider } from '@mui/material/styles'

import { mongodb } from '@jaqua/db'
import { theme } from '@jaqua/shared/util/theme'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const getServerSideProps: GetServerSideProps = async ({
  res,
  req,
  query: { hash }
}) => {
  if (!hash) return { notFound: true }

  try {
    const database = await mongodb()
    const Videos = database.collection('videos')

    const { fileId, link } =
      ((await Videos.findOne({ uid: hash })) as any) || {}

    if (fileId) {
      const bucket = new GridFSBucket(database)
      const id = new ObjectId(fileId)
      const files: GridFSFile[] = await bucket.find({ _id: id }).toArray()
      const file = files[0]
      const { contentType, length } = file || {}

      if (!file)
        return {
          props: {
            error: { statusCode: 404, message: 'Mediafile not found' }
          }
        }
      if (!contentType)
        return {
          props: {
            error: { statusCode: 400, message: 'Missing Content-Type of file' }
          }
        }

      // Send header
      const header = { 'Content-Type': contentType }
      let status = 200
      let options = {}
      if (contentType === 'video/mp4') {
        const { range = '' } = req.headers
        const start = Number(range.replace(/\D/g, ''))
        const end = length - 1
        const contentLength = end - start + 1
        status = 206
        header['Content-Length'] = contentLength
        header['Content-Range'] = `bytes ${start}-${end}/${length}`
        header['Accept-Ranges'] = 'bytes'
        options = { start, end: end + 1 }
      }
      res.writeHead(status, header)

      // Stream data
      bucket
        .openDownloadStream(id, options)
        .on('data', (chunk) => {
          res.write(chunk)
        })
        .on('end', () => {
          res.end()
        })
        .on('error', (err) => {
          throw err
        })
    } else if (link) {
      return {
        redirect: {
          destination: link,
          permanent: false
        }
      }
    }

    return {
      props: {}
    }
  } catch (error) {
    if (error instanceof MongoServerError) {
      console.error(error)
    }
    throw error
  }
}

const HashPage: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Link manager</title>
      </Head>
      <Alert severity="error">
        <AlertTitle>Es ist ein Fehler aufgetreten</AlertTitle>
        Der Link existiert nicht
      </Alert>
    </ThemeProvider>
  )
}

export default HashPage

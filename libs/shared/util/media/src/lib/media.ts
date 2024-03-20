/**
 * @fileoverview  Media utilities
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import ffmpeg, { FfprobeData } from 'fluent-ffmpeg'
import { ReadStream, createWriteStream, renameSync, unlinkSync } from 'fs'
import type { FileUpload } from 'graphql-upload/processRequest'
import { Db, GridFSBucket, GridFSBucketReadStream } from 'mongodb'

import { File, FileMetadata, UploadResult } from '@jaqua/shared/graphql'

/**
 * Returns an object array with upload results of each file.
 * Can be used to use the results in frontend
 * @param iterable Array of upload files
 * @param func upload function
 * @returns Result object array
 */
export async function mapSequential(
  iterable: Array<Promise<File>>,
  func: (value: Promise<File>) => Promise<Record<string, string>>
): Promise<Array<UploadResult>> {
  const result: Array<UploadResult> = []
  for (const item of iterable) {
    try {
      const { id, thumbId, filename } = await func(item)
      result.push({ id, thumbId, filename, status: 'uploaded' })
    } catch ({ filename, reason }) {
      // no file id as upload failed
      result.push({ filename, status: 'rejected', reason })
    }
  }
  return result
}

/**
 * Get video metadata
 * @param stream ReadStream
 * @returns Metadata object
 */
export async function getVideoMetadata(
  stream: FileUpload
): Promise<FfprobeData> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(stream, (err, metadata) => {
      if (err) {
        console.error(err)
        return reject(err)
      }
      resolve(metadata)
    })
  })
}

export const createTemporaryFile = async (
  readStream: GridFSBucketReadStream,
  path: string
): Promise<void> => {
  try {
    await new Promise<void>((resolve) => {
      console.log('Create temporary file ' + path)

      const writeStream = createWriteStream(path)
      readStream.pipe(writeStream)
      writeStream.on('finish', resolve)
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

type Result = {
  path: string
  dimension: Array<number>
  mimetype: string
  codec: string
}
export async function reencodeVideo(
  readStream: GridFSBucketReadStream,
  filename: string,
  contentType: string,
  codec_name: string,
  hash: string,
  width: number,
  dimension: Array<number>
): Promise<Result> {
  const path = 'tmp/' + filename
  const output = 'tmp/' + hash + '.mp4'

  await createTemporaryFile(readStream, path)
  if (contentType === 'video/mp4' && codec_name === 'h264' && width <= 1280) {
    renameSync(path, output)
    return { path: output, dimension, mimetype: contentType, codec: codec_name }
  }

  return new Promise((resolve, reject) => {
    console.log('Start encoding video ' + filename)

    ffmpeg(path)
      .outputFormat('mp4')
      .videoCodec('libx264')
      .audioCodec('aac')
      .size(dimension.join('x'))
      .outputOptions(['-movflags', '+faststart', '-preset', 'veryfast'])
      .on('end', async function () {
        console.log('Re-encoding succeeded: ' + output)
        unlinkSync(path)
        console.log('Temporary file ' + path + ' deleted')
        resolve({
          path: output,
          dimension,
          mimetype: 'video/mp4',
          codec: 'h264'
        })
      })
      .on('error', (err) => {
        reject(new Error(err))
      })
      .save(output)
  })
}

export async function createLocalScreenshot(
  hash: string,
  position?: number
): Promise<string> {
  const folder = 'tmp'
  const filename = hash + '.png'
  return new Promise((resolve, reject) => {
    console.log('Start creating screenshot ' + filename)

    ffmpeg(folder + '/' + hash + '.mp4')
      .screenshots({
        timestamps: position ? [position] : ['50%'],
        filename,
        folder
      })
      .on('end', () => {
        console.log('Screenshot created')
        resolve(folder + '/' + filename)
      })
      .on('error', (error) => {
        console.error('Error generating screenshot', error)
        reject(error)
      })
  })
}

export async function uploadFileToGridFS(
  db: Db,
  readStream: ReadStream,
  filename: string,
  contentType: string,
  metadata: FileMetadata,
  path?: string,
  bucketName?: string
): Promise<string> {
  const options = bucketName ? { bucketName } : {}
  const bucket = new GridFSBucket(db, options)

  const writeStream = bucket.openUploadStream(filename, {
    contentType,
    metadata
  })

  return new Promise((resolve, reject) => {
    writeStream
      .on('finish', async (file: FileUpload) => {
        console.log(
          filename +
            ' uploaded to GridFS ' +
            (bucketName ? '(bucket: ' + bucketName + ')' : '') +
            ' as ' +
            contentType
        )
        if (path) {
          unlinkSync(path)
          console.log('Temporary file ' + path + ' deleted')
        }

        const fileId = file._id.toString()
        resolve(fileId)
      })
      .on('error', (error) => {
        console.error(error)
        reject(error)
      })

    readStream
      .on('error', (error) => {
        writeStream.destroy(error)
        reject(error)
      })
      .pipe(writeStream)
  })
}

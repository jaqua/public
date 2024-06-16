/**
 * @fileoverview  Upload service
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import { Inject, Injectable } from '@nestjs/common'
import fs from 'fs'
import type { FileUpload } from 'graphql-upload/processRequest'
import { Db, GridFSBucket, ObjectId } from 'mongodb'
import path from 'path'

import { File, FileMetadata, UploadResult } from '@jaqua/project.de/graphql'
import { getHash } from '@jaqua/shared/util/generator'
import {
  createLocalScreenshot,
  getVideoMetadata,
  mapSequential,
  reencodeVideo,
  uploadFileToGridFS
} from '@jaqua/shared/util/media'

@Injectable()
export class UploadService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db
  ) {}
  // const gridFs = new GridFSBucket(this.db, { bucketName })

  // gridFs.openDownloadStream(video._id as unknown as ObjectId)
  async getFile(res: Response) {
    const bucketName = 'video'
    const Files = this.db.collection<File>(
      bucketName ? bucketName + '.files' : 'fs.files'
    )

    console.log(Files, 'files collection')
    try {
      const videoId = '666eaafa7137e9e22583b2cd'
      // @ts-expect-error types are wrong
      const video = await Files.findOne({ _id: new ObjectId(videoId) })

      console.log({ video })

      const gfs = new GridFSBucket(this.db, { bucketName })
      const stream = gfs.openDownloadStreamByName(video.filename, { start: 0 })

      const tempPath = path.resolve(__dirname, 'temporary')

      if (!fs.existsSync(tempPath)) {
        fs.mkdirSync(tempPath)
      }

      stream.pipe(fs.createWriteStream(path.resolve(tempPath, video.filename)))
      return video
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async uploadFiles(
    files: Array<Promise<File>>,
    bucketName?: string
  ): Promise<Array<UploadResult>> {
    if (!files?.length) return

    const Files = this.db.collection<File>(
      bucketName ? bucketName + '.files' : 'fs.files'
    )

    try {
      const upload = async (
        file: FileUpload
      ): Promise<Record<string, string>> => {
        const res: Record<string, string> = await new Promise(
          // eslint-disable-next-line no-async-promise-executor
          async (resolve, reject) => {
            const { filename, mimetype, createReadStream } = await file
            if (!filename || !mimetype || !createReadStream)
              return reject({ filename, reason: 'File could not be resolved' })

            // Check if file is already existing
            const isExisting = await Files.findOne({ filename })
            if (isExisting)
              return reject({ filename, reason: 'File is existing' })

            const metadata: FileMetadata = {}
            let contentType = mimetype
            let readStream = createReadStream()
            let pathToLocalVideofile = null

            const videoMetadata = await getVideoMetadata(createReadStream())
            const { format, streams } = videoMetadata || {
              format: {},
              streams: [{}]
            }
            const createdAt = format.tags?.creation_time
            const { codec_name, width, height } = streams.filter(
              (s) => s.codec_type === 'video'
            )[0] as any
            const w = width <= 1280 ? width : 1280
            const h = height * (w / width)
            const hash = getHash()

            const {
              path,
              dimension,
              mimetype: mType,
              codec
            } = await reencodeVideo(
              readStream,
              filename,
              contentType,
              codec_name,
              hash,
              width,
              [w, h]
            )

            contentType = mType
            pathToLocalVideofile = path
            metadata['width'] = dimension[0]
            metadata['height'] = dimension[1]
            metadata['codec'] = codec
            metadata['duration'] = format.duration
            if (createdAt) metadata['createdAt'] = new Date(createdAt)

            readStream = fs.createReadStream(pathToLocalVideofile)

            // Create local screenshot file
            const pathToLocalScreenshot = await createLocalScreenshot(hash)

            // And save screenshot file to db
            const thumbId = await uploadFileToGridFS(
              this.db,
              fs.createReadStream(pathToLocalScreenshot),
              'tn.png',
              'image/png',
              {
                width: metadata.width,
                height: metadata.height
              },
              pathToLocalScreenshot,
              bucketName
            )
            metadata['screenshotId'] = thumbId
            metadata['filename'] = filename

            const fileId = await uploadFileToGridFS(
              this.db,
              readStream,
              filename,
              contentType,
              metadata,
              pathToLocalVideofile,
              bucketName
            )

            resolve({ id: fileId, thumbId, filename })
          }
        )
        return res
      }

      return mapSequential(files, upload)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

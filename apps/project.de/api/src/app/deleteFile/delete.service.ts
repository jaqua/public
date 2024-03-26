// delete.service.ts
import { Inject, Injectable } from '@nestjs/common'
import fs from 'fs/promises'
import { Db } from 'mongodb'
import path from 'path'

@Injectable()
export class DeleteService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  async deleteFile(filename: string): Promise<boolean> {
    try {
      const File = this.db.collection<File>('video.files') // Adjust 'files' to your actual collection name
      const file = await File.findOne({ filename })

      if (!file) {
        console.log('File not found in database:', filename)
        return false
      }

      // Path to the tmp directory where files are stored
      const tmpDirPath = path.join(__dirname, '../../tmp')

      // Deleting the specific file, assuming filename is unique or a specific identifier
      const filePath = path.join(tmpDirPath, filename)
      await fs
        .unlink(filePath)
        .catch((error) =>
          console.error(`Error deleting file: ${filePath}`, error)
        )

      // Delete the file metadata from the database
      await File.deleteOne({ filename })

      return true
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  }
}

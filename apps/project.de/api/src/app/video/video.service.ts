/**
 * @author        Dr. J. Quader
 * @copyright     © 2024 by J. Quader
 */
import { Inject, Injectable } from '@nestjs/common'
import { assert } from 'check-types'
import { Db } from 'mongodb'

import { updateVersion } from '@jaqua/db'
import { Video, VideoUpdateContentInput } from '@jaqua/project.de/graphql'

@Injectable()
export class VideoService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db
  ) {}

  /**
   * Update video script
   * @param {string} id
   * @param {string} content
   * @returns {number} updated documents
   */
  async videoUpdateContent({
    id,
    content
  }: VideoUpdateContentInput): Promise<number> {
    assert.string(id)
    assert.string(content)

    const Videos = this.db.collection<Video>('content')

    try {
      const { modifiedCount } = (await Videos.updateOne(
        { id },
        {
          $set: { content }
        }
      )) || { modifiedCount: 0 }

      if (modifiedCount) await updateVersion(this.db, 'patch')

      return modifiedCount
    } catch (error) {
      console.error(error)
    }
  }
}

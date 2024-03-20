/**
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import { Inject, Injectable } from '@nestjs/common'
import { assert } from 'check-types'
import { Db, ObjectId } from 'mongodb'

import { updateVersion } from '@jaqua/db'
import {
  Notecard,
  NotecardAddInput,
  NotecardContentParam,
  NotecardRemoveInput,
  NotecardUpdateInput,
  User
} from '@jaqua/project.de/graphql'
import { generateSlug, getHash } from '@jaqua/shared/util/generator'

@Injectable()
export class NotecardService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db
  ) {}

  /**
   * Get list of notecard datasets
   * @returns {Notecard[]} Array with notecards dataset
   */
  async notecardList(): Promise<Array<Notecard>> {
    const Content = this.db.collection<Notecard>('content')

    try {
      const result = await Content.find({ type: 'notecard' }).toArray()
      return result
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Get specific notecard dataset.
   * @param {'id','slug'} name
   * @param {string} value
   * @return {Notecard}
   */
  async notecardContent(
    { name, value, testId }: NotecardContentParam,
    userId
  ): Promise<Notecard> {
    assert.string(name)
    assert.string(value)
    assert.maybe.string(testId)
    assert.maybe.string(userId)
    // assert.in(type, ['doctor', 'nurse', 'parent'])

    const Content = this.db.collection<Notecard>('content')
    const Users = this.db.collection<User>('users')
    const type = 'doctor'

    try {
      let training
      const { id, title, slug, category, synonyms, intro, ...content } =
        await Content.findOne({ [name]: value, type: 'notecard' })

      if (userId) {
        const user: any = await Users.findOne({ _id: new ObjectId(userId) })
        if (user?.training)
          training = user?.training.find(
            (d) => d.type === 'notecard' && d.id === testId
          )
      }

      return {
        id,
        title,
        slug,
        category,
        synonyms,
        intro,
        content: content[type],
        training
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Add new notecard dataset to db
   * @param {NotecardAddInput} input
   * @returns {string} ID of new dataset
   */
  async notecardAdd(
    { title, content, type, ...data }: NotecardAddInput,
    { username }: { username: string }
  ): Promise<string> {
    assert.in(type, ['doctor', 'nurse', 'parent'])
    assert.string(username)

    const Content = this.db.collection<Notecard>('content')
    const Users = this.db.collection<User>('users')
    const id = getHash()

    try {
      const { professionalGroup } = (await Users.findOne({ username })) || {}
      if (!professionalGroup) throw Error('Wrong user data')

      const date = new Date()
      const doc = {
        id,
        title,
        slug: generateSlug(title),
        type: 'notecard',
        [professionalGroup]: content,
        createdAt: date,
        updatedAt: date,
        ...data
      }
      const { insertedId } = (await Content.insertOne(doc)) || {
        insertedId: null
      }

      if (insertedId) {
        await updateVersion(this.db, 'minor')
        return id
      }
      return ''
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Update notecard dataset
   * @param {NotecardUpdateInput} input
   * @returns {string} Number of updated datasets
   */
  async notecardUpdate(
    { id, type, content, ...update }: NotecardUpdateInput,
    { username }
  ): Promise<number> {
    assert.in(type, ['doctor', 'nurse', 'parent'])
    assert.string(username)

    const Content = this.db.collection<Notecard>('content')
    const Users = this.db.collection<User>('users')

    try {
      const { professionalGroup } = (await Users.findOne({ username })) || {}
      if (!professionalGroup) throw Error('Wrong user data')

      const { modifiedCount } = (await Content.updateOne(
        { id },
        {
          $set: {
            [professionalGroup]: content,
            slug: generateSlug(update.title),
            ...update,
            updatedAt: new Date()
          }
        }
      )) || { modifiedCount: 0 }

      if (modifiedCount) await updateVersion(this.db, 'patch')

      return modifiedCount
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Remove notecard dataset
   * @param {string} id
   * @returns {boolean}
   */
  async notecardRemove({ id }: NotecardRemoveInput): Promise<boolean> {
    assert.string(id)

    const Content = this.db.collection<Notecard>('content')

    try {
      const { deletedCount } = (await Content.deleteOne({ id })) || {
        deletedCount: 0
      }

      if (deletedCount) await updateVersion(this.db, 'minor')

      return deletedCount > 0
    } catch (error) {
      console.error(error)
    }
  }
}

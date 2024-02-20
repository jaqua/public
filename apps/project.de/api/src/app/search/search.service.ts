/**
 * @fileoverview  GraphQL services for search module
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import { Inject, Injectable } from '@nestjs/common'
import { assert } from 'check-types'
import { Db } from 'mongodb'

import { ContentDataset } from '@jaqua/shared/graphql'

export type SearchQuery = {
  title?: { $regex: RegExp }
  synonyms?: { $regex: RegExp }
}

@Injectable()
export class SearchService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db
  ) {}

  /**
   * Resolve search result list.
   * @param {Object} input
   * @param {string} input.term - Search term
   * @param {string} input.target - User type
   * @return {Array}
   */
  async search({ term, target }): Promise<Array<any>> {
    assert.string(term)
    assert.string(target)

    const Content = this.db.collection<ContentDataset>('content')

    try {
      const regSearch = { $regex: new RegExp(term, 'i') }
      const query = {
        $or: [{ title: regSearch }, { synonyms: regSearch }]
      }

      const projection = {
        title: 1,
        type: 1,
        slug: 1,
        category: 1,
        synonyms: 1,
        isEdited: 1,
        isReviewed: 1,
        isFinalized: 1
      }

      const q = Content.find(query)
      // User should only get title and type of finalized datasets via search module
      const result = await q.project(projection).toArray()
      return result
    } catch (error) {
      console.error(error)
    }
  }

  async getList({ type }): Promise<Array<any>> {
    assert.string(type)

    const Content = this.db.collection<ContentDataset>('content')

    try {
      const query: any = {
        slug: { $exists: true },
        type: type === 'all' ? { $exists: true } : type
      }
      const projection = {
        _id: 0,
        id: 1,
        title: 1,
        slug: 1,
        type: 1
      }

      const result = await Content.find(query).project(projection).toArray()
      return result
    } catch (error) {
      console.error(error)
    }
  }
}

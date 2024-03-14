/**
 * @fileoverview  Factories to build fixture data
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import { Factory } from 'fishery'

import { Notecard, Video } from '@jaqua/project.de/graphql'
import { userFactory } from '@jaqua/shared/util/factories'
import { getHash } from '@jaqua/shared/util/generator'

export const notecardFactory = Factory.define<Notecard>(({ sequence }) => ({
  id: getHash(),
  title: 'notecard ' + sequence,
  slug: 'notecard-' + sequence,
  category: ['cat 1'],
  synonyms: ['syn'],
  type: 'notecard',
  content: ''
}))

export const videoFactory = Factory.define<Video>(({ sequence }) => ({
  id: getHash(),
  type: 'video',
  title: 'video ' + sequence,
  slug: 'video-' + sequence
}))

export const fixtures = () => {
  return {
    users: userFactory.buildList(1)
  }
}

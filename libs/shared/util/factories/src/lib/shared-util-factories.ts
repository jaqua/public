/**
 * @fileoverview  Factories to build fixture data
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import bcrypt from 'bcryptjs'
import { Factory } from 'fishery'

import { Notecard } from '@jaqua/project.de/graphql'
import { User } from '@jaqua/shared/graphql'
import { generateSlug, getHash } from '@jaqua/shared/util/generator'

export const userFactory = Factory.define<User>(() => {
  const user: User = {
    username: 'admin',
    password: bcrypt.hashSync('admin', 10),
    createdAt: new Date(),
    roles: ['admin', 'editor', 'user'],
    professionalGroup: 'doctor'
  }

  return user
})

export const contentFactory = Factory.define<Notecard>(({ params }) => {
  const id = getHash()
  const date = new Date()
  const title = 'Example'
  const user: Notecard = {
    id,
    title,
    slug: generateSlug(title),
    type: 'notecard',
    intro: 'Intro',
    synonyms: ['synonym'],
    category: ['category'],
    content: '',
    createdAt: date,
    updatedAt: date
  }

  return user
})

export const fixtures = () => {
  return {
    users: [userFactory.build()],
    content: [contentFactory.params({ type: 'notecard' }).build()]
  }
}

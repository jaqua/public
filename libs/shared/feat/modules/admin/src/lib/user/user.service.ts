/**
 * @fileoverview  User services
 * @author        Dr. J. Quader
 * @copyright     © 2020-2023 by J. Quader
 */
import { Inject, Injectable } from '@nestjs/common'
import bcrypt from 'bcryptjs'
import check from 'check-types'
import { Db } from 'mongodb'

import {
  AddUserInput,
  ChangePwdInput,
  RemoveUserInput,
  ResetPwdInput,
  User,
  UserData,
  UserParam,
  UserUpdateInput
} from '@jaqua/shared/graphql'
import { getHash } from '@jaqua/shared/util/generator'

export const INITIAL_PWD = 'in1tlp@sswd'

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db
  ) {}

  async getUsers(): Promise<Array<User>> {
    const Users = this.db.collection<User>('users')
    const result = await Users.find({}, { sort: { username: 1 } }).toArray()
    return result.map((user) => ({ id: user._id.toString(), ...user }))
  }

  async getUser({ username }: UserParam): Promise<UserData | null> {
    const Users = this.db.collection<UserData>('users')
    const data = await Users.findOne({ username })
    return data
  }

  /**
   * Add new user
   * @param {Object} input
   * @param {string} input.username - Username
   * @param {string[]} input.roles - User roles
   * @param {string} [input.professionalGroup] - Needed for neonatologie.de user
   * @returns ID of new user dataset
   */
  async addUser({
    username,
    roles,
    professionalGroup
  }: AddUserInput): Promise<string> {
    check.assert.string(username)
    check.assert.array.of.string(roles)

    const Users = this.db.collection('users')

    const isExisting = await Users.findOne({ username })
    if (isExisting) throw Error('User is already existing')

    const id = getHash()
    const doc: User = {
      id,
      username,
      password: bcrypt.hashSync(username, 10),
      roles,
      createdAt: new Date()
    }

    if (professionalGroup) doc.professionalGroup = professionalGroup

    const { insertedId } = (await Users.insertOne(doc)) || {}
    return insertedId?.toString()
  }

  async userUpdate({ username, ...update }: UserUpdateInput): Promise<boolean> {
    check.assert.string(username)

    const Users = this.db.collection('users')

    const { modifiedCount } =
      (await Users.updateOne({ username }, { $set: { ...update } })) || {}
    return Boolean(modifiedCount)
  }

  /**
   * Remove user
   * @param {Object} input
   * @param {string} input.username - Username
   * @returns {boolean}
   */
  async removeUser({ username }: RemoveUserInput): Promise<boolean> {
    check.assert.string(username)

    const Users = this.db.collection('users')

    const { deletedCount } = (await Users.deleteOne({ username })) || {}
    return Boolean(deletedCount)
  }

  /**
   * Change user password. On client the user gets redirected to login page.
   * @param {Object} input
   * @param {string} input.username - Username
   * @param {string} input.password - User password
   * @returns {boolean} Successful update
   */
  async changePwd({ username, password }: ChangePwdInput): Promise<boolean> {
    check.assert.string(username)
    check.assert.string(password)

    const Users = this.db.collection('users')
    const { modifiedCount } = await Users.updateOne(
      { username },
      { $set: { password: bcrypt.hashSync(password, 10) } }
    )
    return Boolean(modifiedCount)
  }

  /**
   * Reset user password.
   * @param {Object} input
   * @param {string} input.username - Username
   * @returns {boolean} Successful update
   */
  async resetPwd({ username }: ResetPwdInput): Promise<boolean> {
    check.assert.string(username)

    const Users = this.db.collection('users')

    const { modifiedCount } = await Users.updateOne(
      { username },
      { $set: { password: bcrypt.hashSync(INITIAL_PWD, 10) } }
    )
    return Boolean(modifiedCount)
  }
}

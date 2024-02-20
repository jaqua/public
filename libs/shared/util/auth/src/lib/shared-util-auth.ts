import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

enum UserRole {
  User = 'user',
  Editor = 'editor',
  Expert = 'expert',
  Translator = 'translator',
  Admin = 'admin'
}

/**
 * Check if user has needed role to pass the role guard
 * @param {string[]} roles Roles needed to pass this role guard
 * @param {string[]} userRoles Roles of current user
 * @returns {boolean}
 */
export const hasRole = (roles: string[], userRoles: string[]): boolean =>
  userRoles?.some((role) => !!roles.find((item) => item === role))

/**
 * Generate sample user dataset document by a given username. The password is a
 * bcrype hashed value of the username.
 * @summary Generate sample user dataset.
 * @param {string} username
 * @returns {User} User dataset document
 */
export const generateUser = (username: string) => {
  const roles = ['user', 'editor', 'expert', 'translator', 'admin']

  return {
    userId: nanoid(),
    username,
    password: bcrypt.hashSync(username, 10),
    createdAt: new Date(),
    speciality: ['paediatrics'],
    language: 'de',
    roles: roles.indexOf(username) > -1 ? [username] : []
  }
}

import bcrypt from 'bcryptjs'
import check from 'check-types'
import jwt from 'jsonwebtoken'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { mongodb } from '@jaqua/db'
import { User } from '@jaqua/shared/graphql'

export const INITIAL_PWD = 'in1tlp@sswd'

/**
 * Authorize function, which is used by nextAuth.
 * Get user dataset from db and validate password for authorization.
 * @param {LoginUserInput} input
 * @returns {User} User dataset without sensitive data
 */
export const authorize = async ({ username, password }: any): Promise<any> => {
  check.assert.string(username)
  check.assert.string(password)

  try {
    // Connect to db and get user dataset
    const db = await mongodb()
    if (!db) throw Error('DB connection failed')
    const Users = db.collection<User>('users')
    const userData = await Users.findOne({ username: username })
    if (!userData?.password) return null

    // Validate password
    const isValid = validatePassword(password, userData.password)
    if (!isValid) return null

    // Return user dataset without password
    const { password: p, ...user } = userData
    return { ...user, initialPwd: isValid && password === INITIAL_PWD }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Validate password using bcrypt
 * @param {string} input Input password
 * @param {string} db Database password
 * @returns {boolean}
 */
export const validatePassword = (input: string, db: string): boolean => {
  if (!(db && input)) return false
  return bcrypt.compareSync(input, db)
}

export const validateUser = async (username: string): Promise<any> => {
  if (!username) return null

  try {
    const db = await mongodb()
    if (!db) throw Error('DB connection failed')
    const Users = db.collection<User>('users')

    const userData = await Users.findOne({ username })
    if (!userData?.password) return userData

    const { password, ...user } = userData
    return user
  } catch (error) {
    console.error(error)
  }
}

/**
 * JWT callback, which is used by nextAuth.
 * @param {object} token Decrypted JWT
 * @param {User} user User data object
 * @returns {object} JSON Web Token
 */
export async function jwtCallback({ token, user }: any) {
  if (user) token = { user }
  return token
}

/**
 * Session callback, which is used by nextAuth
 * @param {object} session Session object
 * @param {object} token JSON Web Token
 * @returns Session that will be returned to the client
 */
export async function session({ session, token }: any) {
  session.user = token.user
  return session
}

export const encode = async ({ secret, token }: any): Promise<string> =>
  jwt.sign(token, secret, { algorithm: 'HS256' })

export const decode = async ({ secret, token }: any): Promise<any> =>
  jwt.verify(token, secret)

export const credentials = {
  username: {
    label: 'Benutzername',
    type: 'text',
    placeholder: 'Benutzername',
    value: ''
  },
  password: {
    label: 'Passwort',
    type: 'password',
    placeholder: 'Passwort'
  }
}

/**
 * Configuration of nextAuth providers
 */
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials,
      authorize
    })
  ],
  callbacks: { jwt: jwtCallback, session },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60
  },
  debug: process.env.NODE_ENV !== 'production',
  secret: process.env.SECRET,
  pages: {
    signIn: '/login'
  },
  jwt: {
    encode,
    decode
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production' && !process.env.ISLOCAL
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      options: {
        sameSite: 'lax',
        path: '/',
        httpOnly: process.env.NODE_ENV === 'production' && !process.env.ISLOCAL,
        secure: process.env.NODE_ENV === 'production' && !process.env.ISLOCAL,
        domain:
          process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN
            ? (process.env.ISLOCAL ? '' : '.') + process.env.COOKIE_DOMAIN
            : 'localhost'
      }
    }
  }
}

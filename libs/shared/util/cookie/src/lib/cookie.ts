import cookie from 'cookie'
import { NextApiRequest } from 'next'

/**
 * Parse header cookies string
 * @param {string} cookies Cookie string of header
 * @returns an object of all cookie name-value pairs
 */
const parseCookie = (cookies: string): Record<string, string> =>
  cookie.parse(cookies || '')

/**
 * Extract JWT from header cookie
 * @param req
 * @returns {string}
 */
export const cookieExtractor = (req: NextApiRequest): string | null => {
  if (!req?.headers?.cookie) return null
  const token = parseCookie(req.headers.cookie)[
    process.env.NODE_ENV === 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token'
  ]
  return token
}

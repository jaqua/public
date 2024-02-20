/**
 * @fileoverview  NextJS api page for authorization using `next-auth`.
 * @author        Dr. J. Quader
 * @copyright     © 2023 by J. Quader
 */
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'

import { options } from '@jaqua/auth'

const auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
export default auth

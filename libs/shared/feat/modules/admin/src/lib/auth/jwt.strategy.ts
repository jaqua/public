import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'

import { validateUser } from '@jaqua/auth'
import { cookieExtractor } from '@jaqua/shared/util/cookie'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET,
      algorithms: ['HS256']
    })
  }

  async validate(payload: any) {
    const user = await validateUser(payload?.user?.username)
    if (user) return user
    throw new UnauthorizedException()
  }
}

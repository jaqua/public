import { Injectable, UnauthorizedException } from '@nestjs/common'
// UnauthorizedException
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { TJwtUserPayload } from './auth.service'

// import { validateUser } from '@jaqua/auth'

// import { cookieExtractor } from '@jaqua/shared/util/cookie'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: cookieExtractor,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET,
      algorithms: ['HS256']
    })
  }

  async validate(payload: TJwtUserPayload) {
    if (!payload || !payload.username) {
      throw new UnauthorizedException()
    }
    return payload
  }
}

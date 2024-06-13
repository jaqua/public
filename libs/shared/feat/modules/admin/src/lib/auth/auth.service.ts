import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'

import { User } from '@jaqua/shared/graphql'

import { UserService } from '../user/user.service'

export type TJwtUserPayload = {
  username: string
  sub: string
}

export type TAccessToken = {
  access_token: string
}

@Injectable()
class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    if (!username || !password) {
      throw new UnauthorizedException('Invalid Credentials')
    }

    const userData = await this.userService.getUser({
      username
    })

    const { password: dbPassword, ...user } = userData

    const isValid = this.validatePassword(password, dbPassword)

    if (!isValid) {
      throw new UnauthorizedException('Invalid Credentials')
    }

    return user
  }

  validatePassword(inputPassword: string, dbPassword: string) {
    return bcrypt.compareSync(inputPassword, dbPassword)
  }

  async login(user: User): Promise<TAccessToken> {
    const payload: TJwtUserPayload = {
      username: user.username,
      sub: user.id || ''
    }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}

export { AuthService }

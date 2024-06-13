import {
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

import { User } from '@jaqua/project.de/graphql'
import { JwtAuthGuard, LocalAuthGuard } from '@jaqua/shared/util/auth-guard'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    const user = req.user as unknown as User
    if (!user) {
      throw new UnauthorizedException()
    }
    return this.authService.login(user)
    // return {
    //   name: 'Nasim'
    // }
  }

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  async hello(@Request() req: any) {
    return req.user
  }
}

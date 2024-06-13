/**
 * @fileoverview  GraphQL resolvers for auth module
 */
import { UseGuards } from '@nestjs/common'
import { Mutation, Resolver } from '@nestjs/graphql'

import { User } from '@jaqua/shared/graphql'
import { CurrentUser, GqlAuthGuardLocal } from '@jaqua/shared/util/auth-guard'

import { AuthService, TAccessToken } from './auth.service'

@Resolver('auth')
// @UseGuards(GqlAuthGuard, RolesGuard)
export class AuthResolvers {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Promise<TAccessToken>)
  @UseGuards(GqlAuthGuardLocal)
  async login(@CurrentUser() user: User) {
    return this.authService.login(user)
    // return userInput
    // console.log({ user, userInput }, 'from resolver')
    // return 'Hello there'
  }
}

/**
 * @fileoverview  User resolvers
 * @author        Dr. J. Quader
 * @copyright     © 2020-2022 by J. Quader
 */
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

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
import { GqlAuthGuard, RolesGuard } from '@jaqua/shared/util/auth-guard'

import { Roles } from '../auth/roles.decorator'
import { UserService } from './user.service'

@Resolver('User')
export class UserResolvers {
  constructor(private readonly userService: UserService) {}

  @Query()
  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async getUsers(): Promise<Array<User>> {
    return this.userService.getUsers()
  }

  @Query()
  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async getUser(@Args('param') param: UserParam): Promise<UserData | null> {
    return this.userService.getUser(param)
  }

  @Mutation(() => String)
  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async addUser(@Args('input') input: AddUserInput): Promise<string> {
    return this.userService.addUser(input)
  }

  @Mutation(() => String)
  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async userUpdate(@Args('input') input: UserUpdateInput): Promise<boolean> {
    return this.userService.userUpdate(input)
  }

  @Mutation(() => Boolean)
  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async removeUser(@Args('input') input: RemoveUserInput): Promise<boolean> {
    return this.userService.removeUser(input)
  }

  @Mutation(() => Boolean)
  @Roles('user')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async changePwd(@Args('input') input: ChangePwdInput): Promise<boolean> {
    return this.userService.changePwd(input)
  }

  @Mutation(() => Boolean)
  @Roles('user')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async resetPwd(@Args('input') input: ResetPwdInput): Promise<boolean> {
    return this.userService.resetPwd(input)
  }
}

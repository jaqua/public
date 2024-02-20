/**
 * @fileoverview  GraphQL resolvers for notecard module
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import {
  Notecard,
  NotecardAddInput,
  NotecardContentParam,
  NotecardUpdateInput
} from '@jaqua/project.de/graphql'
import { Public, Roles } from '@jaqua/shared/modules/admin'
import {
  CurrentUser,
  GqlAuthGuard,
  RolesGuard
} from '@jaqua/shared/util/auth-guard'

import { NotecardService } from './notecard.service'

@Resolver('Notecard')
@UseGuards(GqlAuthGuard, RolesGuard)
export class NotecardResolvers {
  constructor(private readonly notecardService: NotecardService) {}

  @Query(() => Notecard)
  @Roles('admin', 'editor')
  async notecardList(): Promise<Array<Notecard>> {
    return this.notecardService.notecardList()
  }

  @Query()
  @Public()
  async notecardContent(
    @Args('param') param: NotecardContentParam,
    @CurrentUser() user
  ): Promise<Notecard> {
    return this.notecardService.notecardContent(param, user.userId)
  }

  @Mutation()
  @Roles('admin', 'editor')
  async notecardAdd(
    @Args('input') input: NotecardAddInput,
    @CurrentUser() user
  ): Promise<string> {
    return this.notecardService.notecardAdd(input, user)
  }

  @Mutation()
  @Roles('admin', 'editor')
  async notecardUpdate(
    @Args('input') input: NotecardUpdateInput,
    @CurrentUser() user
  ): Promise<number> {
    return this.notecardService.notecardUpdate(input, user)
  }

  @Mutation()
  @Roles('admin')
  async notecardRemove(
    @Args('input') input: NotecardUpdateInput
  ): Promise<boolean> {
    return this.notecardService.notecardRemove(input)
  }
}

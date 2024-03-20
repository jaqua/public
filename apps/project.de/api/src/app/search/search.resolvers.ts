/**
 * @fileoverview  GraphQL resolvers for search module
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

import { ContentDataset } from '@jaqua/project.de/graphql'
import { Public, Roles } from '@jaqua/shared/modules/admin'
import { GqlAuthGuard, RolesGuard } from '@jaqua/shared/util/auth-guard'

import { SearchService } from './search.service'

@Resolver('Search')
@UseGuards(GqlAuthGuard, RolesGuard)
export class SearchResolvers {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [ContentDataset])
  @Public()
  async search(@Args('param') param): Promise<ContentDataset[]> {
    return this.searchService.search(param)
  }

  @Query(() => [ContentDataset])
  @Roles('editor')
  async getList(@Args('type') type: string): Promise<ContentDataset[]> {
    return this.searchService.getList({ type })
  }
}

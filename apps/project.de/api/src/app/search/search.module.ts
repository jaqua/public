import { Module } from '@nestjs/common'

import { DatabaseModule } from '@jaqua/db'

import { SearchResolvers } from './search.resolvers'
import { SearchService } from './search.service'

@Module({
  imports: [DatabaseModule],
  providers: [SearchService, SearchResolvers]
})
export class SearchModule {}

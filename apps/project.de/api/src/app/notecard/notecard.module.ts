import { Module } from '@nestjs/common'

import { DatabaseModule } from '@jaqua/db'

import { NotecardResolvers } from './notecard.resolvers'
import { NotecardService } from './notecard.service'

@Module({
  imports: [DatabaseModule],
  providers: [NotecardService, NotecardResolvers]
})
export class NotecardModule {}

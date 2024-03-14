import { Module } from '@nestjs/common'

import { DatabaseModule } from '@jaqua/db'

import { VideoResolvers } from './video.resolvers'
import { VideoService } from './video.service'

@Module({
  imports: [DatabaseModule],
  providers: [VideoService, VideoResolvers]
})
export class VideoModule {}

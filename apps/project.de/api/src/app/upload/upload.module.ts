import { Module } from '@nestjs/common'

import { DatabaseModule } from '@jaqua/db'

import { UploadResolver } from './upload.resolver'
import { UploadService } from './upload.service'

@Module({
  imports: [DatabaseModule],
  providers: [UploadService, UploadResolver]
})
export class UploadModule {}

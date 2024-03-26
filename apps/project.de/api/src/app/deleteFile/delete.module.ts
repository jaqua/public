// delete.module.ts
import { Module } from '@nestjs/common'

import { DatabaseModule } from '@jaqua/db'

import { DeleteResolver } from './delete.resolver'
import { DeleteService } from './delete.service'

@Module({
  imports: [DatabaseModule],
  providers: [DeleteService, DeleteResolver]
})
export class DeleteModule {}

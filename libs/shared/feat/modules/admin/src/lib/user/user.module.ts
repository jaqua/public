/**
 * @fileoverview  User module
 * @author        Dr. J. Quader
 * @copyright     © 2020-2022 by J. Quader
 */
import { Module } from '@nestjs/common'

import { DatabaseModule } from '@jaqua/db'

// import { AuthModule } from '../auth/auth.module'
import { UserResolvers } from './user.resolvers'
import { UserService } from './user.service'

// AuthModule
@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserResolvers],
  exports: [UserService]
})
export class UserModule {}

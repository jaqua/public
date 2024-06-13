import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import 'passport'

import { UserModule } from '../user/user.module'
import { AuthResolvers } from './auth.resolvers'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('secret'),
        signOptions: { expiresIn: 60 * 5 },
        verifyOptions: {
          algorithms: ['HS256']
        }
      }),
      inject: [ConfigService]
    }),
    UserModule
  ],
  // controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolvers],
  exports: [JwtStrategy, JwtModule]
})
export class AuthModule {}

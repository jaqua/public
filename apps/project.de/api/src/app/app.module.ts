/**
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import * as path from 'path'

import { AuthModule, UserModule } from '@jaqua/shared/modules/admin'

import { AppController } from './app.controller'
import { NotecardModule } from './notecard/notecard.module'
import { SearchModule } from './search/search.module'
import { UploadModule } from './upload/upload.module'
import { VideoModule } from './video/video.module'

export const domain = 'project.de'

const isProduction = process.env.NODE_ENV === 'production'
const root = isProduction ? './' : 'apps/' + domain + '/api/'

const envFilePath = [
  path.join(root, isProduction ? '.env' : '.env.development')
]
const typePaths = ['./apps/project.de/api/src/**/*.graphql']
if (!isProduction) {
  envFilePath.push('.env.local')
  typePaths.push(
    'libs/shared/feat/modules/common/**/*.graphql',
    'libs/shared/feat/modules/admin/**/*.graphql'
  )
}

const origin = new RegExp(
  isProduction
    ? '^https://([a-z0-9|-]+.)*' + domain + '$'
    : '^http://localhost:(\\d{4})$',
  'i'
)

export const corsOptions = { credentials: true, origin }

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      resolvers: { Upload: GraphQLUpload },
      typePaths,
      cache: 'bounded',
      cors: corsOptions,
      csrfPrevention: false,
      playground: !isProduction,
      introspection: !isProduction
    }),
    AuthModule,
    UserModule,
    SearchModule,
    NotecardModule,
    VideoModule,
    UploadModule
  ],
  controllers: [AppController]
})
export class AppModule {}

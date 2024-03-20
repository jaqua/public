import { Args, Mutation, Resolver } from '@nestjs/graphql'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js'

import { File, UploadResult } from '@jaqua/shared/graphql'

import { UploadService } from './upload.service'

@Resolver('Upload')
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => Promise<File>)
  async uploadFiles(
    @Args('files', { type: () => GraphQLUpload }) files: Array<Promise<File>>,
    @Args('bucketName') bucketName: string
  ): Promise<Array<UploadResult>> {
    return this.uploadService.uploadFiles(files, bucketName)
  }
}

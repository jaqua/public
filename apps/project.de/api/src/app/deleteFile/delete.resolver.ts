// delete.resolver.ts
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { DeleteService } from './delete.service'

@Resolver()
export class DeleteResolver {
  constructor(private readonly deleteService: DeleteService) {}

  @Mutation(() => Boolean) // Temporarily change this to `Boolean` if facing issues
  async deleteFileByFilename(@Args('filename') filename: string): Promise<any> {
    // Use `any` or create an interface matching DeleteFileResponse
    const success = await this.deleteService.deleteFile(filename)
    return {
      success,
      message: success ? 'File successfully deleted' : 'File deletion failed'
    }
  }
}

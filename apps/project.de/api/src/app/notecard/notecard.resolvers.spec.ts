import { Test } from '@nestjs/testing'

import { NotecardResolvers } from './notecard.resolvers'
import { NotecardService } from './notecard.service'

describe('NotecardResolvers', () => {
  let resolvers: NotecardResolvers

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NotecardService, NotecardResolvers]
    }).compile()

    resolvers = module.get(NotecardResolvers)
  })

  test('should be defined', () => {
    expect(resolvers).toBeTruthy()
  })
})

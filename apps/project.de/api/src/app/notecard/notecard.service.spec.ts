import { Test } from '@nestjs/testing'

import { NotecardService } from './notecard.service'

describe('NotecardService', () => {
  let service: NotecardService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NotecardService]
    }).compile()

    service = module.get(NotecardService)
  })

  test('should be defined', () => {
    expect(service).toBeTruthy()
  })
})

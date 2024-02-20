import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from './app.controller'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController]
    }).compile()
  })

  describe('version', () => {
    it('should return version value', () => {
      const appController = app.get<AppController>(AppController)
      expect(appController.version()).toBe('1.0.0')
    })
  })
})

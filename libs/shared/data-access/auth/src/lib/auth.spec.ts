/**
 * @author        Dr. J. Quader
 * @copyright     © 2021-2022 by J. Quader
 */
import bcryptjs from 'bcryptjs'

import { validatePassword } from './auth'

/** Mocks */
const mockDate = new Date(2020, 1, 1)
const bcryptCompare = jest.fn() // .mockResolvedValue(true)
;(bcryptjs.compareSync as jest.Mock) = bcryptCompare

beforeAll(() => {
  jest.useFakeTimers()
  jest.setSystemTime(mockDate)
})
beforeEach(() => {
  jest.clearAllMocks()
})
afterAll(() => jest.useRealTimers())

/** Tests */
test('validatePassword() should call bcrypt.compareSync', () => {
  validatePassword('input', 'db')
  expect(bcryptCompare).toHaveBeenCalledTimes(1)
  expect(bcryptCompare).toHaveBeenCalledWith('input', 'db')
})

test('validatePassword() should not call bcrypt.compareSync if parameter is missing', () => {
  validatePassword('input', 'db')
  expect(bcryptCompare).toHaveBeenCalledTimes(1)
  expect(bcryptCompare).toHaveBeenCalledWith('input', 'db')
})

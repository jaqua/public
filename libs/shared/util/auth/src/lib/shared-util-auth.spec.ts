/**
 * @author        Dr. J. Quader
 * @copyright     © 2021-2022 by J. Quader
 */
import bcryptjs from 'bcryptjs'
import cases from 'jest-in-case'

import { BCRYPT, NANO_ID } from '@jaqua/regex'

import { generateUser, hasRole } from './shared-util-auth'

/** Mocks */
const mockDate = new Date(2020, 1, 1)
const mockCompareSign = jest.fn(() => Promise.resolve())
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

// prettier-ignore
cases(
  'validatePassword(input, db) with invalid parameters',
  (opts) => {
    expect(mockCompareSign).not.toHaveBeenCalled()
  },
  {
    'missing parameter': { 
      input: undefined,
      db: undefined,
      result: false
    },
    'missing input parameter': { 
      input: undefined,
      db: 'db',
      result: false
    },
    'missing db parameter': { 
      input: 'input',
      db: undefined,
      result: false
    },
  }
)

// prettier-ignore
cases(
  'hasRole(roles, userRoles)',
  (opts) => {
    expect(hasRole(opts.roles, opts.userRoles)).toBe(opts.result)
  },
  {
    'user has role to pass role guard': { 
      roles: ['user'],
      userRoles: ['user', 'editor',],
      result: true
    },
    'user has not role to pass role guard': { 
      roles: ['admin'],
      userRoles: ['user', 'editor',],
      result: false
    },
  }
)

test('generateUser() should return user dataset', () => {
  const user = generateUser('username')

  expect(user.userId).toMatch(NANO_ID)
  expect(user.username).toBe('username')
  expect(user.password).toMatch(BCRYPT)
  expect(user.speciality).toStrictEqual(['paediatrics'])
  expect(user.language).toBe('de')
  expect(user.createdAt).toStrictEqual(mockDate)
  expect(user.roles).toStrictEqual([])
})

test('generateUser() should return system user dataset', () => {
  const user = generateUser('editor')

  expect(user.userId).toMatch(NANO_ID)
  expect(user.username).toBe('editor')
  expect(user.password).toMatch(BCRYPT)
  expect(user.speciality).toStrictEqual(['paediatrics'])
  expect(user.language).toBe('de')
  expect(user.createdAt).toStrictEqual(mockDate)
  expect(user.roles).toStrictEqual(['editor'])
})

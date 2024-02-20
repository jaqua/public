/**
 * @author        Dr. J. Quader
 * @copyright     © 2021-2022 by J. Quader
 */
import cases from 'jest-in-case'

import { METEOR_ID, TIMESTAMP } from '@jaqua/regex'

import {
  arrayNumber,
  fillSparseArray,
  generateBooleanCombination,
  generateRolesArray,
  generateSlug,
  getPastDateByDiff,
  getPastDateByTimestamp,
  getRandomFloat,
  getRandomInt,
  leftFillNum,
  meteorId,
  timestamp,
  todayTimestamp
} from './shared-util-generator'

/** Mocks */
global.Math.random = () => 0.123456789
const date = new Date(2021, 10, 21, 0, 0, 0)

beforeAll(() => {
  jest.useFakeTimers()
  jest.setSystemTime(date)
})

test('timestamp() should return a ten digit timestamp', () => {
  const result = timestamp()
  expect(Number.isInteger(result)).toBe(true)
  expect(result.toString()).toMatch(TIMESTAMP)
})

test('todayTimestamp() should return a ten digit timestamp', () => {
  const result = todayTimestamp()
  expect(Number.isInteger(result)).toBe(true)
  expect(result.toString()).toMatch(TIMESTAMP)
})

// prettier-ignore
cases(
  'getPastDateByTimestamp(seconds, current)',
  (opts) => {
    expect(getPastDateByTimestamp(opts.seconds, opts.current)).toStrictEqual(opts.result)
  },
  {
    'With manual timestamp': { seconds: 600, current: 1600000000, result: new Date(1599999400 * 1000) },
    'Without manual timestamp': { seconds: 600, result: new Date(2021, 10, 20, 23, 50, 0) }
  }
)

// prettier-ignore
cases(
  'getPastDateByDiff(year, month, day)',
  (opts) => {
    expect(getPastDateByDiff(opts.year, opts.month, opts.day)).toStrictEqual(opts.result)
  },
  {
    'Year': { year: 5, result: new Date(2016, 10, 21) },
    'Month': { month: 5, result: new Date(2021, 5, 21) },
    'Day': { day: 5, result: new Date(2021, 10, 16) }
  }
)

// prettier-ignore
cases(
  'getRandomInt(min, max)',
  (opts) => {
    expect(getRandomInt(opts.min, opts.max)).toBe(opts.result)
  },
  {
    'no paramter': { result: 0 },
    'range parameter': { min: 0, max: 10, result: 1 },
    'only min parameter': { min: 10, result: 10 },
    'only max parameter': { max: 10, result: 1 }
  }
)

// prettier-ignore
cases(
  'getRandomFloat(min, max, decimals)',
  (opts) => {
    expect(getRandomFloat(opts.min, opts.max, opts.decimals)).toBe(opts.result)
  },
  {
    'no paramter': { result: 0.123456789 },
    'range parameter': { min: 0, max: 10, result: 1.23456789 },
    'range and decimals': { min: 0, max: 10, decimals: 2, result: 1.23 }
  }
)

test('fillSparseArray() should return dense array', () => {
  const array = []
  array[0] = 0
  array[5] = 5
  expect(array).toStrictEqual([0, , , , , 5]) // eslint-disable-line no-sparse-arrays
  expect(array.length).toBe(6)
  expect(fillSparseArray(array, -1)).toStrictEqual([0, -1, -1, -1, -1, 5])
})

// prettier-ignore
cases(
  'arrayNumber(length, initial)',
  (opts) => {
    const result = arrayNumber(opts.length, opts.initial)
    
    expect(result.length).toBe(opts.length)
    expect(result[0]).toBe(opts.initial || 0)
    expect(result[result.length - 1]).toBe(opts.result)
  },
  {
    '0 to 23': { length: 24, result: 23 },
    '12 to 23': { length: 12, initial: 12, result: 23 }
  }
)

// prettier-ignore
cases(
  'leftFillNum(value, length)',
  (opts) => {
    expect(leftFillNum(opts.value, opts.length)).toBe(opts.result)
  },
  {
    'one length one': { value: 1, length: 1, result: '1' },
    'one length two': { value: 1, length: 2, result: '01' },
    'one length three': { value: 1, length: 3, result: '001' },
    'ten length one': { value: 10, length: 1, result: '10' },
    'ten length two': { value: 10, length: 2, result: '10' },
    'ten length three': { value: 10, length: 3, result: '010' },
  }
)

// prettier-ignore
cases(
  'generateSlug(string)',
  (opts) => {
    expect(generateSlug(opts.string)).toBe(opts.result)
  },
  {
    'spaces': { string: 'foo bar', result: 'foo-bar' },
    'german umlauts': { string: 'ä ö ü', result: 'ae-oe-ue' },
    'remove non word characters': { string: 'clear1$%&/()=?!ed', result: 'cleared' },
    'clear multiple dashes': { string: 'foo---bar', result: 'foo-bar' },
    'remove dash from start and end': { string: '-foo-bar-', result: 'foo-bar' }
  }
)

test('generateBooleanCombination() should return object array', () => {
  expect(
    generateBooleanCombination(['isFinalized', 'isReviewed', 'isEdited'])
  ).toStrictEqual([
    { isEdited: false, isReviewed: false, isFinalized: false },
    { isEdited: false, isReviewed: false, isFinalized: true },
    { isEdited: false, isReviewed: true, isFinalized: false },
    { isEdited: false, isReviewed: true, isFinalized: true },
    { isEdited: true, isReviewed: false, isFinalized: false },
    { isEdited: true, isReviewed: false, isFinalized: true },
    { isEdited: true, isReviewed: true, isFinalized: false },
    { isEdited: true, isReviewed: true, isFinalized: true }
  ])
})

// prettier-ignore
cases(
  'generateRolesArray(object)',
  (opts) => {
    expect(generateRolesArray(opts.obj)).toEqual(opts.result)
  },
  {
    'empty object': { obj: {}, result: [] },
    'irrelevant content': { obj: { foo: 'bar' }, result: [] },
    'all false value': { obj: { admin: false, editor: false, user: false }, result: [] },
    'false and missing value': { obj: { admin: false, editor: false }, result: [] },
    'admin': { obj: { admin: true, foo: 'bar' }, result: ['admin'] },
    'editor': { obj: { editor: true, foo: 'bar' }, result: ['editor'] },
    'user': { obj: { user: true, foo: 'bar' }, result: ['user'] },
    'multiple roles': { obj: { admin: true, editor: true, foo: 'bar' }, result: ['admin', 'editor'] }
  }
)

test('meteorId() should return a meteor id string', () => {
  const result = meteorId()
  expect(result).toMatch(METEOR_ID)
})

/**
 * @author        Dr. J. Quader
 * @copyright     © 2022 by J. Quader
 */
import cases from 'jest-in-case'

import {
  getRandom,
  getRandomItem,
  splitDurationHour
} from './shared-util-calculation'

// prettier-ignore
cases(
  'splitDurationHour(minutes)',
  (opts) => {
    expect(splitDurationHour(opts.input)).toStrictEqual(opts.result)
  },
  {
    '0': { input: 0, result: [0, 0] },
    '10': { input: 10, result: [0, 10] },
    '60': { input: 60, result: [1, 0] },
    '100': { input: 100, result: [1, 40] },
    '120': { input: 120, result: [2, 0] }
  }
)

test('getRandomItem() should return array', () => {
  const array = [1, 2, 3, 4, 5]
  const result = getRandomItem(array)
  expect(array.indexOf(result) > -1).toBe(true)
})

test('getRandom() should return array', () => {
  expect(getRandom([1, 2, 3, 4, 5], 3)).toHaveLength(3)
})
test('getRandom() should throw error, if array has less items', () => {
  expect(() => getRandom([1, 2, 3, 4, 5], 6)).toThrow(RangeError)
})

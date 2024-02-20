/**
 * @author        Dr. J. Quader
 * @copyright     © 2021-2022 by J. Quader
 */
import cases from 'jest-in-case'

import {
  hasOnlyNumbers,
  hasProp,
  isEmpty,
  isFourDigit,
  isValidCaseId,
  isValidDate,
  objectHasEveryValues,
  objectHasKeys,
  objectHasSomeValues,
  parenthesesAreBalanced
} from './shared-util-check'

/** Mocks */
const date = new Date(2020, 1, 1)

beforeAll(() => {
  jest.useFakeTimers()
  jest.setSystemTime(date)
})
afterAll(() => jest.useRealTimers())

/** Tests */

// prettier-ignore
cases(
  'hasProp(object, prop)',
  (opts) => {
    expect(hasProp(opts.object, opts.prop)).toBe(opts.result)
  },
  {
    'empty object': { object: {}, prop: 'foo', result: false },
    'non existing prop': { object: { key: 'value' }, prop: 'foo', result: false },
    'existing prop': { object: { key: 'value' }, prop: 'key', result: true },
  }
)

// prettier-ignore
cases(
  'isEmpty(object)',
  (opts) => {
    expect(isEmpty(opts.object)).toBe(opts.result)
  },
  {
    'undefined': { object: undefined, result: true },
    'null': { object: null, result: true },
    'empty object': { object: {}, result: true },
    'object with key/value': { object: { key: 'value' }, result: false },
  }
)

// prettier-ignore
cases(
  'objectHasKeys(object)',
  (opts) => {
    expect(objectHasKeys(opts.object)).toBe(opts.result)
  },
  {
    'empty object': { object: {}, result: false },
    'string field': { object: { foo: 'bar' }, result: true },
    'number field': { object: { number: 1 }, result: true },
    'boolean field': { object: { bool: true }, result: true },
    'undefined field': { object: { undefined: undefined }, result: true },
    'null field': { object: { null: null }, result: true },
  }
)

// prettier-ignore
cases(
  'objectHasSomeValues(object)',
  (opts) => {
    expect(objectHasSomeValues(opts.object)).toBe(opts.result)
  },
  {
    'empty object': { object: {}, result: false },
    'all emtpy string': { object: { foo: '', bar: '' }, result: false },
    'single empty string': { object: { foo: '', bar: 'content' }, result: true },
    'undefined': { object: { undefined: undefined }, result: false },
    'null': { object: { null: null }, result: false },
  
    'string': { object: { foo: 'bar' }, result: true },
    'number': { object: { number: 1 }, result: true },
    'boolean true': { object: { bool: true }, result: true },
    'boolean false': { object: { bool: false }, result: true },
  }
)
// prettier-ignore
cases(
  'objectHasEveryValues(object)',
  (opts) => {
    expect(objectHasEveryValues(opts.object)).toBe(opts.result)
  },
  {
    'empty object': { object: {}, result: false },
    'all emtpy string': { object: { foo: '', bar: '' }, result: false },
    'single empty string': { object: { foo: '', bar: 'content' }, result: false },
    'undefined': { object: { undefined: undefined }, result: false },
    'null': { object: { null: null }, result: false },
  
    'string': { object: { foo: 'bar' }, result: true },
    'number': { object: { number: 1 }, result: true },
    'boolean true': { object: { bool: true }, result: true },
    'boolean false': { object: { bool: false }, result: true },
  }
)

// prettier-ignore
cases(
  'isFourDigit(string)',
  (opts) => {
    expect(isFourDigit(opts.string)).toBe(opts.result)
  },
  {
    'empty string': { string: '', result: false },
    'non digit string': { string: 'abcd', result: false },
    'three digit string': { string: '123', result: false },
    'five digit string': { string: '12345', result: false },
    'four digit string with space': { string: '12 34', result: false },
    'four digit string with dash': { string: '12-34', result: false },
    'four digit string with letter': { string: '12a34', result: false },
    'four digit string': { string: '1234', result: true },
    'four digit string with leading zero': { string: '0123', result: true },
  }
)

// prettier-ignore
cases(
  'hasOnlyNumbers(string)',
  (opts) => {
    expect(hasOnlyNumbers(opts.string)).toBe(opts.result)
  },
  {
    'empty string': { string: '', result: false },
    'non digit string': { string: 'abcd', result: false },
    'three digit string': { string: '123', result: true },
    'decimal string': { string: '12.345', result: false },
    'four digit string with space': { string: '12 34', result: false },
    'four digit string with dash': { string: '12-34', result: false },
    'four digit string with letter': { string: '12a34', result: false },
    'four digit string': { string: '1234', result: true },
    'four digit string with leading zero': { string: '0123', result: true },
  }
)

// prettier-ignore
cases(
  'parenthesesAreBalanced(string)',
  (opts) => {
    expect(parenthesesAreBalanced(opts.string)).toBe(opts.result)
  },
  {
    'empty string': { string: '', result: true },
    'string without parentheses': { string: 'abcd', result: true },
    'single balanced': { string: '()', result: true },
    'nested second level balanced': { string: '(()())', result: true },
    'nested third level balanced': { string: '((()()))', result: true },
    'single open imbalanced': { string: '(', result: false },
    'single close imbalanced': { string: ')', result: false },
    'string and single open imbalanced': { string: '(string', result: false },
    'string and single close imbalanced': { string: 'string)', result: false },
    'nested close end imbalanced': { string: '((())', result: false },
    'nested open start imbalanced': { string: '(()))', result: false },
    'nested close middle imbalanced': { string: '(())())', result: false },
    'nested open middle imbalanced': { string: '(()(())', result: false },
    'string with multiple balanced brackets': { string: 'string((), ())', result: true },
    'string with multiple nested balanced mixed brackets': { string: 'string(({ foo: bar }), ({ foo: bar }))', result: true },
    'string with multiple imbalanced brackets': { string: 'string((), ()', result: false },
    'string with multiple nested imbalanced mixed brackets': { string: 'string(({ foo: bar, ({ foo: bar }))', result: false }
  }
)

// prettier-ignore
cases(
  'isValidDate(string)',
  (opts) => {
    expect(isValidDate(opts.input)).toStrictEqual(opts.result)
  },
  {
    'empty object': { input: {}, result: undefined },
    'string field': { input: { foo: 'bar' }, result: undefined },
    'number field': { input: { number: 1 }, result: undefined },
    'boolean field': { input: { bool: true }, result: undefined },
    'undefined field': { input: { undefined: undefined }, result: undefined },
    'null field': { input: { null: null }, result: undefined },
    'date without delimiter': { input: '010221', result: new Date(2021, 1, 1) },
    'date short without delimiter': { input: '1221', result: undefined },
    // 'date short': { input: '1.2.21', result: new Date(2021, 1, 1) },
    'date short zero': { input: '01.02.21', result: new Date(2021, 1, 1) },
    // 'date short full year': { input: '1.2.2021', result: new Date(2021, 1, 1) },
    'full date': { input: '01.02.2021', result: new Date(2021, 1, 1) },
    'short date with year 19xx': { input: '01.02.82', result: new Date(1982, 1, 1) },
  }
)

// prettier-ignore
cases(
  'isValidCaseId(string)',
  (opts) => {
    expect(isValidCaseId(opts.string)).toBe(opts.result)
  },
  {
    '7 digit string': { string: '1234567', result: 1234567 },
    '7 digit number': { string: 1234567, result: 1234567 },
    '7 alphanumeric string': { string: '1234abc', result: -1 },
    '8 digit string': { string: '12345678', result: -1 },
    '6 digit string with length 7': { string: '1234 67', result: -1 },
    '8 digit number': { string: 12345678, result: -1 },
    'boolean': { string: true, result: -1 },
    'empty string': { string: '', result: -1 },
  }
)

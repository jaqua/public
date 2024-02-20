/**
 * @author        Dr. J. Quader
 * @copyright     © 2021 by J. Quader
 */
import cases from 'jest-in-case'

import {
  capitalizeFirstLetter,
  escapeRegExp,
  fold,
  prependHttps,
  round,
  safeDate,
  sanitizeDate,
  sanitizeString
} from './shared-util-formatting'

// prettier-ignore
cases(
  'safeDate(input)',
  (opts) => {
    expect(safeDate(opts.input)).toEqual(opts.result)
  },
  {
    'undefined': { input: undefined, result: undefined },
    'invalid string': { input: 'invalid', result: undefined },
    'boolean': { input: true, result: undefined },
    'invalid number': { input: 123, result: undefined },
    'date number': { input: 1657561690000, result: new Date(2022, 6, 11, 19, 48, 10) },
    'date string': { input: '2022-07-11T14:31:16.000Z', result: new Date(2022, 6, 11, 16, 31, 16) },
    'date': { input: new Date(2022, 1, 1), result: new Date(2022, 1, 1) },
  }
)

// prettier-ignore
cases(
  'capitalizeFirstLetter(input)',
  (opts) => {
    expect(capitalizeFirstLetter(opts.input)).toBe(opts.result)
  },
  {
    'undefined': { input: undefined, result: '' },
    'empty string': { input: '', result: '' },
    'capital lowercase string': { input: 'string', result: 'String' },
    'capital uppercase string': { input: 'String', result: 'String' },
    'capital number string': { input: '1st element', result: '1st element' },
    'number': { input: 1, result: '' },
    'boolean': { input: true, result: '' }
  }
)

// prettier-ignore
cases(
  'sanitizeDate(timestamp)',
  (opts) => {
    expect(sanitizeDate(opts.timestamp)).toBe(opts.result)
  },
  {
    '10 digit timestamp string': { timestamp: '1234567890', result: 1234567890 },
    '13 digit timestamp string': { timestamp: '1234567890000', result: 1234567890 },
    '10 digit timestamp number': { timestamp: 1234567890, result: 1234567890 },
    '13 digit timestamp number': { timestamp: 1234567890000, result: 1234567890 }
  }
)

// prettier-ignore
cases(
  'round(value)',
  (opts) => {
    expect(round(opts.value, opts.decimals)).toBe(opts.result)
  },
  {
    'ignore more decimals as needed': { value: 1, decimals: 2, result: 1 },
    '0.5 without decimals': { value: 0.5, decimals: 0, result: 1 },
    '0.5 with two decimals': { value: 0.5, decimals: 2, result: 0.5 },
    '1.005': { value: 1.005, decimals: 2, result: 1.01 },
    '2.175': { value: 2.175, decimals: 2, result: 2.18 },
    '5.015': { value: 5.015, decimals: 2, result: 5.02 },
    '-1.005': { value: -1.005, decimals: 2, result: -1.01 },
    '-2.175': { value: -2.175, decimals: 2, result: -2.18 },
    '-5.015': { value: -5.015, decimals: 2, result: -5.02 },
  }
)

// prettier-ignore
cases(
  'escapeRegExp(input)',
  ({ input, result }) => {
    expect(escapeRegExp(input)).toBe(result)
  },
  {
    'brackets': { input: 'string()', result: 'string\\(\\)' },
    'curled brackets': { input: 'string{}', result: 'string\\{\\}' },
    'square brackets': { input: 'string[]', result: 'string\\[\\]' },
    'question mark': { input: 'string?', result: 'string\\?' },
    'exclamation mark': { input: 'string!', result: 'string\\!' },
    'equal sign': { input: 'string=', result: 'string\\=' },
    'dot': { input: 'string.', result: 'string\\.' },
    'dollar': { input: 'string$', result: 'string\\$' },
    'plus': { input: 'string+', result: 'string\\+' },
    'colon': { input: 'string:', result: 'string\\:' },
  }
)

// prettier-ignore
cases(
  'sanitizeString(input)',
  ({ input, result }) => {
    expect(sanitizeString(input)).toBe(result)
  },
  {
    'Remove leading and trailing spaces': {
      input: '   String   ',
      result: 'String'
    },
    'Replace multiple spaces with one space': {
      input: 'String   string',
      result: 'String string'
    },
    'Remove space in front of a dot': {
      input: 'Sentence . Sentence',
      result: 'Sentence. Sentence'
    },
    'Remove space between two single characters and dot': {
      input: 'String e. g.',
      result: 'String e.g.'
    },
    'Remove space between number and x': {
      input: '3 x',
      result: '3x'
    },
    'Remove leading and trailing spaces for bracket content': {
      input: 'String ( content ) string',
      result: 'String (content) string'
    },
    'Capitalize first letter of each sentence': {
      input: 'Sentence. sentence. sentence.',
      result: 'Sentence. Sentence. Sentence.'
    },
    'Example': {
      input:
        ' this is just an example e. g. string . this ( and not only   ) should be      sanitized.  repeat it 2 x for each    run.   ',
      result:
        'This is just an example e.g. string. This (and not only) should be sanitized. Repeat it 2x for each run.'
    }
  }
)

// prettier-ignore
cases(
  'fold(string, number, array)',
  ({ string, number, result }) => {
    expect(fold(string, number)).toStrictEqual(result)
  },
  {
    'split short string': {
      string: ' Short example',
      number: 30,
      result: ['Short example']
    },
    'split long string': {
      string: ' This is just an example text, which should get splitted by a given specific line lenght',
      number: 30,
      result: [
        'This is just an example',
        'text, which should get',
        'splitted by a given specific',
        'line lenght'
      ]
    }
  }
)

// prettier-ignore
cases(
  'prependHttps(input, { https: true })',
  (opts) => {
    expect(prependHttps(opts.input, { https: true }).toString()).toBe(opts.result)
  },
  {
    'url without protocol': { input: 'jaqua.de', result: 'https://jaqua.de/' },
    'url http': { input: 'http://jaqua.de', result: 'http://jaqua.de/' },
    'url https': { input: 'https://jaqua.de', result: 'https://jaqua.de/' },
    'url with subdomain': { input: 'http://www.jaqua.de', result: 'http://www.jaqua.de/' },
    // 'url with short protocol': { input: '//www.jaqua.de', result: '//jaqua.de/' },
    'localhost': { input: 'localhost', result: 'https://localhost/' },
    'localhost with port': { input: 'localhost:3000', result: 'https://localhost:3000/' },
    'localhost with port and protocol': { input: 'http://localhost:3000', result: 'http://localhost:3000/' },
    // 'relative path /': { input: '/relative', result: '/relative' },
    // 'relative path ./': { input: './relative', result: './relative' },
    // 'relative path ../': { input: '../relative', result: '../relative' },
    // 'mail': { input: 'mailto:info@site.com', result: 'mailto:info@site.com' },
    // 'phone number': { input: 'tel:1234567890', result: 'tel:1234567890' }
  }
)

// prettier-ignore
cases(
  'prependHttps(input, { https: false })',
  (opts) => {
    expect(prependHttps(opts.input, { https: false }).toString()).toBe(opts.result)
  },
  {
    'url without protocol': { input: 'jaqua.de', result: 'http://jaqua.de/' },
    'url http': { input: 'http://jaqua.de', result: 'http://jaqua.de/' },
    'url https': { input: 'https://jaqua.de', result: 'https://jaqua.de/' },
    'url with subdomain': { input: 'http://www.jaqua.de', result: 'http://www.jaqua.de/' },
    // 'url with short protocol': { input: '//www.jaqua.de', result: '//jaqua.de/' },
    'localhost': { input: 'localhost', result: 'http://localhost/' },
    'localhost with port': { input: 'localhost:3000', result: 'http://localhost:3000/' },
    'localhost with port and protocol': { input: 'http://localhost:3000', result: 'http://localhost:3000/' },
    // 'relative path /': { input: '/relative', result: '/relative' },
    // 'relative path ./': { input: './relative', result: './relative' },
    // 'relative path ../': { input: '../relative', result: '../relative' },
    // 'mail': { input: 'mailto:info@site.com', result: 'mailto:info@site.com' },
    // 'phone number': { input: 'tel:1234567890', result: 'tel:1234567890' }
  }
)

/**
 * @author        Dr. J. Quader
 * @copyright     © 2022 by J. Quader
 */
import cases from 'jest-in-case'

import {
  formattedDate,
  formattedDateTime,
  formattedTime
} from './shared-util-date'

// prettier-ignore
cases(
  'formattedDate(input)',
  (opts) => {     
    expect(formattedDate(opts.input)).toBe(opts.result)
  },
  {
    'undefined': { input: undefined, result: null },
    'timestamp string': { input: '1649354085000', result: '' },
    'timestamp number': { input: 1649354085000, result: '07.04.2022' },
  }
)

// prettier-ignore
cases(
  'formattedTime(input)',
  (opts) => {     
    expect(formattedTime(opts.input, opts.plain)).toBe(opts.result)
  },
  {
    'undefined': { input: undefined, plain: undefined, result: null },
    'timestamp string': { input: '1649354085000', plain: undefined, result: '' },
    'timestamp number': { input: 1649354085000, plain: undefined, result: '19:54 Uhr' },
    'timestamp number with plain param': { input: 1649354085000, plain: true, result: '19:54' },
  }
)

// prettier-ignore
cases(
  'formattedDate(input)',
  (opts) => {     
    expect(formattedDateTime(opts.input, opts.plain)).toBe(opts.result)
  },
  {
    'undefined': { input: undefined, plain: undefined, result: null },
    'timestamp string': { input: '1649354085000', plain: undefined, result: '' },
    'timestamp number': { input: 1649354085000, plain: undefined, result: '07.04.2022 19:54 Uhr' },
    'timestamp number with plain param': { input: 1649354085000, plain: true, result: '07.04.2022 19:54' },
  }
)

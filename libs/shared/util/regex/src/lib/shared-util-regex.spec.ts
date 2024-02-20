/**
 * @author        Dr. J. Quader
 * @copyright     © 2021 by J. Quader
 */
import cases from 'jest-in-case'

import { regexToMatchString } from './shared-util-regex'

// prettier-ignore
cases(
  'regexToMatchString(strings)',
  (opts) => {
    expect(regexToMatchString(opts.strings)).toStrictEqual(opts.result)
  },
  {
    'Invalid input': { strings: 'string', result: undefined },
    'Single element': { strings: ['string'], result: new RegExp('^' + 'string' + '$') },
    'Multiple elements': { strings: ['string1', 'string2'], result: new RegExp('^' + 'string1|string2' + '$') },
    // TODO: 'Multiple escaped elements': { strings: ['string (1)', 'string (2)'], result: new RegExp('^' + 'string \(1\)|string (2)' + '$') }
  }
)

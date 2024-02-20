/**
 * @author        Dr. J. Quader
 * @copyright     © 2021-2023 by J. Quader
 */
import cases from 'jest-in-case'
import { TextDecoder, TextEncoder } from 'util'

import { safeObjectId } from './shared-util-mongodb'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// prettier-ignore
cases(
  'safeObjectId(input)',
  ({ input, result }) => {
    expect(safeObjectId(input)?.toHexString()).toBe(result)
  },
  {
    'undefined': { input: undefined, result: undefined },
    'null': { input: null, result: undefined },
    'empty string': { input: '', result: undefined },
    'number': { input: 1234567890, result: undefined },
    'boolean': { input: true, result: undefined },
    'invalid short string': { input: 'invalid', result: undefined },
    'invalid 12 characters string': { input: 'abcabcabcabc', result: undefined },
    'invalid 24 characters irregular string': { input: 'abcdefghijklabcdefghijkl', result: undefined },
    'invalid 24 characters string': { input: 'abcabcabcabcabcabcabcabc', result: 'abcabcabcabcabcabcabcabc' },
    'valid id': { input: '5a1154523a6bcc1d245e143d', result: '5a1154523a6bcc1d245e143d' }
  }
)

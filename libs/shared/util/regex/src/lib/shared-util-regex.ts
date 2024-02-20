import { escapeRegExp } from '@jaqua/shared/util/formatting'

export const regexVideo = new RegExp('(^video)(/)[a-zA-Z0-9_]*')
export const regexPhoto = new RegExp('^image/jpeg$')

/**
 * Get regex to exactly match one of given strings
 * @param {string[]} strings
 * @returns {RegExp}
 */
export const regexToMatchString = (strings: string[]): RegExp => {
  const result = []
  if (!Array.isArray(strings)) return
  for (let i = 0; i < strings.length; i++) {
    const element = escapeRegExp(strings[i])
    result.push(element)
  }
  return new RegExp('^' + result.join('|') + '$')
}

export const NANO_ID = /^[a-zA-Z0-9\-_]{21}$/
export const METEOR_ID = /^[a-zA-Z0-9]{17,17}/
export const OBJECT_ID = /^[0-9a-fA-F]{24}$/
export const JWT = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/
export const TIMESTAMP = /^\d{10}$/

/**
 *  "2" - the first revision of BCrypt, which suffers from a minor security flaw and is generally not used anymore.
 *  "2a" - some implementations suffered from a very rare security flaw.
 *  "2y" - format specific to the crypt_blowfish BCrypt implementation, identical to "2a" in all but name.
 *  "2b" - latest revision of the official BCrypt algorithm
 */
export const BCRYPT = /^\$2[ayb]\$.{56}$/

/**
 *  ^d+
 *      The input must start with some 'd's (m>=1 times)
 *
 *  (\((g\(|[git](?!\()|\))+)*
 *      First parenthesis' content
 *      The following can appear n>=0 times:
 *        '(', then the following can appear p>=1 times:
 *          'g', then one of the following:
 *            - 'g('
 *            - ')'
 *            - 'g'/'i'/'t' - without a '(' after them (using negative lookahead)
 *
 *  (, ?d+(\((g\(|[git](?!\()|\))+)*)*
 *      Every other element (optional)
 *      Starts with a ',d', ',dd' or ',ddd', etc.
 *      then the same as the first parenthesis' content
 */
export const CONTENT_GENERATOR =
  /^d+(\((g\(|[git](?!\()|\))+)*(, ?d+(\((g\(|[git](?!\()|\))+)*)*$/

export const SHORTID = /^[\w\-_]{7,14}$/

export const CASE_ID = /^\d{8}$/

/**
 * RegExp to test a string for a ISO 8601 Date spec
 *  YYYY
 *  YYYY-MM
 *  YYYY-MM-DD
 *  YYYY-MM-DDThh:mmTZD
 *  YYYY-MM-DDThh:mm:ssTZD
 *  YYYY-MM-DDThh:mm:ss.sTZD
 * @see: https://www.w3.org/TR/NOTE-datetime
 * @type {RegExp}
 */
export const ISO_8601 =
  /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i

/**
 * RegExp to test a string for a full ISO 8601 Date
 * Does not do any sort of date validation, only checks if the string is according to the ISO 8601 spec.
 *  YYYY-MM-DDThh:mm:ss
 *  YYYY-MM-DDThh:mm:ssTZD
 *  YYYY-MM-DDThh:mm:ss.sTZD
 * @see: https://www.w3.org/TR/NOTE-datetime
 * @type {RegExp}
 */
export const ISO_8601_FULL =
  /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i

export const SAMPLE = {
  TIMESTAMP: 1234567890,
  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTExNTQ1MjNhNmJjYzFkMjQ1ZTE0M2QiLCJsYW5ndWFnZSI6ImRlIiwic3BlY2lhbGl0eSI6InBhZWRpYXRyaWNzIiwiaXNFZGl0b3IiOnRydWUsImlzRXhwZXJ0IjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxNjE5NjAyNiwiZXhwIjoxNTE2MTk3NDY2fQ.iVs_XnC0-iazFjRAec_GyQeg97YbsCkEBFXWbQ_JX0c',
  OBJECT_ID: '507f1f77bcf86cd799439011',
  DOI: 'https://doi.org/10.1111/j.1365-2141.2010.08545.x'
}

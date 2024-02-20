/**
 * @fileoverview  Sanitize and formatting functions
 * @author        Dr. J. Quader
 * @copyright     © 2013-2022 by J. Quader
 */
import { isValid, parseISO } from 'date-fns'

/**
 * Get safe date object of input value.
 * @param date
 * @returns {Date}
 */
export const safeDate = (date: unknown): Date => {
  if (date instanceof Date) return isValid(date) ? date : undefined
  else if (Number.isFinite(date) && String(date).length === 13) {
    const parsed = new Date(date as number)
    return isValid(parsed) ? parsed : undefined
  } else if (typeof date === 'string') {
    const parsed = parseISO(date as string)
    return isValid(parsed) ? parsed : undefined
  }
  return undefined
}

/**
 * Capitalize first letter of a string. If input is not of type string, an
 * empty string is created.
 * @param {string} string
 * @return {string}
 */
export const capitalizeFirstLetter = (string = ''): string => {
  return typeof string === 'string'
    ? string.charAt(0).toUpperCase() + string.slice(1)
    : ''
}

/**
 * Sanitize date receieved to number of milliseconds elapsed since
 * 1 January 1970 00:00:00 UTC
 * @return 10 digit unix timestamp
 */
export const sanitizeDate = (d: string | number): number => {
  const date: number = typeof d !== 'number' ? Number(d) : d
  return date.toString().length === 10 ? date : Math.floor(date / 1000)
}

/**
 * Round half away from zero ('commercial' rounding).
 * Uses correction to offset floating-point inaccuracies.
 * Works symmetrically for positive and negative numbers.
 */
export const round = (num, decimalPlaces = 0) => {
  const p = Math.pow(10, decimalPlaces)
  const n = num * p * (1 + Number.EPSILON)
  return Math.round(n) / p
}

/**
 * Escape regular expressions
 * @param {string} str
 * @return {string}
 */
export const escapeRegExp = (str: string): string => {
  return String(str).replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1')
}

/**
 * Output number with leading zeros
 * @return {string}
 */
export const zeroPad = (num, places) => {
  return String(num).padStart(places, '0')
}

/**
 * Clean up a string by using following rules:
 *    1. Remove leading and trailing spaces
 *    2. Replace multiple spaces with one space
 *    3. Remove space in front of a dot
 *    4. Space between two single (!) characters and dot should be removed: `e. g.` -> `e.g.`
 *    5. Remove space between number and 'x': `3 x` -> `3x`
 *    6. Remove leading and trailing spaces for bracket content
 *    7. Capitalize first letter of each sentence
 * @param {string} string - Input string
 * @return {string}
 */
export const sanitizeString = (string: string): string => {
  const abbrevs = [
    'Bzw.',
    'bzw.',
    'Ca.',
    'ca.',
    'Einschl.',
    'einschl.',
    'Etc.',
    'etc.',
    'Evtl.',
    'evtl.',
    'Excl.',
    'excl.',
    'Geb.',
    'geb.',
    'Ggf.',
    'ggf.',
    'Inkl.',
    'inkl.',
    'Vgl.',
    'vgl.'
  ]
  let str = string

  // Replace all abbreviations of the array with a placeholder
  abbrevs.forEach((abbrev) => {
    str = str.replace(
      new RegExp(escapeRegExp(abbrev), 'g'),
      'abbreviation<' + abbrev + '>'
    )
  })

  return str
    .replace(/\.{3}/g, '\u2026') // Convert `...`
    .replace(/%o/gi, '\u2030') // Convert promille
    .replace(/-->/g, '\u2192') // Convert arrow right
    .replace(/<--/g, '\u2190') // Convert arrow left
    .replace(/--\^/g, '\u2191') // Convert arrow up
    .replace(/--v/g, '\u2193') // Convert arrow down
    .replace(/<=/g, '\u2266') // Convert less or equal then
    .replace(/>=/g, '\u2267') // Convert greater or equal then
    .replace(/\+-/g, '\u00b1') // Convert plus minus
    .replace(/\*/g, '\u00d7') // Convert multiplication
    .replace(/::/g, '\u00f7') // Convert division
    .replace(/\^=/g, '\u2259') // Convert estimates
    .replace(/\(r\)/gi, '\u00ae') // Convert trademark
    .replace(/^\s+|\s+$/g, '') // Remove leading and trailing spaces
    .replace(/\s{2,}/g, ' ') // Replace multiple spaces with one space
    .replace(/\s+\./g, '.') // Remove space in front of a dot
    .replace(/([.])\s+([a-z])\b/g, '$1$2') // Space between two single characters and dot should be removed
    .replace(/(\d)\s+(x)/g, '$1$2') // Remove space between number and 'x'
    .replace(/(\()(?:\s+)|(?:\s+)(\))/g, '$1$2') // Remove leading and trailing spaces for bracket content

    .replace(/(\s[A-Za-z]\.[A-Za-z]\.\s)/g, 'abbreviation<$1>') // General replacement of abbreviations with format 'a.b.'
    .replace(/(\s\d\.\s)/g, 'abbreviation<$1>') // Counting with format 1.
    .replace(/.+?(?:[.?!:\u2026]\s|$)/g, (s) => {
      // Capitalize each sentence
      return s.charAt(0).toUpperCase() + s.slice(1)
    })

    .replace(new RegExp('abbreviation<(.*?)>', 'gi'), '$1') // Restore abbreviations
}

/**
 * Folds a string at a specified length, optionally attempting to insert
 * newlines after whitespace characters.
 * @param s - Input string
 * @param n - Number of chars at which to separate lines
 * @param a - Array used to build result
 * @return Returns an array of strings that are not longer than n
 * characters. The lines found in s will be pushed onto the end of a.
 */
export const fold = (
  s: string,
  n: number,
  a: Array<string> = []
): Array<string> => {
  if (s.length <= n) {
    a.push(s.trimStart())
    return a
  }
  let line: string = s.substring(0, n)
  const lastSpaceRgx = /\s(?!.*\s)/
  const idx: number = line.search(lastSpaceRgx)
  let nextIdx: number = n
  if (idx > 0) {
    line = line.substring(0, idx)
    nextIdx = idx
  }
  a.push(line.trim())
  return fold(s.substring(nextIdx), n, a)
}

/**
 * Returns the first `limit` characters from the given `string`.
 * @param string
 * @param limit
 * @returns {string}
 */
export const limit = (string = '', limit = 0) => {
  const result = string.substring(0, limit)
  return result.length < string.length ? result + '\u2026' : result
}

/**
 * Returns url string with prepended http / https protocol
 * @param url
 * @param options
 * @returns {URL}
 */
export const prependHttps = (url: string, { https = true } = {}) => {
  url = url.trim()
  const result = /^\.*\/|^(?!localhost)\w+?:/.test(url)
    ? url
    : url.replace(/^(?!(?:\w+?:)?\/\/)/, https ? 'https://' : 'http://')
  return new URL(result)
}

export const getLabelString = (type: string, value: string) => {
  switch (type) {
    case 'gender':
      if (value === 'male') return 'männlich'
      else if (value === 'female') return 'weiblich'
      return ''
    case 'timerange':
      if (value === 'days') return 'Tage'
      else if (value === 'months') return 'Monate'
      else if (value === 'years') return 'Jahre'
      return ''
    default:
      return ''
  }
}

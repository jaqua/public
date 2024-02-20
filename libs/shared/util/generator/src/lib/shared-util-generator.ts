/**
 * @fileoverview  Generators for text and values
 * @author        Dr. J. Quader
 * @copyright     © 2019-2023 by J. Quader
 */
import { startOfToday } from 'date-fns'
import { customAlphabet } from 'nanoid'

const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789'
export const getHash = customAlphabet(characters, 5)

/**
 * Get current timestamp in seconds.
 * @returns {number} ten digit timestamp
 */
export const timestamp = (): number => {
  return Math.floor(Date.now() / 1000)
}

/**
 * Get timestamp in seconds of start of the day.
 * @returns {number} ten digit timestamp
 */
export const todayTimestamp = (): number => {
  return startOfToday().getTime() / 1000
}

/**
 * Calculates Date in the past.
 * @param {number} seconds seconds to substract from current date
 * @param {number} [current] optional current timestamp in seconds
 * @returns {Date}
 */
export const getPastDateByTimestamp = (
  seconds: number,
  current?: number
): Date => {
  const ts: number = (current || timestamp()) - seconds
  return new Date(ts * 1000)
}

/**
 * Calculates Date in the past by diff values
 * @param {number} yDiff year difference
 * @param {number} mDiff month difference
 * @param {number} dDiff day difference
 * @returns {Date}
 */
export const getPastDateByDiff = (yDiff = 0, mDiff = 0, dDiff = 0): Date => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return new Date(year - yDiff, month - mDiff, day - dDiff)
}

/**
 * Generate random integer value in given range
 * @param min included minimal value
 * @param max included maximal value
 */
export const getRandomInt = (min = 0, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max || min + 1)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generate random float value in given range
 * @param min included minimal value
 * @param max excluded maximal value
 * @param [decimals] round value to number of decimals
 */
export const getRandomFloat = (min = 0, max = 1, decimals?: number): number => {
  const random = Math.random() * (max - min) + min
  return decimals === undefined ? random : +random.toFixed(decimals)
}

/**
 * Fill missing values of an sparse array
 * @param array input array
 * @param value fill missing values with given value
 * @returns dense array
 */
export const fillSparseArray = (
  array: Array<unknown>,
  value: unknown
): Array<unknown> => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === undefined) array[i] = value
  }
  return array
}

/**
 * Create array with numbers from 0 to n
 * @param n number of elements
 * @param start initial value is 0
 * @returns number array
 */
export const arrayNumber = (length: number, initial = 0): number[] => {
  const array = [...Array(length + initial).keys()]
  return initial ? array.splice(initial) : array
}

/**
 * Fills number with prepending string
 * @param num input value
 * @param targetLength length of result string
 * @returns {string} padded string
 */
export const leftFillNum = (num = 0, targetLength = 1): string => {
  if (!num) return ''
  return num.toString().padStart(targetLength, '0')
}

/**
 * A slug string is generated for every title of each content element.
 * It will remove spaces, convert german umlauts, remove non-word characters and
 * replace multiple dashes by single ones.
 * @summary Generate a slug string by given title.
 * @param {string} title
 * @return {string}
 */
export const generateSlug = (title: string): string => {
  return typeof title === 'string'
    ? title
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-zA-Z-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    : ''
}

/**
 * Generate object array with all boolean combinations.
 * @param {string[]} input
 * @returns {Object[]}
 */
export const generateBooleanCombination = (
  input: string[]
): Array<Record<string, boolean>> => {
  const result = []
  for (let i = 0; i < 1 << input.length; i++) {
    const object: Record<string, boolean> = {}
    for (let j = input.length - 1; j >= 0; j--) {
      object[input[j]] = Boolean(i & (1 << j))
    }
    result.push(object)
  }
  return result
}

/**
 * Destructuring object into dynamically named variables to recieve a subset of an object.
 * @param {Object} obj Sourceobject
 * @param {string[]} keys
 * @returns {Object}
 */
export const getSubset = (
  obj: Record<string, string>,
  ...keys: string[]
): Record<string, string> => keys.reduce((a, c) => ({ ...a, [c]: obj[c] }), {})

/**
 * Generate a string array representing all roles of an user
 * @param obj {Object} Object with role fields
 * @returns {string[]}
 */
export const generateRolesArray = (obj: Record<string, boolean>): string[] => {
  const roles = ['admin', 'editor', 'user']
  return roles.filter((field) => obj[field] === true)
}

export const meteorId = () => {
  const characters = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz'
  const id = customAlphabet(characters, 17)
  return id()
}

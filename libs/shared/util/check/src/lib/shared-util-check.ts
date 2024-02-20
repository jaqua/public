/**
 * @fileoverview  General helper
 * @author        Dr. J. Quader
 * @copyright     © 2013-2023 by J. Quader
 */

/**
 * Check if two arrays have same content
 */
export const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  )
}

/**
 * Check if object has prop
 * @param obj
 * @param prop
 */
export const hasProp = (obj, prop) =>
  Object.prototype.hasOwnProperty.call(obj, prop)

/**
 * Check if object is empty
 * @param {Object} obj
 * @return {boolean}
 */
export const isEmpty = (obj: object): boolean => {
  for (const key in obj) {
    if (hasProp(obj, key)) return false
  }
  return true
}

/**
 * Check if object has any elements
 */
export const objectHasKeys = (object: object): boolean => {
  return Object.keys(object).length !== 0
}

/**
 * Check if at least one element of object has a value.
 * @param object Object to test
 * @param every Set to true if every element should have a value; else we check if at least one element has value
 */
export const objectHasSomeValues = (object: object): boolean => {
  return (
    Object.keys(object).length !== 0 &&
    Object.values(object).some((x) => x !== undefined && x !== null && x !== '')
  )
}

/**
 * Check if every element of object has a value.
 * @param object Object to test
 */
export const objectHasEveryValues = (object: object): boolean => {
  return (
    Object.keys(object).length !== 0 &&
    Object.values(object).every(
      (x) => x !== undefined && x !== null && x !== ''
    )
  )
}

/**
 * Check if pin has exakt four digits
 * @param {string} input
 * @returns {boolean}
 */
export const isFourDigit = (input: string): boolean => {
  return /^\d{4}$/.test(input)
}

/**
 * Check if input has only numbers
 * @param {string} input
 * @returns {boolean}
 */
export const hasOnlyNumbers = (input: string): boolean => {
  return /^\d+$/.test(input)
}

/**
 * Checks if parentheses of a string are balanced.
 * @param {string}
 * @return {boolean}
 */
export function parenthesesAreBalanced(string: string): boolean {
  const parentheses = '[]{}()'
  const stack = []

  for (let i = 0; i < string?.length; i++) {
    const character = string[i]
    const bracePosition = parentheses.indexOf(character)

    if (bracePosition === -1) {
      continue
    }

    if (bracePosition % 2 === 0) {
      stack.push(bracePosition + 1) // push next expected brace position
    } else {
      if (stack.pop() !== bracePosition) {
        return false
      }
    }
  }
  return stack.length === 0
}

/**
 * Check if date string is valid date.
 * @param {string} input
 * @returns {string}
 */
export const isValidDate = (input: string): Date => {
  const dateRgx =
    /^\s*(3[01]|[12][0-9]|0[1-9])(?:\.)?(1[012]|0[1-9])(?:\.)?((20|19)?\d{2})\s*$/
  const isDate = String(input).match(dateRgx)
  if (!isDate) return

  const day: number = parseInt(isDate[1])
  const month: number = parseInt(isDate[2]) - 1
  const year: string =
    isDate[3].length === 2
      ? (parseInt(isDate[3]) > 60 ? 19 : 20) + isDate[3]
      : isDate[3]

  return new Date(parseInt(year, 10), month, day)
}

/**
 * Check if date string is valid caseId
 * @param {string}
 * @returns {number}
 */
export const isValidCaseId = (input: string): number => {
  const caseIdRgx = /^\d{7}$/
  const isValid = caseIdRgx.test(input)
  return isValid ? parseInt(input, 10) : -1
}

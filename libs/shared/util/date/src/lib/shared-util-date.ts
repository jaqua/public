/**
 * @fileoverview  Date functions
 * @author        Dr. J. Quader
 * @copyright     © 2022-2023 by J. Quader
 */
import { format, isMonday, setHours, startOfDay, subDays } from 'date-fns'
import utcToZonedTime from 'date-fns-tz/utcToZonedTime'
import de from 'date-fns/locale/de'

/**
 * Returns a formated time string.
 * @param {Date} input
 * @param {boolean} plain Output without time unit
 * @return {string}
 */
export const formattedTime = (input: Date, plain = false): string => {
  if (!input) return null
  const date = utcToZonedTime(new Date(input), 'Europe/Paris')
  if (date.toString() === 'Invalid Date') return ''
  return format(date, 'HH:mm') + (!plain ? ' Uhr' : '')
}

/**
 * Returns a formated date string.
 * @param {Date} input
 * @return {string}
 */
export const formattedDate = (input: Date | number): string => {
  if (!input) return null
  const date = utcToZonedTime(new Date(input), 'Europe/Paris')
  if (date.toString() === 'Invalid Date') return ''
  return format(date, 'P', { locale: de })
}

/**
 * Returns a formated date time string.
 * @param {Date} input
 * @param {boolean} plain Output without time unit
 * @return {string}
 */
export const formattedDateTime = (input: Date, plain = false): string => {
  if (!input) return null
  const date = utcToZonedTime(new Date(input), 'Europe/Paris')
  if (date.toString() === 'Invalid Date') return ''
  return format(date, 'Pp', { locale: de }) + (!plain ? ' Uhr' : '')
}

export const dateRange = (input?: string) => {
  const now = input ? new Date(input) : new Date()
  const f = setHours(startOfDay(subDays(now, isMonday(now) ? 3 : 1)), 7)
  const t = now
  return { f, t }
}

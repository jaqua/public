/**
 * @fileoverview  Sanitize and formatting functions
 * @author        Dr. J. Quader
 * @copyright     © 2022-2023 by J. Quader
 */
import 'react'
import ReactHtmlParser from 'react-html-parser'

/**
 * Sanitize string. *
 * @param {string} string
 * @returns {string} sanitized string
 */
export const formatHtml = (string = '') => {
  return ReactHtmlParser(
    string
      .replace(/SaO2/g, 'S<sub>a</sub>O<sub>2</sub>')
      .replace(/CO2/g, 'CO<sub>2</sub>')
      .replace(/O2/g, 'O<sub>2</sub>')
  )
}

/**
 * Converts indented text to JSON object
 * @param data {string[]} Lines of text data
 * @returns JSON object
 */
export const indentedTxtToJson = (data: Array<string>) => {
  const res: Record<string, any>[] = []
  const levels = [res]
  for (const line of data) {
    let level = line.search(/\S/) >> 1 // (index of first non whitespace char) / 2 --> IF indentation is 2 spaces
    const content = line.trim()
    const children: any = []
    if (!content) continue
    levels[level].push({ content, children })
    levels[++level] = children
  }
  return res
}

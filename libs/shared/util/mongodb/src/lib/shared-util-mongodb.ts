/**
 * @fileoverview  Sanitize and formatting functions
 * @author        Dr. J. Quader
 * @copyright     © 2013-2021 by J. Quader
 */
import { ObjectId } from 'mongodb'

/**
 * Sanitize ObjectId
 * @param {string} id - ObjectId
 * @return {(ObjectId|null)}
 */
export const safeObjectId = (id: string): ObjectId | null => {
  if (!(id && typeof id === 'string')) return null

  return ObjectId.isValid(id) && String(id).match(/^[0-9a-fA-F]{24}$/)
    ? new ObjectId(id)
    : null
}

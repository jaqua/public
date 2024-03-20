import { readFileSync } from 'fs'
import { join } from 'path'

/** Notecard */
export const notecardAdd = readFileSync(
  join(__dirname, 'notecard/notecardAdd.gql'),
  'utf8'
)
export const notecardUpdate = readFileSync(
  join(__dirname, 'notecard/notecardUpdate.gql'),
  'utf8'
)
export const notecardRemove = readFileSync(
  join(__dirname, 'notecard/notecardRemove.gql'),
  'utf8'
)

/** Video */
export const videoUpdateContent = readFileSync(
  join(__dirname, 'video/videoUpdateContent.gql'),
  'utf8'
)
export const videoRemove = readFileSync(
  join(__dirname, 'video/videoRemove.gql'),
  'utf8'
)

/** Video */
export const uploadFiles = readFileSync(
  join(__dirname, 'upload/upload.gql'),
  'utf8'
)

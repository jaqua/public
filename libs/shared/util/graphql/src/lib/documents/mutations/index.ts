import fs from 'fs'
import path from 'path'

/** User */
export const addUser = fs.readFileSync(
  path.join(__dirname, 'admin/addUser.gql'),
  'utf8'
)
export const userUpdate = fs.readFileSync(
  path.join(__dirname, 'admin/userUpdate.gql'),
  'utf8'
)
export const removeUser = fs.readFileSync(
  path.join(__dirname, 'admin/removeUser.gql'),
  'utf8'
)
export const resetPwd = fs.readFileSync(
  path.join(__dirname, 'admin/resetPwd.gql'),
  'utf8'
)
export const changePwd = fs.readFileSync(
  path.join(__dirname, 'admin/changePwd.gql'),
  'utf8'
)

/** Upload */
export const uploadFiles = fs.readFileSync(
  path.join(__dirname, 'upload.gql'),
  'utf8'
)

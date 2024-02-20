import { readFileSync } from 'fs';
import { join } from 'path';

export const error = readFileSync(join(__dirname, 'error.gql'), 'utf8');

/** Admin */
export const getUser = readFileSync(
  join(__dirname, 'admin/getUser.gql'),
  'utf8'
);
export const getUsers = readFileSync(
  join(__dirname, 'admin/getUsers.gql'),
  'utf8'
);

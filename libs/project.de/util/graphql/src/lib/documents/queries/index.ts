import { readFileSync } from 'fs';
import { join } from 'path';

export const error = readFileSync(join(__dirname, 'error.gql'), 'utf8');

export const getList = readFileSync(join(__dirname, 'getList.gql'), 'utf8');
export const search = readFileSync(
  join(__dirname, 'search/search.gql'),
  'utf8'
);

/** Notecard */
export const notecardList = readFileSync(
  join(__dirname, 'notecard/nodecardList.gql'),
  'utf8'
);
export const notecardContent = readFileSync(
  join(__dirname, 'notecard/nodecardContent.gql'),
  'utf8'
);

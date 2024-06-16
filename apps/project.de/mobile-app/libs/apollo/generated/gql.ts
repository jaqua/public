/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation notecardAdd($input: NotecardAddInput!) {\n  notecardAdd(input: $input)\n}": types.NotecardAddDocument,
    "mutation notecardRemove($input: NotecardRemoveInput!) {\n  notecardRemove(input: $input)\n}": types.NotecardRemoveDocument,
    "mutation notecardUpdate($input: NotecardUpdateInput!) {\n  notecardUpdate(input: $input)\n}": types.NotecardUpdateDocument,
    "mutation uploadFiles($files: [Upload!]!, $bucketName: String) {\n  uploadFiles(files: $files, bucketName: $bucketName) {\n    id\n    thumbId\n    filename\n    status\n    reason\n  }\n}": types.UploadFilesDocument,
    "mutation videoRemove($input: VideoRemoveInput!) {\n  videoRemove(input: $input)\n}": types.VideoRemoveDocument,
    "mutation videoUpdateContent($input: VideoUpdateContentInput!) {\n  videoUpdateContent(input: $input)\n}": types.VideoUpdateContentDocument,
    "query getList($type: String!) {\n  getList(type: $type) {\n    id\n    title\n    slug\n    type\n  }\n}": types.GetListDocument,
    "query notecardContent($param: NotecardContentParam!) {\n  notecardContent(param: $param) {\n    id\n    title\n    category\n    synonyms\n    intro\n    content\n    updatedAt\n    training {\n      id\n      type\n      time\n      answer\n      result\n    }\n  }\n}": types.NotecardContentDocument,
    "query notecardList {\n  notecardList {\n    id\n    title\n    slug\n    category\n    synonyms\n    intro\n    content\n    type\n    createdAt\n  }\n}": types.NotecardListDocument,
    "query getFiles {\n  getFiles {\n    _id\n    metadata {\n      parent\n      fullId\n      smallId\n      thumbnailId\n      height\n      width\n    }\n  }\n}": types.GetFilesDocument,
    "mutation addUser($input: AddUserInput!) {\n  addUser(input: $input)\n}": types.AddUserDocument,
    "mutation changePwd($input: ChangePwdInput!) {\n  changePwd(input: $input)\n}": types.ChangePwdDocument,
    "mutation removeUser($input: RemoveUserInput!) {\n  removeUser(input: $input)\n}": types.RemoveUserDocument,
    "mutation resetPwd($input: ResetPwdInput!) {\n  resetPwd(input: $input)\n}": types.ResetPwdDocument,
    "mutation userUpdate($input: UserUpdateInput!) {\n  userUpdate(input: $input)\n}": types.UserUpdateDocument,
    "query getUser($param: UserParam!) {\n  getUser(param: $param) {\n    id\n    username\n    roles\n    professionalGroup\n  }\n}": types.GetUserDocument,
    "query getUsers {\n  getUsers {\n    id\n    username\n    roles\n    professionalGroup\n  }\n}": types.GetUsersDocument,
    "query Error {\n  error {\n    statusCode\n    message\n    location\n    path\n  }\n}": types.ErrorDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation notecardAdd($input: NotecardAddInput!) {\n  notecardAdd(input: $input)\n}"): (typeof documents)["mutation notecardAdd($input: NotecardAddInput!) {\n  notecardAdd(input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation notecardRemove($input: NotecardRemoveInput!) {\n  notecardRemove(input: $input)\n}"): (typeof documents)["mutation notecardRemove($input: NotecardRemoveInput!) {\n  notecardRemove(input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation notecardUpdate($input: NotecardUpdateInput!) {\n  notecardUpdate(input: $input)\n}"): (typeof documents)["mutation notecardUpdate($input: NotecardUpdateInput!) {\n  notecardUpdate(input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation uploadFiles($files: [Upload!]!, $bucketName: String) {\n  uploadFiles(files: $files, bucketName: $bucketName) {\n    id\n    thumbId\n    filename\n    status\n    reason\n  }\n}"): (typeof documents)["mutation uploadFiles($files: [Upload!]!, $bucketName: String) {\n  uploadFiles(files: $files, bucketName: $bucketName) {\n    id\n    thumbId\n    filename\n    status\n    reason\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation videoRemove($input: VideoRemoveInput!) {\n  videoRemove(input: $input)\n}"): (typeof documents)["mutation videoRemove($input: VideoRemoveInput!) {\n  videoRemove(input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation videoUpdateContent($input: VideoUpdateContentInput!) {\n  videoUpdateContent(input: $input)\n}"): (typeof documents)["mutation videoUpdateContent($input: VideoUpdateContentInput!) {\n  videoUpdateContent(input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getList($type: String!) {\n  getList(type: $type) {\n    id\n    title\n    slug\n    type\n  }\n}"): (typeof documents)["query getList($type: String!) {\n  getList(type: $type) {\n    id\n    title\n    slug\n    type\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query notecardContent($param: NotecardContentParam!) {\n  notecardContent(param: $param) {\n    id\n    title\n    category\n    synonyms\n    intro\n    content\n    updatedAt\n    training {\n      id\n      type\n      time\n      answer\n      result\n    }\n  }\n}"): (typeof documents)["query notecardContent($param: NotecardContentParam!) {\n  notecardContent(param: $param) {\n    id\n    title\n    category\n    synonyms\n    intro\n    content\n    updatedAt\n    training {\n      id\n      type\n      time\n      answer\n      result\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query notecardList {\n  notecardList {\n    id\n    title\n    slug\n    category\n    synonyms\n    intro\n    content\n    type\n    createdAt\n  }\n}"): (typeof documents)["query notecardList {\n  notecardList {\n    id\n    title\n    slug\n    category\n    synonyms\n    intro\n    content\n    type\n    createdAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getFiles {\n  getFiles {\n    _id\n    metadata {\n      parent\n      fullId\n      smallId\n      thumbnailId\n      height\n      width\n    }\n  }\n}"): (typeof documents)["query getFiles {\n  getFiles {\n    _id\n    metadata {\n      parent\n      fullId\n      smallId\n      thumbnailId\n      height\n      width\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation addUser($input: AddUserInput!) {\n  addUser(input: $input)\n}"): (typeof documents)["mutation addUser($input: AddUserInput!) {\n  addUser(input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation changePwd($input: ChangePwdInput!) {\n  changePwd(input: $input)\n}"): (typeof documents)["mutation changePwd($input: ChangePwdInput!) {\n  changePwd(input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation removeUser($input: RemoveUserInput!) {\n  removeUser(input: $input)\n}"): (typeof documents)["mutation removeUser($input: RemoveUserInput!) {\n  removeUser(input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation resetPwd($input: ResetPwdInput!) {\n  resetPwd(input: $input)\n}"): (typeof documents)["mutation resetPwd($input: ResetPwdInput!) {\n  resetPwd(input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation userUpdate($input: UserUpdateInput!) {\n  userUpdate(input: $input)\n}"): (typeof documents)["mutation userUpdate($input: UserUpdateInput!) {\n  userUpdate(input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getUser($param: UserParam!) {\n  getUser(param: $param) {\n    id\n    username\n    roles\n    professionalGroup\n  }\n}"): (typeof documents)["query getUser($param: UserParam!) {\n  getUser(param: $param) {\n    id\n    username\n    roles\n    professionalGroup\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getUsers {\n  getUsers {\n    id\n    username\n    roles\n    professionalGroup\n  }\n}"): (typeof documents)["query getUsers {\n  getUsers {\n    id\n    username\n    roles\n    professionalGroup\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Error {\n  error {\n    statusCode\n    message\n    location\n    path\n  }\n}"): (typeof documents)["query Error {\n  error {\n    statusCode\n    message\n    location\n    path\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
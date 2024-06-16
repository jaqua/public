/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AccessToken = {
  __typename?: 'AccessToken';
  access_token: Scalars['String']['output'];
};

export type AddUserInput = {
  professionalGroup?: InputMaybe<Scalars['String']['input']>;
  roles: Array<InputMaybe<Scalars['String']['input']>>;
  username: Scalars['String']['input'];
};

export type ChangePwdInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ContentDataset = {
  __typename?: 'ContentDataset';
  category?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  communicationIsClosed?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  isEdited?: Maybe<ContentStatus>;
  isFinalized?: Maybe<ContentStatus>;
  isReviewed?: Maybe<ContentStatus>;
  slug: Scalars['String']['output'];
  synonyms?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type ContentStatus = {
  __typename?: 'ContentStatus';
  timestamp?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<Scalars['String']['output']>;
};

export type Error = {
  __typename?: 'Error';
  location?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type File = {
  __typename?: 'File';
  _id: Scalars['ID']['output'];
  chunkSize?: Maybe<Scalars['Int']['output']>;
  contentType: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  length?: Maybe<Scalars['Int']['output']>;
  metadata?: Maybe<FileMetadata>;
  uploadDate?: Maybe<Scalars['Date']['output']>;
};

export type FileMetadata = {
  __typename?: 'FileMetadata';
  children?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  codec?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  editedId?: Maybe<Scalars['ID']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  fullId?: Maybe<Scalars['ID']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  mainId?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Scalars['ID']['output']>;
  smallId?: Maybe<Scalars['ID']['output']>;
  thumbnailId?: Maybe<Scalars['ID']['output']>;
  uploadDate?: Maybe<Scalars['Date']['output']>;
  versionName?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type LoginUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser?: Maybe<Scalars['ID']['output']>;
  changePwd?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<AccessToken>;
  notecardAdd?: Maybe<Scalars['String']['output']>;
  notecardRemove?: Maybe<Scalars['Boolean']['output']>;
  notecardUpdate?: Maybe<Scalars['Int']['output']>;
  removeUser?: Maybe<Scalars['Boolean']['output']>;
  resetPwd?: Maybe<Scalars['Boolean']['output']>;
  uploadFiles?: Maybe<Array<Maybe<UploadResult>>>;
  userUpdate?: Maybe<Scalars['Boolean']['output']>;
  videoRemove?: Maybe<Scalars['Boolean']['output']>;
  videoUpdateContent?: Maybe<Scalars['Int']['output']>;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationChangePwdArgs = {
  input: ChangePwdInput;
};


export type MutationLoginArgs = {
  input: UserInput;
};


export type MutationNotecardAddArgs = {
  input: NotecardAddInput;
};


export type MutationNotecardRemoveArgs = {
  input: NotecardRemoveInput;
};


export type MutationNotecardUpdateArgs = {
  input: NotecardUpdateInput;
};


export type MutationRemoveUserArgs = {
  input: RemoveUserInput;
};


export type MutationResetPwdArgs = {
  input: ResetPwdInput;
};


export type MutationUploadFilesArgs = {
  bucketName?: InputMaybe<Scalars['String']['input']>;
  files: Array<Scalars['Upload']['input']>;
};


export type MutationUserUpdateArgs = {
  input: UserUpdateInput;
};


export type MutationVideoRemoveArgs = {
  input: VideoRemoveInput;
};


export type MutationVideoUpdateContentArgs = {
  input: VideoUpdateContentInput;
};

export type Notecard = {
  __typename?: 'Notecard';
  category?: Maybe<Array<Scalars['String']['output']>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  intro?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  synonyms?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  training?: Maybe<TrainingCompleted>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type NotecardAddInput = {
  category?: InputMaybe<Array<Scalars['String']['input']>>;
  content: Scalars['String']['input'];
  intro?: InputMaybe<Scalars['String']['input']>;
  synonyms?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type NotecardContentParam = {
  name: Scalars['String']['input'];
  testId?: InputMaybe<Scalars['ID']['input']>;
  value: Scalars['String']['input'];
};

export type NotecardRemoveInput = {
  id: Scalars['ID']['input'];
};

export type NotecardUpdateInput = {
  category?: InputMaybe<Array<Scalars['String']['input']>>;
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  intro?: InputMaybe<Scalars['String']['input']>;
  synonyms?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  error?: Maybe<Error>;
  getFiles?: Maybe<Array<Maybe<File>>>;
  getList?: Maybe<Array<Maybe<ContentDataset>>>;
  getUploadedFile?: Maybe<Scalars['String']['output']>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  notecardContent?: Maybe<Notecard>;
  notecardList?: Maybe<Array<Maybe<Notecard>>>;
  search?: Maybe<Array<Maybe<ContentDataset>>>;
};


export type QueryGetListArgs = {
  type: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  param?: InputMaybe<UserParam>;
};


export type QueryNotecardContentArgs = {
  param: NotecardContentParam;
};


export type QuerySearchArgs = {
  param: SearchParam;
};

export type RemoveUserInput = {
  username: Scalars['String']['input'];
};

export type ResetPwdInput = {
  username: Scalars['String']['input'];
};

export type Result = {
  __typename?: 'Result';
  insertedId?: Maybe<Scalars['ID']['output']>;
  insertedIds?: Maybe<Array<Scalars['ID']['output']>>;
  result?: Maybe<WriteResult>;
};

export type SearchParam = {
  target: Scalars['String']['input'];
  term: Scalars['String']['input'];
};

export type Status = {
  __typename?: 'Status';
  isCompleted?: Maybe<Scalars['Boolean']['output']>;
  isEdited?: Maybe<Scalars['Boolean']['output']>;
  isFinalized?: Maybe<Scalars['Boolean']['output']>;
  isReviewed?: Maybe<Scalars['Boolean']['output']>;
};

export type TrainingCompleted = {
  __typename?: 'TrainingCompleted';
  answer: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  result: Scalars['Int']['output'];
  time: Scalars['Date']['output'];
  type: Scalars['String']['output'];
};

export type UploadResult = {
  __typename?: 'UploadResult';
  filename: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  thumbId?: Maybe<Scalars['ID']['output']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  password: Scalars['String']['output'];
  professionalGroup?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  roles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  training?: Maybe<Array<TrainingCompleted>>;
  username: Scalars['String']['output'];
};

export type UserData = {
  __typename?: 'UserData';
  id: Scalars['ID']['output'];
  professionalGroup?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
  username: Scalars['String']['output'];
};

export type UserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserParam = {
  username: Scalars['String']['input'];
};

export type UserUpdateInput = {
  professionalGroup?: InputMaybe<Scalars['String']['input']>;
  roles: Array<InputMaybe<Scalars['String']['input']>>;
  username: Scalars['String']['input'];
};

export type Video = {
  __typename?: 'Video';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type VideoRemoveInput = {
  fileId: Scalars['ID']['input'];
};

export type VideoUpdateContentInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type WriteResult = {
  __typename?: 'WriteResult';
  n?: Maybe<Scalars['Int']['output']>;
  nInserted?: Maybe<Scalars['Int']['output']>;
  nModified?: Maybe<Scalars['Int']['output']>;
  nRemoved?: Maybe<Scalars['Int']['output']>;
  ok?: Maybe<Scalars['Int']['output']>;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type NotecardAddMutationVariables = Exact<{
  input: NotecardAddInput;
}>;


export type NotecardAddMutation = { __typename?: 'Mutation', notecardAdd?: string | null };

export type NotecardRemoveMutationVariables = Exact<{
  input: NotecardRemoveInput;
}>;


export type NotecardRemoveMutation = { __typename?: 'Mutation', notecardRemove?: boolean | null };

export type NotecardUpdateMutationVariables = Exact<{
  input: NotecardUpdateInput;
}>;


export type NotecardUpdateMutation = { __typename?: 'Mutation', notecardUpdate?: number | null };

export type UploadFilesMutationVariables = Exact<{
  files: Array<Scalars['Upload']['input']> | Scalars['Upload']['input'];
  bucketName?: InputMaybe<Scalars['String']['input']>;
}>;


export type UploadFilesMutation = { __typename?: 'Mutation', uploadFiles?: Array<{ __typename?: 'UploadResult', id?: string | null, thumbId?: string | null, filename: string, status: string, reason?: string | null } | null> | null };

export type VideoRemoveMutationVariables = Exact<{
  input: VideoRemoveInput;
}>;


export type VideoRemoveMutation = { __typename?: 'Mutation', videoRemove?: boolean | null };

export type VideoUpdateContentMutationVariables = Exact<{
  input: VideoUpdateContentInput;
}>;


export type VideoUpdateContentMutation = { __typename?: 'Mutation', videoUpdateContent?: number | null };

export type GetListQueryVariables = Exact<{
  type: Scalars['String']['input'];
}>;


export type GetListQuery = { __typename?: 'Query', getList?: Array<{ __typename?: 'ContentDataset', id: string, title: string, slug: string, type?: string | null } | null> | null };

export type NotecardContentQueryVariables = Exact<{
  param: NotecardContentParam;
}>;


export type NotecardContentQuery = { __typename?: 'Query', notecardContent?: { __typename?: 'Notecard', id: string, title: string, category?: Array<string> | null, synonyms?: Array<string> | null, intro?: string | null, content?: string | null, updatedAt?: any | null, training?: { __typename?: 'TrainingCompleted', id: string, type: string, time: any, answer: string, result: number } | null } | null };

export type NotecardListQueryVariables = Exact<{ [key: string]: never; }>;


export type NotecardListQuery = { __typename?: 'Query', notecardList?: Array<{ __typename?: 'Notecard', id: string, title: string, slug: string, category?: Array<string> | null, synonyms?: Array<string> | null, intro?: string | null, content?: string | null, type?: string | null, createdAt?: any | null } | null> | null };

export type GetFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFilesQuery = { __typename?: 'Query', getFiles?: Array<{ __typename?: 'File', _id: string, metadata?: { __typename?: 'FileMetadata', parent?: string | null, fullId?: string | null, smallId?: string | null, thumbnailId?: string | null, height?: number | null, width?: number | null } | null } | null> | null };

export type AddUserMutationVariables = Exact<{
  input: AddUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser?: string | null };

export type ChangePwdMutationVariables = Exact<{
  input: ChangePwdInput;
}>;


export type ChangePwdMutation = { __typename?: 'Mutation', changePwd?: boolean | null };

export type RemoveUserMutationVariables = Exact<{
  input: RemoveUserInput;
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser?: boolean | null };

export type ResetPwdMutationVariables = Exact<{
  input: ResetPwdInput;
}>;


export type ResetPwdMutation = { __typename?: 'Mutation', resetPwd?: boolean | null };

export type UserUpdateMutationVariables = Exact<{
  input: UserUpdateInput;
}>;


export type UserUpdateMutation = { __typename?: 'Mutation', userUpdate?: boolean | null };

export type GetUserQueryVariables = Exact<{
  param: UserParam;
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id?: string | null, username: string, roles?: Array<string | null> | null, professionalGroup?: string | null } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', id?: string | null, username: string, roles?: Array<string | null> | null, professionalGroup?: string | null } | null> | null };

export type ErrorQueryVariables = Exact<{ [key: string]: never; }>;


export type ErrorQuery = { __typename?: 'Query', error?: { __typename?: 'Error', statusCode?: number | null, message?: string | null, location?: string | null, path?: string | null } | null };


export const NotecardAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"notecardAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotecardAddInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notecardAdd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<NotecardAddMutation, NotecardAddMutationVariables>;
export const NotecardRemoveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"notecardRemove"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotecardRemoveInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notecardRemove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<NotecardRemoveMutation, NotecardRemoveMutationVariables>;
export const NotecardUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"notecardUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotecardUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notecardUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<NotecardUpdateMutation, NotecardUpdateMutationVariables>;
export const UploadFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"files"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bucketName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"files"},"value":{"kind":"Variable","name":{"kind":"Name","value":"files"}}},{"kind":"Argument","name":{"kind":"Name","value":"bucketName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bucketName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"thumbId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]} as unknown as DocumentNode<UploadFilesMutation, UploadFilesMutationVariables>;
export const VideoRemoveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"videoRemove"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoRemoveInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoRemove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<VideoRemoveMutation, VideoRemoveMutationVariables>;
export const VideoUpdateContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"videoUpdateContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoUpdateContentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoUpdateContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<VideoUpdateContentMutation, VideoUpdateContentMutationVariables>;
export const GetListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetListQuery, GetListQueryVariables>;
export const NotecardContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"notecardContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotecardContentParam"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notecardContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"}},{"kind":"Field","name":{"kind":"Name","value":"intro"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"training"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]}}]} as unknown as DocumentNode<NotecardContentQuery, NotecardContentQueryVariables>;
export const NotecardListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"notecardList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notecardList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"}},{"kind":"Field","name":{"kind":"Name","value":"intro"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<NotecardListQuery, NotecardListQueryVariables>;
export const GetFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"}},{"kind":"Field","name":{"kind":"Name","value":"fullId"}},{"kind":"Field","name":{"kind":"Name","value":"smallId"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]}}]}}]} as unknown as DocumentNode<GetFilesQuery, GetFilesQueryVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const ChangePwdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changePwd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePwdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePwd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ChangePwdMutation, ChangePwdMutationVariables>;
export const RemoveUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RemoveUserMutation, RemoveUserMutationVariables>;
export const ResetPwdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resetPwd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPwdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPwd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ResetPwdMutation, ResetPwdMutationVariables>;
export const UserUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"userUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UserUpdateMutation, UserUpdateMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserParam"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"professionalGroup"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"professionalGroup"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const ErrorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statusCode"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]} as unknown as DocumentNode<ErrorQuery, ErrorQueryVariables>;

export const NotecardAddDocument = gql`
    mutation notecardAdd($input: NotecardAddInput!) {
  notecardAdd(input: $input)
}
    `;
export type NotecardAddMutationFn = Apollo.MutationFunction<NotecardAddMutation, NotecardAddMutationVariables>;

/**
 * __useNotecardAddMutation__
 *
 * To run a mutation, you first call `useNotecardAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotecardAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notecardAddMutation, { data, loading, error }] = useNotecardAddMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNotecardAddMutation(baseOptions?: Apollo.MutationHookOptions<NotecardAddMutation, NotecardAddMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotecardAddMutation, NotecardAddMutationVariables>(NotecardAddDocument, options);
      }
export type NotecardAddMutationHookResult = ReturnType<typeof useNotecardAddMutation>;
export type NotecardAddMutationResult = Apollo.MutationResult<NotecardAddMutation>;
export type NotecardAddMutationOptions = Apollo.BaseMutationOptions<NotecardAddMutation, NotecardAddMutationVariables>;
export const NotecardRemoveDocument = gql`
    mutation notecardRemove($input: NotecardRemoveInput!) {
  notecardRemove(input: $input)
}
    `;
export type NotecardRemoveMutationFn = Apollo.MutationFunction<NotecardRemoveMutation, NotecardRemoveMutationVariables>;

/**
 * __useNotecardRemoveMutation__
 *
 * To run a mutation, you first call `useNotecardRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotecardRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notecardRemoveMutation, { data, loading, error }] = useNotecardRemoveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNotecardRemoveMutation(baseOptions?: Apollo.MutationHookOptions<NotecardRemoveMutation, NotecardRemoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotecardRemoveMutation, NotecardRemoveMutationVariables>(NotecardRemoveDocument, options);
      }
export type NotecardRemoveMutationHookResult = ReturnType<typeof useNotecardRemoveMutation>;
export type NotecardRemoveMutationResult = Apollo.MutationResult<NotecardRemoveMutation>;
export type NotecardRemoveMutationOptions = Apollo.BaseMutationOptions<NotecardRemoveMutation, NotecardRemoveMutationVariables>;
export const NotecardUpdateDocument = gql`
    mutation notecardUpdate($input: NotecardUpdateInput!) {
  notecardUpdate(input: $input)
}
    `;
export type NotecardUpdateMutationFn = Apollo.MutationFunction<NotecardUpdateMutation, NotecardUpdateMutationVariables>;

/**
 * __useNotecardUpdateMutation__
 *
 * To run a mutation, you first call `useNotecardUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotecardUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notecardUpdateMutation, { data, loading, error }] = useNotecardUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNotecardUpdateMutation(baseOptions?: Apollo.MutationHookOptions<NotecardUpdateMutation, NotecardUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotecardUpdateMutation, NotecardUpdateMutationVariables>(NotecardUpdateDocument, options);
      }
export type NotecardUpdateMutationHookResult = ReturnType<typeof useNotecardUpdateMutation>;
export type NotecardUpdateMutationResult = Apollo.MutationResult<NotecardUpdateMutation>;
export type NotecardUpdateMutationOptions = Apollo.BaseMutationOptions<NotecardUpdateMutation, NotecardUpdateMutationVariables>;
export const UploadFilesDocument = gql`
    mutation uploadFiles($files: [Upload!]!, $bucketName: String) {
  uploadFiles(files: $files, bucketName: $bucketName) {
    id
    thumbId
    filename
    status
    reason
  }
}
    `;
export type UploadFilesMutationFn = Apollo.MutationFunction<UploadFilesMutation, UploadFilesMutationVariables>;

/**
 * __useUploadFilesMutation__
 *
 * To run a mutation, you first call `useUploadFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFilesMutation, { data, loading, error }] = useUploadFilesMutation({
 *   variables: {
 *      files: // value for 'files'
 *      bucketName: // value for 'bucketName'
 *   },
 * });
 */
export function useUploadFilesMutation(baseOptions?: Apollo.MutationHookOptions<UploadFilesMutation, UploadFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFilesMutation, UploadFilesMutationVariables>(UploadFilesDocument, options);
      }
export type UploadFilesMutationHookResult = ReturnType<typeof useUploadFilesMutation>;
export type UploadFilesMutationResult = Apollo.MutationResult<UploadFilesMutation>;
export type UploadFilesMutationOptions = Apollo.BaseMutationOptions<UploadFilesMutation, UploadFilesMutationVariables>;
export const VideoRemoveDocument = gql`
    mutation videoRemove($input: VideoRemoveInput!) {
  videoRemove(input: $input)
}
    `;
export type VideoRemoveMutationFn = Apollo.MutationFunction<VideoRemoveMutation, VideoRemoveMutationVariables>;

/**
 * __useVideoRemoveMutation__
 *
 * To run a mutation, you first call `useVideoRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVideoRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [videoRemoveMutation, { data, loading, error }] = useVideoRemoveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVideoRemoveMutation(baseOptions?: Apollo.MutationHookOptions<VideoRemoveMutation, VideoRemoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VideoRemoveMutation, VideoRemoveMutationVariables>(VideoRemoveDocument, options);
      }
export type VideoRemoveMutationHookResult = ReturnType<typeof useVideoRemoveMutation>;
export type VideoRemoveMutationResult = Apollo.MutationResult<VideoRemoveMutation>;
export type VideoRemoveMutationOptions = Apollo.BaseMutationOptions<VideoRemoveMutation, VideoRemoveMutationVariables>;
export const VideoUpdateContentDocument = gql`
    mutation videoUpdateContent($input: VideoUpdateContentInput!) {
  videoUpdateContent(input: $input)
}
    `;
export type VideoUpdateContentMutationFn = Apollo.MutationFunction<VideoUpdateContentMutation, VideoUpdateContentMutationVariables>;

/**
 * __useVideoUpdateContentMutation__
 *
 * To run a mutation, you first call `useVideoUpdateContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVideoUpdateContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [videoUpdateContentMutation, { data, loading, error }] = useVideoUpdateContentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVideoUpdateContentMutation(baseOptions?: Apollo.MutationHookOptions<VideoUpdateContentMutation, VideoUpdateContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VideoUpdateContentMutation, VideoUpdateContentMutationVariables>(VideoUpdateContentDocument, options);
      }
export type VideoUpdateContentMutationHookResult = ReturnType<typeof useVideoUpdateContentMutation>;
export type VideoUpdateContentMutationResult = Apollo.MutationResult<VideoUpdateContentMutation>;
export type VideoUpdateContentMutationOptions = Apollo.BaseMutationOptions<VideoUpdateContentMutation, VideoUpdateContentMutationVariables>;
export const GetListDocument = gql`
    query getList($type: String!) {
  getList(type: $type) {
    id
    title
    slug
    type
  }
}
    `;

/**
 * __useGetListQuery__
 *
 * To run a query within a React component, call `useGetListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetListQuery(baseOptions: Apollo.QueryHookOptions<GetListQuery, GetListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListQuery, GetListQueryVariables>(GetListDocument, options);
      }
export function useGetListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListQuery, GetListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListQuery, GetListQueryVariables>(GetListDocument, options);
        }
export type GetListQueryHookResult = ReturnType<typeof useGetListQuery>;
export type GetListLazyQueryHookResult = ReturnType<typeof useGetListLazyQuery>;
export type GetListQueryResult = Apollo.QueryResult<GetListQuery, GetListQueryVariables>;
export const NotecardContentDocument = gql`
    query notecardContent($param: NotecardContentParam!) {
  notecardContent(param: $param) {
    id
    title
    category
    synonyms
    intro
    content
    updatedAt
    training {
      id
      type
      time
      answer
      result
    }
  }
}
    `;

/**
 * __useNotecardContentQuery__
 *
 * To run a query within a React component, call `useNotecardContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotecardContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotecardContentQuery({
 *   variables: {
 *      param: // value for 'param'
 *   },
 * });
 */
export function useNotecardContentQuery(baseOptions: Apollo.QueryHookOptions<NotecardContentQuery, NotecardContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotecardContentQuery, NotecardContentQueryVariables>(NotecardContentDocument, options);
      }
export function useNotecardContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotecardContentQuery, NotecardContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotecardContentQuery, NotecardContentQueryVariables>(NotecardContentDocument, options);
        }
export type NotecardContentQueryHookResult = ReturnType<typeof useNotecardContentQuery>;
export type NotecardContentLazyQueryHookResult = ReturnType<typeof useNotecardContentLazyQuery>;
export type NotecardContentQueryResult = Apollo.QueryResult<NotecardContentQuery, NotecardContentQueryVariables>;
export const NotecardListDocument = gql`
    query notecardList {
  notecardList {
    id
    title
    slug
    category
    synonyms
    intro
    content
    type
    createdAt
  }
}
    `;

/**
 * __useNotecardListQuery__
 *
 * To run a query within a React component, call `useNotecardListQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotecardListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotecardListQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotecardListQuery(baseOptions?: Apollo.QueryHookOptions<NotecardListQuery, NotecardListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotecardListQuery, NotecardListQueryVariables>(NotecardListDocument, options);
      }
export function useNotecardListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotecardListQuery, NotecardListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotecardListQuery, NotecardListQueryVariables>(NotecardListDocument, options);
        }
export type NotecardListQueryHookResult = ReturnType<typeof useNotecardListQuery>;
export type NotecardListLazyQueryHookResult = ReturnType<typeof useNotecardListLazyQuery>;
export type NotecardListQueryResult = Apollo.QueryResult<NotecardListQuery, NotecardListQueryVariables>;
export const GetFilesDocument = gql`
    query getFiles {
  getFiles {
    _id
    metadata {
      parent
      fullId
      smallId
      thumbnailId
      height
      width
    }
  }
}
    `;

/**
 * __useGetFilesQuery__
 *
 * To run a query within a React component, call `useGetFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFilesQuery(baseOptions?: Apollo.QueryHookOptions<GetFilesQuery, GetFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilesQuery, GetFilesQueryVariables>(GetFilesDocument, options);
      }
export function useGetFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilesQuery, GetFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilesQuery, GetFilesQueryVariables>(GetFilesDocument, options);
        }
export type GetFilesQueryHookResult = ReturnType<typeof useGetFilesQuery>;
export type GetFilesLazyQueryHookResult = ReturnType<typeof useGetFilesLazyQuery>;
export type GetFilesQueryResult = Apollo.QueryResult<GetFilesQuery, GetFilesQueryVariables>;
export const AddUserDocument = gql`
    mutation addUser($input: AddUserInput!) {
  addUser(input: $input)
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const ChangePwdDocument = gql`
    mutation changePwd($input: ChangePwdInput!) {
  changePwd(input: $input)
}
    `;
export type ChangePwdMutationFn = Apollo.MutationFunction<ChangePwdMutation, ChangePwdMutationVariables>;

/**
 * __useChangePwdMutation__
 *
 * To run a mutation, you first call `useChangePwdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePwdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePwdMutation, { data, loading, error }] = useChangePwdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePwdMutation(baseOptions?: Apollo.MutationHookOptions<ChangePwdMutation, ChangePwdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePwdMutation, ChangePwdMutationVariables>(ChangePwdDocument, options);
      }
export type ChangePwdMutationHookResult = ReturnType<typeof useChangePwdMutation>;
export type ChangePwdMutationResult = Apollo.MutationResult<ChangePwdMutation>;
export type ChangePwdMutationOptions = Apollo.BaseMutationOptions<ChangePwdMutation, ChangePwdMutationVariables>;
export const RemoveUserDocument = gql`
    mutation removeUser($input: RemoveUserInput!) {
  removeUser(input: $input)
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const ResetPwdDocument = gql`
    mutation resetPwd($input: ResetPwdInput!) {
  resetPwd(input: $input)
}
    `;
export type ResetPwdMutationFn = Apollo.MutationFunction<ResetPwdMutation, ResetPwdMutationVariables>;

/**
 * __useResetPwdMutation__
 *
 * To run a mutation, you first call `useResetPwdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPwdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPwdMutation, { data, loading, error }] = useResetPwdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPwdMutation(baseOptions?: Apollo.MutationHookOptions<ResetPwdMutation, ResetPwdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPwdMutation, ResetPwdMutationVariables>(ResetPwdDocument, options);
      }
export type ResetPwdMutationHookResult = ReturnType<typeof useResetPwdMutation>;
export type ResetPwdMutationResult = Apollo.MutationResult<ResetPwdMutation>;
export type ResetPwdMutationOptions = Apollo.BaseMutationOptions<ResetPwdMutation, ResetPwdMutationVariables>;
export const UserUpdateDocument = gql`
    mutation userUpdate($input: UserUpdateInput!) {
  userUpdate(input: $input)
}
    `;
export type UserUpdateMutationFn = Apollo.MutationFunction<UserUpdateMutation, UserUpdateMutationVariables>;

/**
 * __useUserUpdateMutation__
 *
 * To run a mutation, you first call `useUserUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateMutation, { data, loading, error }] = useUserUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserUpdateMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateMutation, UserUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateMutation, UserUpdateMutationVariables>(UserUpdateDocument, options);
      }
export type UserUpdateMutationHookResult = ReturnType<typeof useUserUpdateMutation>;
export type UserUpdateMutationResult = Apollo.MutationResult<UserUpdateMutation>;
export type UserUpdateMutationOptions = Apollo.BaseMutationOptions<UserUpdateMutation, UserUpdateMutationVariables>;
export const GetUserDocument = gql`
    query getUser($param: UserParam!) {
  getUser(param: $param) {
    id
    username
    roles
    professionalGroup
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      param: // value for 'param'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers {
  getUsers {
    id
    username
    roles
    professionalGroup
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const ErrorDocument = gql`
    query Error {
  error {
    statusCode
    message
    location
    path
  }
}
    `;

/**
 * __useErrorQuery__
 *
 * To run a query within a React component, call `useErrorQuery` and pass it any options that fit your needs.
 * When your component renders, `useErrorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useErrorQuery({
 *   variables: {
 *   },
 * });
 */
export function useErrorQuery(baseOptions?: Apollo.QueryHookOptions<ErrorQuery, ErrorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ErrorQuery, ErrorQueryVariables>(ErrorDocument, options);
      }
export function useErrorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ErrorQuery, ErrorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ErrorQuery, ErrorQueryVariables>(ErrorDocument, options);
        }
export type ErrorQueryHookResult = ReturnType<typeof useErrorQuery>;
export type ErrorLazyQueryHookResult = ReturnType<typeof useErrorLazyQuery>;
export type ErrorQueryResult = Apollo.QueryResult<ErrorQuery, ErrorQueryVariables>;
import { ObjectId } from 'mongodb';
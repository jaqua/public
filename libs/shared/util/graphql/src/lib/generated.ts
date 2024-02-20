import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export class Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export class AddUserInput {
  professionalGroup?: InputMaybe<Scalars['String']>;
  roles: Array<InputMaybe<Scalars['String']>>;
  username: Scalars['String'];
};

export class Article {
  __typename?: 'Article';
  _id: Scalars['ID'];
  casuistries?: Maybe<Array<Maybe<CasuistryLink>>>;
  category?: Maybe<Array<Scalars['String']>>;
  content?: Maybe<Array<ArticleContent>>;
  guideline?: Maybe<Array<Maybe<GuidelineLink>>>;
  modified?: Maybe<Scalars['Int']>;
  orderedIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  references?: Maybe<Array<Maybe<Reference>>>;
  status?: Maybe<Status>;
  synonyms?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export class ArticleContent {
  __typename?: 'ArticleContent';
  _id: Scalars['ID'];
  content?: Maybe<Scalars['String']>;
  context?: Maybe<Scalars['String']>;
  extended?: Maybe<Scalars['String']>;
  finalized: Scalars['Boolean'];
  intro?: Maybe<ArticleIntro>;
  links?: Maybe<Array<ArticleLink>>;
  main: Scalars['ID'];
  order: Scalars['Int'];
  parent: Scalars['ID'];
  reference?: Maybe<Array<Maybe<Scalars['String']>>>;
  reviewed: Scalars['Boolean'];
  slug?: Maybe<Scalars['String']>;
  table?: Maybe<TableData>;
  type: Scalars['String'];
};

export class ArticleContentParam {
  id: Scalars['ID'];
};

export class ArticleCreateTableInput {
  columns: Scalars['Int'];
  id: Scalars['ID'];
  rows: Scalars['Int'];
};

export class ArticleGroupItemInput {
  id: Scalars['ID'];
  undone: Scalars['Boolean'];
};

export class ArticleImportInput {
  content: Scalars['String'];
};

export class ArticleInsertItemInput {
  id: Scalars['ID'];
  userId: Scalars['ID'];
};

export class ArticleIntro {
  __typename?: 'ArticleIntro';
  content?: Maybe<Scalars['String']>;
};

export class ArticleLink {
  __typename?: 'ArticleLink';
  id: Scalars['ID'];
  label: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export class ArticleLinkItemInput {
  id: Scalars['ID'];
  operator: Scalars['String'];
  targetID: Scalars['ID'];
};

export class ArticleLinkLabelInput {
  id: Scalars['ID'];
  label: Scalars['String'];
  targetID: Scalars['ID'];
};

export class ArticleModifyTableInput {
  id: Scalars['ID'];
  index: Scalars['Int'];
  mode: Scalars['String'];
  type: Scalars['String'];
};

export class ArticleRemoveCasuistryInput {
  caseId: Scalars['ID'];
  id: Scalars['ID'];
};

export class ArticleRemoveGuidelineInput {
  doi: Scalars['String'];
  id: Scalars['ID'];
};

export class ArticleRemoveItemInput {
  id: Scalars['ID'];
};

export class ArticleSetCasuistryInput {
  caseNumber: Scalars['String'];
  caseTitle?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export class ArticleSetGuidelineInput {
  doi: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export class ArticleToggleTableColRowInput {
  id: Scalars['ID'];
  type: Scalars['String'];
};

export class ArticleUpdateCategoryInput {
  category: Scalars['String'];
  id: Scalars['ID'];
  operator: Scalars['String'];
};

export class ArticleUpdateContentInput {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  isExtended: Scalars['Boolean'];
};

export class ArticleUpdateContextInput {
  context: Scalars['String'];
  id: Scalars['ID'];
};

export class ArticleUpdateIntroInput {
  content: Scalars['String'];
  id: Scalars['ID'];
};

export class ArticleUpdateOrderInput {
  items: Array<InputMaybe<Scalars['ID']>>;
  parent: Scalars['ID'];
};

export class ArticleUpdateSynonymInput {
  id: Scalars['ID'];
  operator: Scalars['String'];
  synonym: Scalars['String'];
};

export class ArticleUpdateTableInput {
  cellIndex: Scalars['Int'];
  id: Scalars['ID'];
  rowIndex: Scalars['Int'];
  value?: InputMaybe<Scalars['String']>;
};

export class ArticleUpdateTypeInput {
  id: Scalars['ID'];
  type: Scalars['String'];
};

export class AssignUploadInput {
  fileId: Scalars['ID'];
  id: Scalars['ID'];
  type: Scalars['String'];
};

export class CasuistryLink {
  __typename?: 'CasuistryLink';
  id: Scalars['String'];
  title: Scalars['String'];
};

export class ChangePwdInput {
  password: Scalars['String'];
  username: Scalars['String'];
};

export class ContentDataset {
  __typename?: 'ContentDataset';
  _id: Scalars['ID'];
  category?: Maybe<Array<Maybe<Scalars['String']>>>;
  communicationIsClosed?: Maybe<Scalars['Boolean']>;
  isEdited?: Maybe<ContentStatus>;
  isFinalized?: Maybe<ContentStatus>;
  isReviewed?: Maybe<ContentStatus>;
  slug: Scalars['String'];
  synonyms?: Maybe<Array<Maybe<Scalars['String']>>>;
  title: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export class ContentStatus {
  __typename?: 'ContentStatus';
  timestamp?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['String']>;
};

export class ContentString {
  __typename?: 'ContentString';
  content: Scalars['String'];
};

export class Error {
  __typename?: 'Error';
  location?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['Int']>;
};

export class File {
  __typename?: 'File';
  _id: Scalars['ID'];
  chunkSize?: Maybe<Scalars['Int']>;
  contentType: Scalars['String'];
  filename: Scalars['String'];
  length?: Maybe<Scalars['Int']>;
  metadata?: Maybe<FileMetadata>;
  uploadDate?: Maybe<Scalars['Date']>;
};

export class FileMetadata {
  __typename?: 'FileMetadata';
  author?: Maybe<Scalars['String']>;
  billNumber?: Maybe<Scalars['Int']>;
  billYear?: Maybe<Scalars['Int']>;
  birthday?: Maybe<Scalars['Date']>;
  children?: Maybe<Array<Maybe<Scalars['ID']>>>;
  codec?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  date?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  discharge?: Maybe<Scalars['Date']>;
  duration?: Maybe<Scalars['Float']>;
  editedId?: Maybe<Scalars['ID']>;
  editorId?: Maybe<Scalars['ID']>;
  filename?: Maybe<Scalars['String']>;
  fullId?: Maybe<Scalars['ID']>;
  gallery?: Maybe<Array<Gallery>>;
  galleryPublic?: Maybe<Array<Maybe<Scalars['ID']>>>;
  height?: Maybe<Scalars['Int']>;
  isBilled?: Maybe<Scalars['Date']>;
  isFinalized?: Maybe<Scalars['Boolean']>;
  isMultiple?: Maybe<Scalars['Int']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  link?: Maybe<Array<Maybe<Scalars['String']>>>;
  mainId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  password?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['Int']>;
  shootings?: Maybe<Array<Maybe<Scalars['String']>>>;
  smallId?: Maybe<Scalars['ID']>;
  thumbnailId?: Maybe<Scalars['ID']>;
  uploadDate?: Maybe<Scalars['Date']>;
  versionName?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export class Gallery {
  __typename?: 'Gallery';
  date?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isPublic?: Maybe<Scalars['Boolean']>;
  smallId: Scalars['ID'];
  thumbnailId: Scalars['ID'];
};

export class GuidelineLink {
  __typename?: 'GuidelineLink';
  doi: Scalars['String'];
  title: Scalars['String'];
};

export class LinkListParam {
  id: Scalars['ID'];
  term: Scalars['String'];
};

export class LoginUserInput {
  password: Scalars['String'];
  username: Scalars['String'];
};

export class Mutation {
  __typename?: 'Mutation';
  addUser?: Maybe<Scalars['ID']>;
  articleCreateTable?: Maybe<WriteResult>;
  articleGroupItem?: Maybe<WriteResult>;
  articleImport?: Maybe<Scalars['Int']>;
  articleInsertItem?: Maybe<Article>;
  articleLinkItem?: Maybe<WriteResult>;
  articleLinkLabel?: Maybe<WriteResult>;
  articleModifyTable?: Maybe<WriteResult>;
  articleRemoveCasuistry?: Maybe<WriteResult>;
  articleRemoveGuideline?: Maybe<WriteResult>;
  articleRemoveItem?: Maybe<WriteResult>;
  articleSetCasuistry?: Maybe<CasuistryLink>;
  articleSetGuideline?: Maybe<WriteResult>;
  articleToggleTableColRow?: Maybe<WriteResult>;
  articleUpdateCategory?: Maybe<WriteResult>;
  articleUpdateContent?: Maybe<Scalars['String']>;
  articleUpdateContext?: Maybe<WriteResult>;
  articleUpdateIntro?: Maybe<WriteResult>;
  articleUpdateOrder?: Maybe<WriteResult>;
  articleUpdateSynonym?: Maybe<WriteResult>;
  articleUpdateTable?: Maybe<WriteResult>;
  articleUpdateType?: Maybe<WriteResult>;
  assignUpload?: Maybe<Scalars['String']>;
  changePwd?: Maybe<Scalars['Boolean']>;
  referenceDeSelect?: Maybe<Scalars['Boolean']>;
  referenceSave?: Maybe<Scalars['Int']>;
  removeUser?: Maybe<Scalars['Boolean']>;
  resetPwd?: Maybe<Scalars['Boolean']>;
  uploadFiles?: Maybe<Array<Maybe<UploadResult>>>;
  userUpdate?: Maybe<Scalars['Boolean']>;
  validateUser?: Maybe<User>;
};


export class MutationAddUserArgs {
  input: AddUserInput;
};


export class MutationArticleCreateTableArgs {
  input: ArticleCreateTableInput;
};


export class MutationArticleGroupItemArgs {
  input: ArticleGroupItemInput;
};


export class MutationArticleImportArgs {
  input: ArticleImportInput;
};


export class MutationArticleInsertItemArgs {
  input: ArticleInsertItemInput;
};


export class MutationArticleLinkItemArgs {
  input: ArticleLinkItemInput;
};


export class MutationArticleLinkLabelArgs {
  input: ArticleLinkLabelInput;
};


export class MutationArticleModifyTableArgs {
  input: ArticleModifyTableInput;
};


export class MutationArticleRemoveCasuistryArgs {
  input: ArticleRemoveCasuistryInput;
};


export class MutationArticleRemoveGuidelineArgs {
  input: ArticleRemoveGuidelineInput;
};


export class MutationArticleRemoveItemArgs {
  input: ArticleRemoveItemInput;
};


export class MutationArticleSetCasuistryArgs {
  input: ArticleSetCasuistryInput;
};


export class MutationArticleSetGuidelineArgs {
  input: ArticleSetGuidelineInput;
};


export class MutationArticleToggleTableColRowArgs {
  input: ArticleToggleTableColRowInput;
};


export class MutationArticleUpdateCategoryArgs {
  input: ArticleUpdateCategoryInput;
};


export class MutationArticleUpdateContentArgs {
  input: ArticleUpdateContentInput;
};


export class MutationArticleUpdateContextArgs {
  input: ArticleUpdateContextInput;
};


export class MutationArticleUpdateIntroArgs {
  input: ArticleUpdateIntroInput;
};


export class MutationArticleUpdateOrderArgs {
  input: ArticleUpdateOrderInput;
};


export class MutationArticleUpdateSynonymArgs {
  input: ArticleUpdateSynonymInput;
};


export class MutationArticleUpdateTableArgs {
  input: ArticleUpdateTableInput;
};


export class MutationArticleUpdateTypeArgs {
  input: ArticleUpdateTypeInput;
};


export class MutationAssignUploadArgs {
  input: AssignUploadInput;
};


export class MutationChangePwdArgs {
  input: ChangePwdInput;
};


export class MutationReferenceDeSelectArgs {
  input: ReferenceDeSelectInput;
};


export class MutationReferenceSaveArgs {
  input: ReferenceSaveInput;
};


export class MutationRemoveUserArgs {
  input: RemoveUserInput;
};


export class MutationResetPwdArgs {
  input: ResetPwdInput;
};


export class MutationUploadFilesArgs {
  bucketName?: InputMaybe<Scalars['String']>;
  files: Array<Scalars['Upload']>;
};


export class MutationUserUpdateArgs {
  input: UserUpdateInput;
};


export class MutationValidateUserArgs {
  input: ValidateUserInput;
};

export class Query {
  __typename?: 'Query';
  articleContent?: Maybe<Article>;
  error?: Maybe<Error>;
  getFiles?: Maybe<Array<Maybe<File>>>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  linkList?: Maybe<Array<Maybe<ContentDataset>>>;
  referenceAutocomplete?: Maybe<Array<Maybe<ReferenceSearchResult>>>;
};


export class QueryArticleContentArgs {
  param: ArticleContentParam;
};


export class QueryGetUserArgs {
  param?: InputMaybe<UserParam>;
};


export class QueryLinkListArgs {
  param?: InputMaybe<LinkListParam>;
};


export class QueryReferenceAutocompleteArgs {
  param: ReferenceAutocompleteParam;
};

export class Reference {
  __typename?: 'Reference';
  id: Scalars['ID'];
  pid?: Maybe<Scalars['ID']>;
  reference?: Maybe<Scalars['String']>;
};

export class ReferenceAutocompleteParam {
  ancestors?: InputMaybe<Array<Scalars['ID']>>;
  currentStep: Scalars['Int'];
  term: Scalars['String'];
  type: Scalars['String'];
};

export class ReferenceDeSelectInput {
  elementId: Scalars['ID'];
  refId: Scalars['ID'];
};

export class ReferenceList {
  __typename?: 'ReferenceList';
  reference: Array<Maybe<Scalars['String']>>;
  references?: Maybe<Array<Maybe<Reference>>>;
};

export class ReferenceSaveInput {
  data: Array<Scalars['String']>;
  id: Scalars['ID'];
  pid?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export class ReferenceSearchResult {
  __typename?: 'ReferenceSearchResult';
  _id: Scalars['ID'];
  author?: Maybe<Scalars['String']>;
  edition?: Maybe<Scalars['String']>;
  pageNumbers?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  publisher?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['String']>;
};

export class RemoveUserInput {
  username: Scalars['String'];
};

export class ResetPwdInput {
  username: Scalars['String'];
};

export class Result {
  __typename?: 'Result';
  insertedId?: Maybe<Scalars['ID']>;
  insertedIds?: Maybe<Array<Scalars['ID']>>;
  result?: Maybe<WriteResult>;
};

export class ReviewElementInput {
  id: Scalars['ID'];
};

export class Status {
  __typename?: 'Status';
  isCompleted?: Maybe<Scalars['Boolean']>;
  isEdited?: Maybe<Scalars['Boolean']>;
  isFinalized?: Maybe<Scalars['Boolean']>;
  isReviewed?: Maybe<Scalars['Boolean']>;
};

export class TableData {
  __typename?: 'TableData';
  data?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
  emphasiseFirstCol: Scalars['Boolean'];
  hasHeadRow: Scalars['Boolean'];
};

export class UploadResult {
  __typename?: 'UploadResult';
  filename: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  reason?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export class User {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  id?: Maybe<Scalars['ID']>;
  password: Scalars['String'];
  professionalGroup?: Maybe<Scalars['String']>;
  projects?: Maybe<Array<Maybe<Scalars['String']>>>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  username: Scalars['String'];
};

export class UserData {
  __typename?: 'UserData';
  id: Scalars['ID'];
  professionalGroup?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['String']>>;
  username: Scalars['String'];
};

export class UserParam {
  username: Scalars['String'];
};

export class UserUpdateInput {
  professionalGroup?: InputMaybe<Scalars['String']>;
  roles: Array<InputMaybe<Scalars['String']>>;
  username: Scalars['String'];
};

export class ValidateUserInput {
  password: Scalars['String'];
  username: Scalars['String'];
};

export class WriteResult {
  __typename?: 'WriteResult';
  n?: Maybe<Scalars['Int']>;
  nInserted?: Maybe<Scalars['Int']>;
  nModified?: Maybe<Scalars['Int']>;
  nRemoved?: Maybe<Scalars['Int']>;
  ok?: Maybe<Scalars['Int']>;
};

export class AdditionalEntityFields {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

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

export type ArticleCreateTableMutationVariables = Exact<{
  input: ArticleCreateTableInput;
}>;


export type ArticleCreateTableMutation = { __typename?: 'Mutation', articleCreateTable?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleGroupItemMutationVariables = Exact<{
  input: ArticleGroupItemInput;
}>;


export type ArticleGroupItemMutation = { __typename?: 'Mutation', articleGroupItem?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleImportMutationVariables = Exact<{
  input: ArticleImportInput;
}>;


export type ArticleImportMutation = { __typename?: 'Mutation', articleImport?: number | null };

export type ArticleInsertItemMutationVariables = Exact<{
  input: ArticleInsertItemInput;
}>;


export type ArticleInsertItemMutation = { __typename?: 'Mutation', articleInsertItem?: { __typename?: 'Article', _id: string } | null };

export type ArticleLinkItemMutationVariables = Exact<{
  input: ArticleLinkItemInput;
}>;


export type ArticleLinkItemMutation = { __typename?: 'Mutation', articleLinkItem?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleLinkLabelMutationVariables = Exact<{
  input: ArticleLinkLabelInput;
}>;


export type ArticleLinkLabelMutation = { __typename?: 'Mutation', articleLinkLabel?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleModifyTableMutationVariables = Exact<{
  input: ArticleModifyTableInput;
}>;


export type ArticleModifyTableMutation = { __typename?: 'Mutation', articleModifyTable?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleRemoveCasuistryMutationVariables = Exact<{
  input: ArticleRemoveCasuistryInput;
}>;


export type ArticleRemoveCasuistryMutation = { __typename?: 'Mutation', articleRemoveCasuistry?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleRemoveGuidelineMutationVariables = Exact<{
  input: ArticleRemoveGuidelineInput;
}>;


export type ArticleRemoveGuidelineMutation = { __typename?: 'Mutation', articleRemoveGuideline?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleRemoveItemMutationVariables = Exact<{
  input: ArticleRemoveItemInput;
}>;


export type ArticleRemoveItemMutation = { __typename?: 'Mutation', articleRemoveItem?: { __typename?: 'WriteResult', nRemoved?: number | null } | null };

export type ArticleSetCasuistryMutationVariables = Exact<{
  input: ArticleSetCasuistryInput;
}>;


export type ArticleSetCasuistryMutation = { __typename?: 'Mutation', articleSetCasuistry?: { __typename?: 'CasuistryLink', id: string, title: string } | null };

export type ArticleSetGuidelineMutationVariables = Exact<{
  input: ArticleSetGuidelineInput;
}>;


export type ArticleSetGuidelineMutation = { __typename?: 'Mutation', articleSetGuideline?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleToggleTableColRowMutationVariables = Exact<{
  input: ArticleToggleTableColRowInput;
}>;


export type ArticleToggleTableColRowMutation = { __typename?: 'Mutation', articleToggleTableColRow?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleUpdateCategoryMutationVariables = Exact<{
  input: ArticleUpdateCategoryInput;
}>;


export type ArticleUpdateCategoryMutation = { __typename?: 'Mutation', articleUpdateCategory?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleUpdateContentMutationVariables = Exact<{
  input: ArticleUpdateContentInput;
}>;


export type ArticleUpdateContentMutation = { __typename?: 'Mutation', articleUpdateContent?: string | null };

export type ArticleUpdateContextMutationVariables = Exact<{
  input: ArticleUpdateContextInput;
}>;


export type ArticleUpdateContextMutation = { __typename?: 'Mutation', articleUpdateContext?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleUpdateIntroMutationVariables = Exact<{
  input: ArticleUpdateIntroInput;
}>;


export type ArticleUpdateIntroMutation = { __typename?: 'Mutation', articleUpdateIntro?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleUpdateOrderMutationVariables = Exact<{
  input: ArticleUpdateOrderInput;
}>;


export type ArticleUpdateOrderMutation = { __typename?: 'Mutation', articleUpdateOrder?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleUpdateSynonymMutationVariables = Exact<{
  input: ArticleUpdateSynonymInput;
}>;


export type ArticleUpdateSynonymMutation = { __typename?: 'Mutation', articleUpdateSynonym?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleUpdateTableMutationVariables = Exact<{
  input: ArticleUpdateTableInput;
}>;


export type ArticleUpdateTableMutation = { __typename?: 'Mutation', articleUpdateTable?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type ArticleUpdateTypeMutationVariables = Exact<{
  input: ArticleUpdateTypeInput;
}>;


export type ArticleUpdateTypeMutation = { __typename?: 'Mutation', articleUpdateType?: { __typename?: 'WriteResult', nModified?: number | null } | null };

export type AssignUploadMutationVariables = Exact<{
  input: AssignUploadInput;
}>;


export type AssignUploadMutation = { __typename?: 'Mutation', assignUpload?: string | null };

export type UploadFilesMutationVariables = Exact<{
  files: Array<Scalars['Upload']> | Scalars['Upload'];
  bucketName?: InputMaybe<Scalars['String']>;
}>;


export type UploadFilesMutation = { __typename?: 'Mutation', uploadFiles?: Array<{ __typename?: 'UploadResult', id?: string | null, filename: string, status: string, reason?: string | null } | null> | null };

export type GetUserQueryVariables = Exact<{
  param: UserParam;
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id?: string | null, username: string, roles?: Array<string | null> | null, professionalGroup?: string | null } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', id?: string | null, username: string, roles?: Array<string | null> | null, professionalGroup?: string | null } | null> | null };

export type ArticleContentQueryVariables = Exact<{
  param: ArticleContentParam;
}>;


export type ArticleContentQuery = { __typename?: 'Query', articleContent?: { __typename?: 'Article', _id: string, title: string, category?: Array<string> | null, synonyms?: Array<string> | null, orderedIds?: Array<string | null> | null, content?: Array<{ __typename?: 'ArticleContent', _id: string, content?: string | null, extended?: string | null, reviewed: boolean, finalized: boolean, type: string, context?: string | null, order: number, parent: string, main: string, reference?: Array<string | null> | null, table?: { __typename?: 'TableData', data?: Array<Array<string | null> | null> | null, hasHeadRow: boolean, emphasiseFirstCol: boolean } | null, links?: Array<{ __typename?: 'ArticleLink', id: string, title: string }> | null }> | null, guideline?: Array<{ __typename?: 'GuidelineLink', title: string, doi: string } | null> | null, casuistries?: Array<{ __typename?: 'CasuistryLink', id: string, title: string } | null> | null, references?: Array<{ __typename?: 'Reference', id: string, reference?: string | null } | null> | null, status?: { __typename?: 'Status', isCompleted?: boolean | null, isEdited?: boolean | null, isReviewed?: boolean | null, isFinalized?: boolean | null } | null } | null };

export type ErrorQueryVariables = Exact<{ [key: string]: never; }>;


export type ErrorQuery = { __typename?: 'Query', error?: { __typename?: 'Error', statusCode?: number | null, message?: string | null, location?: string | null, path?: string | null } | null };

export type GetFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFilesQuery = { __typename?: 'Query', getFiles?: Array<{ __typename?: 'File', _id: string, metadata?: { __typename?: 'FileMetadata', isPublic?: boolean | null, parent?: string | null, fullId?: string | null, smallId?: string | null, thumbnailId?: string | null, height?: number | null, width?: number | null, name?: string | null, birthday?: any | null, discharge?: any | null, date?: any | null, link?: Array<string | null> | null, isFinalized?: boolean | null, isBilled?: any | null, billYear?: number | null, billNumber?: number | null, gallery?: Array<{ __typename?: 'Gallery', id: string, smallId: string, thumbnailId: string, date?: any | null, description?: string | null, isPublic?: boolean | null }> | null } | null } | null> | null };


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
export const ArticleCreateTableDocument = gql`
    mutation articleCreateTable($input: ArticleCreateTableInput!) {
  articleCreateTable(input: $input) {
    nModified
  }
}
    `;
export type ArticleCreateTableMutationFn = Apollo.MutationFunction<ArticleCreateTableMutation, ArticleCreateTableMutationVariables>;

/**
 * __useArticleCreateTableMutation__
 *
 * To run a mutation, you first call `useArticleCreateTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleCreateTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleCreateTableMutation, { data, loading, error }] = useArticleCreateTableMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleCreateTableMutation(baseOptions?: Apollo.MutationHookOptions<ArticleCreateTableMutation, ArticleCreateTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleCreateTableMutation, ArticleCreateTableMutationVariables>(ArticleCreateTableDocument, options);
      }
export type ArticleCreateTableMutationHookResult = ReturnType<typeof useArticleCreateTableMutation>;
export type ArticleCreateTableMutationResult = Apollo.MutationResult<ArticleCreateTableMutation>;
export type ArticleCreateTableMutationOptions = Apollo.BaseMutationOptions<ArticleCreateTableMutation, ArticleCreateTableMutationVariables>;
export const ArticleGroupItemDocument = gql`
    mutation articleGroupItem($input: ArticleGroupItemInput!) {
  articleGroupItem(input: $input) {
    nModified
  }
}
    `;
export type ArticleGroupItemMutationFn = Apollo.MutationFunction<ArticleGroupItemMutation, ArticleGroupItemMutationVariables>;

/**
 * __useArticleGroupItemMutation__
 *
 * To run a mutation, you first call `useArticleGroupItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleGroupItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleGroupItemMutation, { data, loading, error }] = useArticleGroupItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleGroupItemMutation(baseOptions?: Apollo.MutationHookOptions<ArticleGroupItemMutation, ArticleGroupItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleGroupItemMutation, ArticleGroupItemMutationVariables>(ArticleGroupItemDocument, options);
      }
export type ArticleGroupItemMutationHookResult = ReturnType<typeof useArticleGroupItemMutation>;
export type ArticleGroupItemMutationResult = Apollo.MutationResult<ArticleGroupItemMutation>;
export type ArticleGroupItemMutationOptions = Apollo.BaseMutationOptions<ArticleGroupItemMutation, ArticleGroupItemMutationVariables>;
export const ArticleImportDocument = gql`
    mutation articleImport($input: ArticleImportInput!) {
  articleImport(input: $input)
}
    `;
export type ArticleImportMutationFn = Apollo.MutationFunction<ArticleImportMutation, ArticleImportMutationVariables>;

/**
 * __useArticleImportMutation__
 *
 * To run a mutation, you first call `useArticleImportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleImportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleImportMutation, { data, loading, error }] = useArticleImportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleImportMutation(baseOptions?: Apollo.MutationHookOptions<ArticleImportMutation, ArticleImportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleImportMutation, ArticleImportMutationVariables>(ArticleImportDocument, options);
      }
export type ArticleImportMutationHookResult = ReturnType<typeof useArticleImportMutation>;
export type ArticleImportMutationResult = Apollo.MutationResult<ArticleImportMutation>;
export type ArticleImportMutationOptions = Apollo.BaseMutationOptions<ArticleImportMutation, ArticleImportMutationVariables>;
export const ArticleInsertItemDocument = gql`
    mutation articleInsertItem($input: ArticleInsertItemInput!) {
  articleInsertItem(input: $input) {
    _id
  }
}
    `;
export type ArticleInsertItemMutationFn = Apollo.MutationFunction<ArticleInsertItemMutation, ArticleInsertItemMutationVariables>;

/**
 * __useArticleInsertItemMutation__
 *
 * To run a mutation, you first call `useArticleInsertItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleInsertItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleInsertItemMutation, { data, loading, error }] = useArticleInsertItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleInsertItemMutation(baseOptions?: Apollo.MutationHookOptions<ArticleInsertItemMutation, ArticleInsertItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleInsertItemMutation, ArticleInsertItemMutationVariables>(ArticleInsertItemDocument, options);
      }
export type ArticleInsertItemMutationHookResult = ReturnType<typeof useArticleInsertItemMutation>;
export type ArticleInsertItemMutationResult = Apollo.MutationResult<ArticleInsertItemMutation>;
export type ArticleInsertItemMutationOptions = Apollo.BaseMutationOptions<ArticleInsertItemMutation, ArticleInsertItemMutationVariables>;
export const ArticleLinkItemDocument = gql`
    mutation articleLinkItem($input: ArticleLinkItemInput!) {
  articleLinkItem(input: $input) {
    nModified
  }
}
    `;
export type ArticleLinkItemMutationFn = Apollo.MutationFunction<ArticleLinkItemMutation, ArticleLinkItemMutationVariables>;

/**
 * __useArticleLinkItemMutation__
 *
 * To run a mutation, you first call `useArticleLinkItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleLinkItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleLinkItemMutation, { data, loading, error }] = useArticleLinkItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleLinkItemMutation(baseOptions?: Apollo.MutationHookOptions<ArticleLinkItemMutation, ArticleLinkItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleLinkItemMutation, ArticleLinkItemMutationVariables>(ArticleLinkItemDocument, options);
      }
export type ArticleLinkItemMutationHookResult = ReturnType<typeof useArticleLinkItemMutation>;
export type ArticleLinkItemMutationResult = Apollo.MutationResult<ArticleLinkItemMutation>;
export type ArticleLinkItemMutationOptions = Apollo.BaseMutationOptions<ArticleLinkItemMutation, ArticleLinkItemMutationVariables>;
export const ArticleLinkLabelDocument = gql`
    mutation articleLinkLabel($input: ArticleLinkLabelInput!) {
  articleLinkLabel(input: $input) {
    nModified
  }
}
    `;
export type ArticleLinkLabelMutationFn = Apollo.MutationFunction<ArticleLinkLabelMutation, ArticleLinkLabelMutationVariables>;

/**
 * __useArticleLinkLabelMutation__
 *
 * To run a mutation, you first call `useArticleLinkLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleLinkLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleLinkLabelMutation, { data, loading, error }] = useArticleLinkLabelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleLinkLabelMutation(baseOptions?: Apollo.MutationHookOptions<ArticleLinkLabelMutation, ArticleLinkLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleLinkLabelMutation, ArticleLinkLabelMutationVariables>(ArticleLinkLabelDocument, options);
      }
export type ArticleLinkLabelMutationHookResult = ReturnType<typeof useArticleLinkLabelMutation>;
export type ArticleLinkLabelMutationResult = Apollo.MutationResult<ArticleLinkLabelMutation>;
export type ArticleLinkLabelMutationOptions = Apollo.BaseMutationOptions<ArticleLinkLabelMutation, ArticleLinkLabelMutationVariables>;
export const ArticleModifyTableDocument = gql`
    mutation articleModifyTable($input: ArticleModifyTableInput!) {
  articleModifyTable(input: $input) {
    nModified
  }
}
    `;
export type ArticleModifyTableMutationFn = Apollo.MutationFunction<ArticleModifyTableMutation, ArticleModifyTableMutationVariables>;

/**
 * __useArticleModifyTableMutation__
 *
 * To run a mutation, you first call `useArticleModifyTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleModifyTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleModifyTableMutation, { data, loading, error }] = useArticleModifyTableMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleModifyTableMutation(baseOptions?: Apollo.MutationHookOptions<ArticleModifyTableMutation, ArticleModifyTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleModifyTableMutation, ArticleModifyTableMutationVariables>(ArticleModifyTableDocument, options);
      }
export type ArticleModifyTableMutationHookResult = ReturnType<typeof useArticleModifyTableMutation>;
export type ArticleModifyTableMutationResult = Apollo.MutationResult<ArticleModifyTableMutation>;
export type ArticleModifyTableMutationOptions = Apollo.BaseMutationOptions<ArticleModifyTableMutation, ArticleModifyTableMutationVariables>;
export const ArticleRemoveCasuistryDocument = gql`
    mutation articleRemoveCasuistry($input: ArticleRemoveCasuistryInput!) {
  articleRemoveCasuistry(input: $input) {
    nModified
  }
}
    `;
export type ArticleRemoveCasuistryMutationFn = Apollo.MutationFunction<ArticleRemoveCasuistryMutation, ArticleRemoveCasuistryMutationVariables>;

/**
 * __useArticleRemoveCasuistryMutation__
 *
 * To run a mutation, you first call `useArticleRemoveCasuistryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleRemoveCasuistryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleRemoveCasuistryMutation, { data, loading, error }] = useArticleRemoveCasuistryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleRemoveCasuistryMutation(baseOptions?: Apollo.MutationHookOptions<ArticleRemoveCasuistryMutation, ArticleRemoveCasuistryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleRemoveCasuistryMutation, ArticleRemoveCasuistryMutationVariables>(ArticleRemoveCasuistryDocument, options);
      }
export type ArticleRemoveCasuistryMutationHookResult = ReturnType<typeof useArticleRemoveCasuistryMutation>;
export type ArticleRemoveCasuistryMutationResult = Apollo.MutationResult<ArticleRemoveCasuistryMutation>;
export type ArticleRemoveCasuistryMutationOptions = Apollo.BaseMutationOptions<ArticleRemoveCasuistryMutation, ArticleRemoveCasuistryMutationVariables>;
export const ArticleRemoveGuidelineDocument = gql`
    mutation articleRemoveGuideline($input: ArticleRemoveGuidelineInput!) {
  articleRemoveGuideline(input: $input) {
    nModified
  }
}
    `;
export type ArticleRemoveGuidelineMutationFn = Apollo.MutationFunction<ArticleRemoveGuidelineMutation, ArticleRemoveGuidelineMutationVariables>;

/**
 * __useArticleRemoveGuidelineMutation__
 *
 * To run a mutation, you first call `useArticleRemoveGuidelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleRemoveGuidelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleRemoveGuidelineMutation, { data, loading, error }] = useArticleRemoveGuidelineMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleRemoveGuidelineMutation(baseOptions?: Apollo.MutationHookOptions<ArticleRemoveGuidelineMutation, ArticleRemoveGuidelineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleRemoveGuidelineMutation, ArticleRemoveGuidelineMutationVariables>(ArticleRemoveGuidelineDocument, options);
      }
export type ArticleRemoveGuidelineMutationHookResult = ReturnType<typeof useArticleRemoveGuidelineMutation>;
export type ArticleRemoveGuidelineMutationResult = Apollo.MutationResult<ArticleRemoveGuidelineMutation>;
export type ArticleRemoveGuidelineMutationOptions = Apollo.BaseMutationOptions<ArticleRemoveGuidelineMutation, ArticleRemoveGuidelineMutationVariables>;
export const ArticleRemoveItemDocument = gql`
    mutation articleRemoveItem($input: ArticleRemoveItemInput!) {
  articleRemoveItem(input: $input) {
    nRemoved
  }
}
    `;
export type ArticleRemoveItemMutationFn = Apollo.MutationFunction<ArticleRemoveItemMutation, ArticleRemoveItemMutationVariables>;

/**
 * __useArticleRemoveItemMutation__
 *
 * To run a mutation, you first call `useArticleRemoveItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleRemoveItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleRemoveItemMutation, { data, loading, error }] = useArticleRemoveItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleRemoveItemMutation(baseOptions?: Apollo.MutationHookOptions<ArticleRemoveItemMutation, ArticleRemoveItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleRemoveItemMutation, ArticleRemoveItemMutationVariables>(ArticleRemoveItemDocument, options);
      }
export type ArticleRemoveItemMutationHookResult = ReturnType<typeof useArticleRemoveItemMutation>;
export type ArticleRemoveItemMutationResult = Apollo.MutationResult<ArticleRemoveItemMutation>;
export type ArticleRemoveItemMutationOptions = Apollo.BaseMutationOptions<ArticleRemoveItemMutation, ArticleRemoveItemMutationVariables>;
export const ArticleSetCasuistryDocument = gql`
    mutation articleSetCasuistry($input: ArticleSetCasuistryInput!) {
  articleSetCasuistry(input: $input) {
    id
    title
  }
}
    `;
export type ArticleSetCasuistryMutationFn = Apollo.MutationFunction<ArticleSetCasuistryMutation, ArticleSetCasuistryMutationVariables>;

/**
 * __useArticleSetCasuistryMutation__
 *
 * To run a mutation, you first call `useArticleSetCasuistryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleSetCasuistryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleSetCasuistryMutation, { data, loading, error }] = useArticleSetCasuistryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleSetCasuistryMutation(baseOptions?: Apollo.MutationHookOptions<ArticleSetCasuistryMutation, ArticleSetCasuistryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleSetCasuistryMutation, ArticleSetCasuistryMutationVariables>(ArticleSetCasuistryDocument, options);
      }
export type ArticleSetCasuistryMutationHookResult = ReturnType<typeof useArticleSetCasuistryMutation>;
export type ArticleSetCasuistryMutationResult = Apollo.MutationResult<ArticleSetCasuistryMutation>;
export type ArticleSetCasuistryMutationOptions = Apollo.BaseMutationOptions<ArticleSetCasuistryMutation, ArticleSetCasuistryMutationVariables>;
export const ArticleSetGuidelineDocument = gql`
    mutation articleSetGuideline($input: ArticleSetGuidelineInput!) {
  articleSetGuideline(input: $input) {
    nModified
  }
}
    `;
export type ArticleSetGuidelineMutationFn = Apollo.MutationFunction<ArticleSetGuidelineMutation, ArticleSetGuidelineMutationVariables>;

/**
 * __useArticleSetGuidelineMutation__
 *
 * To run a mutation, you first call `useArticleSetGuidelineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleSetGuidelineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleSetGuidelineMutation, { data, loading, error }] = useArticleSetGuidelineMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleSetGuidelineMutation(baseOptions?: Apollo.MutationHookOptions<ArticleSetGuidelineMutation, ArticleSetGuidelineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleSetGuidelineMutation, ArticleSetGuidelineMutationVariables>(ArticleSetGuidelineDocument, options);
      }
export type ArticleSetGuidelineMutationHookResult = ReturnType<typeof useArticleSetGuidelineMutation>;
export type ArticleSetGuidelineMutationResult = Apollo.MutationResult<ArticleSetGuidelineMutation>;
export type ArticleSetGuidelineMutationOptions = Apollo.BaseMutationOptions<ArticleSetGuidelineMutation, ArticleSetGuidelineMutationVariables>;
export const ArticleToggleTableColRowDocument = gql`
    mutation articleToggleTableColRow($input: ArticleToggleTableColRowInput!) {
  articleToggleTableColRow(input: $input) {
    nModified
  }
}
    `;
export type ArticleToggleTableColRowMutationFn = Apollo.MutationFunction<ArticleToggleTableColRowMutation, ArticleToggleTableColRowMutationVariables>;

/**
 * __useArticleToggleTableColRowMutation__
 *
 * To run a mutation, you first call `useArticleToggleTableColRowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleToggleTableColRowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleToggleTableColRowMutation, { data, loading, error }] = useArticleToggleTableColRowMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleToggleTableColRowMutation(baseOptions?: Apollo.MutationHookOptions<ArticleToggleTableColRowMutation, ArticleToggleTableColRowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleToggleTableColRowMutation, ArticleToggleTableColRowMutationVariables>(ArticleToggleTableColRowDocument, options);
      }
export type ArticleToggleTableColRowMutationHookResult = ReturnType<typeof useArticleToggleTableColRowMutation>;
export type ArticleToggleTableColRowMutationResult = Apollo.MutationResult<ArticleToggleTableColRowMutation>;
export type ArticleToggleTableColRowMutationOptions = Apollo.BaseMutationOptions<ArticleToggleTableColRowMutation, ArticleToggleTableColRowMutationVariables>;
export const ArticleUpdateCategoryDocument = gql`
    mutation articleUpdateCategory($input: ArticleUpdateCategoryInput!) {
  articleUpdateCategory(input: $input) {
    nModified
  }
}
    `;
export type ArticleUpdateCategoryMutationFn = Apollo.MutationFunction<ArticleUpdateCategoryMutation, ArticleUpdateCategoryMutationVariables>;

/**
 * __useArticleUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useArticleUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleUpdateCategoryMutation, { data, loading, error }] = useArticleUpdateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<ArticleUpdateCategoryMutation, ArticleUpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleUpdateCategoryMutation, ArticleUpdateCategoryMutationVariables>(ArticleUpdateCategoryDocument, options);
      }
export type ArticleUpdateCategoryMutationHookResult = ReturnType<typeof useArticleUpdateCategoryMutation>;
export type ArticleUpdateCategoryMutationResult = Apollo.MutationResult<ArticleUpdateCategoryMutation>;
export type ArticleUpdateCategoryMutationOptions = Apollo.BaseMutationOptions<ArticleUpdateCategoryMutation, ArticleUpdateCategoryMutationVariables>;
export const ArticleUpdateContentDocument = gql`
    mutation articleUpdateContent($input: ArticleUpdateContentInput!) {
  articleUpdateContent(input: $input)
}
    `;
export type ArticleUpdateContentMutationFn = Apollo.MutationFunction<ArticleUpdateContentMutation, ArticleUpdateContentMutationVariables>;

/**
 * __useArticleUpdateContentMutation__
 *
 * To run a mutation, you first call `useArticleUpdateContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleUpdateContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleUpdateContentMutation, { data, loading, error }] = useArticleUpdateContentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleUpdateContentMutation(baseOptions?: Apollo.MutationHookOptions<ArticleUpdateContentMutation, ArticleUpdateContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleUpdateContentMutation, ArticleUpdateContentMutationVariables>(ArticleUpdateContentDocument, options);
      }
export type ArticleUpdateContentMutationHookResult = ReturnType<typeof useArticleUpdateContentMutation>;
export type ArticleUpdateContentMutationResult = Apollo.MutationResult<ArticleUpdateContentMutation>;
export type ArticleUpdateContentMutationOptions = Apollo.BaseMutationOptions<ArticleUpdateContentMutation, ArticleUpdateContentMutationVariables>;
export const ArticleUpdateContextDocument = gql`
    mutation articleUpdateContext($input: ArticleUpdateContextInput!) {
  articleUpdateContext(input: $input) {
    nModified
  }
}
    `;
export type ArticleUpdateContextMutationFn = Apollo.MutationFunction<ArticleUpdateContextMutation, ArticleUpdateContextMutationVariables>;

/**
 * __useArticleUpdateContextMutation__
 *
 * To run a mutation, you first call `useArticleUpdateContextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleUpdateContextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleUpdateContextMutation, { data, loading, error }] = useArticleUpdateContextMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleUpdateContextMutation(baseOptions?: Apollo.MutationHookOptions<ArticleUpdateContextMutation, ArticleUpdateContextMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleUpdateContextMutation, ArticleUpdateContextMutationVariables>(ArticleUpdateContextDocument, options);
      }
export type ArticleUpdateContextMutationHookResult = ReturnType<typeof useArticleUpdateContextMutation>;
export type ArticleUpdateContextMutationResult = Apollo.MutationResult<ArticleUpdateContextMutation>;
export type ArticleUpdateContextMutationOptions = Apollo.BaseMutationOptions<ArticleUpdateContextMutation, ArticleUpdateContextMutationVariables>;
export const ArticleUpdateIntroDocument = gql`
    mutation articleUpdateIntro($input: ArticleUpdateIntroInput!) {
  articleUpdateIntro(input: $input) {
    nModified
  }
}
    `;
export type ArticleUpdateIntroMutationFn = Apollo.MutationFunction<ArticleUpdateIntroMutation, ArticleUpdateIntroMutationVariables>;

/**
 * __useArticleUpdateIntroMutation__
 *
 * To run a mutation, you first call `useArticleUpdateIntroMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleUpdateIntroMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleUpdateIntroMutation, { data, loading, error }] = useArticleUpdateIntroMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleUpdateIntroMutation(baseOptions?: Apollo.MutationHookOptions<ArticleUpdateIntroMutation, ArticleUpdateIntroMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleUpdateIntroMutation, ArticleUpdateIntroMutationVariables>(ArticleUpdateIntroDocument, options);
      }
export type ArticleUpdateIntroMutationHookResult = ReturnType<typeof useArticleUpdateIntroMutation>;
export type ArticleUpdateIntroMutationResult = Apollo.MutationResult<ArticleUpdateIntroMutation>;
export type ArticleUpdateIntroMutationOptions = Apollo.BaseMutationOptions<ArticleUpdateIntroMutation, ArticleUpdateIntroMutationVariables>;
export const ArticleUpdateOrderDocument = gql`
    mutation articleUpdateOrder($input: ArticleUpdateOrderInput!) {
  articleUpdateOrder(input: $input) {
    nModified
  }
}
    `;
export type ArticleUpdateOrderMutationFn = Apollo.MutationFunction<ArticleUpdateOrderMutation, ArticleUpdateOrderMutationVariables>;

/**
 * __useArticleUpdateOrderMutation__
 *
 * To run a mutation, you first call `useArticleUpdateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleUpdateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleUpdateOrderMutation, { data, loading, error }] = useArticleUpdateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleUpdateOrderMutation(baseOptions?: Apollo.MutationHookOptions<ArticleUpdateOrderMutation, ArticleUpdateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleUpdateOrderMutation, ArticleUpdateOrderMutationVariables>(ArticleUpdateOrderDocument, options);
      }
export type ArticleUpdateOrderMutationHookResult = ReturnType<typeof useArticleUpdateOrderMutation>;
export type ArticleUpdateOrderMutationResult = Apollo.MutationResult<ArticleUpdateOrderMutation>;
export type ArticleUpdateOrderMutationOptions = Apollo.BaseMutationOptions<ArticleUpdateOrderMutation, ArticleUpdateOrderMutationVariables>;
export const ArticleUpdateSynonymDocument = gql`
    mutation articleUpdateSynonym($input: ArticleUpdateSynonymInput!) {
  articleUpdateSynonym(input: $input) {
    nModified
  }
}
    `;
export type ArticleUpdateSynonymMutationFn = Apollo.MutationFunction<ArticleUpdateSynonymMutation, ArticleUpdateSynonymMutationVariables>;

/**
 * __useArticleUpdateSynonymMutation__
 *
 * To run a mutation, you first call `useArticleUpdateSynonymMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleUpdateSynonymMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleUpdateSynonymMutation, { data, loading, error }] = useArticleUpdateSynonymMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleUpdateSynonymMutation(baseOptions?: Apollo.MutationHookOptions<ArticleUpdateSynonymMutation, ArticleUpdateSynonymMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleUpdateSynonymMutation, ArticleUpdateSynonymMutationVariables>(ArticleUpdateSynonymDocument, options);
      }
export type ArticleUpdateSynonymMutationHookResult = ReturnType<typeof useArticleUpdateSynonymMutation>;
export type ArticleUpdateSynonymMutationResult = Apollo.MutationResult<ArticleUpdateSynonymMutation>;
export type ArticleUpdateSynonymMutationOptions = Apollo.BaseMutationOptions<ArticleUpdateSynonymMutation, ArticleUpdateSynonymMutationVariables>;
export const ArticleUpdateTableDocument = gql`
    mutation articleUpdateTable($input: ArticleUpdateTableInput!) {
  articleUpdateTable(input: $input) {
    nModified
  }
}
    `;
export type ArticleUpdateTableMutationFn = Apollo.MutationFunction<ArticleUpdateTableMutation, ArticleUpdateTableMutationVariables>;

/**
 * __useArticleUpdateTableMutation__
 *
 * To run a mutation, you first call `useArticleUpdateTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleUpdateTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleUpdateTableMutation, { data, loading, error }] = useArticleUpdateTableMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleUpdateTableMutation(baseOptions?: Apollo.MutationHookOptions<ArticleUpdateTableMutation, ArticleUpdateTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleUpdateTableMutation, ArticleUpdateTableMutationVariables>(ArticleUpdateTableDocument, options);
      }
export type ArticleUpdateTableMutationHookResult = ReturnType<typeof useArticleUpdateTableMutation>;
export type ArticleUpdateTableMutationResult = Apollo.MutationResult<ArticleUpdateTableMutation>;
export type ArticleUpdateTableMutationOptions = Apollo.BaseMutationOptions<ArticleUpdateTableMutation, ArticleUpdateTableMutationVariables>;
export const ArticleUpdateTypeDocument = gql`
    mutation articleUpdateType($input: ArticleUpdateTypeInput!) {
  articleUpdateType(input: $input) {
    nModified
  }
}
    `;
export type ArticleUpdateTypeMutationFn = Apollo.MutationFunction<ArticleUpdateTypeMutation, ArticleUpdateTypeMutationVariables>;

/**
 * __useArticleUpdateTypeMutation__
 *
 * To run a mutation, you first call `useArticleUpdateTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArticleUpdateTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [articleUpdateTypeMutation, { data, loading, error }] = useArticleUpdateTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticleUpdateTypeMutation(baseOptions?: Apollo.MutationHookOptions<ArticleUpdateTypeMutation, ArticleUpdateTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArticleUpdateTypeMutation, ArticleUpdateTypeMutationVariables>(ArticleUpdateTypeDocument, options);
      }
export type ArticleUpdateTypeMutationHookResult = ReturnType<typeof useArticleUpdateTypeMutation>;
export type ArticleUpdateTypeMutationResult = Apollo.MutationResult<ArticleUpdateTypeMutation>;
export type ArticleUpdateTypeMutationOptions = Apollo.BaseMutationOptions<ArticleUpdateTypeMutation, ArticleUpdateTypeMutationVariables>;
export const AssignUploadDocument = gql`
    mutation assignUpload($input: AssignUploadInput!) {
  assignUpload(input: $input)
}
    `;
export type AssignUploadMutationFn = Apollo.MutationFunction<AssignUploadMutation, AssignUploadMutationVariables>;

/**
 * __useAssignUploadMutation__
 *
 * To run a mutation, you first call `useAssignUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUploadMutation, { data, loading, error }] = useAssignUploadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignUploadMutation(baseOptions?: Apollo.MutationHookOptions<AssignUploadMutation, AssignUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignUploadMutation, AssignUploadMutationVariables>(AssignUploadDocument, options);
      }
export type AssignUploadMutationHookResult = ReturnType<typeof useAssignUploadMutation>;
export type AssignUploadMutationResult = Apollo.MutationResult<AssignUploadMutation>;
export type AssignUploadMutationOptions = Apollo.BaseMutationOptions<AssignUploadMutation, AssignUploadMutationVariables>;
export const UploadFilesDocument = gql`
    mutation uploadFiles($files: [Upload!]!, $bucketName: String) {
  uploadFiles(files: $files, bucketName: $bucketName) {
    id
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
export const ArticleContentDocument = gql`
    query articleContent($param: ArticleContentParam!) {
  articleContent(param: $param) {
    _id
    title
    category
    synonyms
    content {
      _id
      content
      extended
      reviewed
      finalized
      type
      context
      table {
        data
        hasHeadRow
        emphasiseFirstCol
      }
      order
      parent
      main
      reference
      links {
        id
        title
      }
    }
    orderedIds
    guideline {
      title
      doi
    }
    casuistries {
      id
      title
    }
    references {
      id
      reference
    }
    status {
      isCompleted
      isEdited
      isReviewed
      isFinalized
    }
  }
}
    `;

/**
 * __useArticleContentQuery__
 *
 * To run a query within a React component, call `useArticleContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleContentQuery({
 *   variables: {
 *      param: // value for 'param'
 *   },
 * });
 */
export function useArticleContentQuery(baseOptions: Apollo.QueryHookOptions<ArticleContentQuery, ArticleContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleContentQuery, ArticleContentQueryVariables>(ArticleContentDocument, options);
      }
export function useArticleContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleContentQuery, ArticleContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleContentQuery, ArticleContentQueryVariables>(ArticleContentDocument, options);
        }
export type ArticleContentQueryHookResult = ReturnType<typeof useArticleContentQuery>;
export type ArticleContentLazyQueryHookResult = ReturnType<typeof useArticleContentLazyQuery>;
export type ArticleContentQueryResult = Apollo.QueryResult<ArticleContentQuery, ArticleContentQueryVariables>;
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
export const GetFilesDocument = gql`
    query getFiles {
  getFiles {
    _id
    metadata {
      isPublic
      parent
      fullId
      smallId
      thumbnailId
      height
      width
      gallery {
        id
        smallId
        thumbnailId
        date
        description
        isPublic
      }
      name
      birthday
      discharge
      date
      link
      isFinalized
      isBilled
      billYear
      billNumber
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
import { ObjectId } from 'mongodb';
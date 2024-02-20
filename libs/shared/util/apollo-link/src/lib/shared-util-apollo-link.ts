import { ApolloLink, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'

import { ErrorDocument } from '@jaqua/shared/graphql'

export const getLink = ({
  usesUpload = false,
  backend = process.env['NEXT_PUBLIC_BACKEND']
} = {}) => {
  const uri = [backend, 'graphql'].join('/')

  const httpLink = usesUpload
    ? createUploadLink({ uri, credentials: 'include' })
    : new HttpLink({ uri, credentials: 'include' })

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    const { cache } = operation.getContext()

    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    if (networkError)
      console.error(
        `[Network error]: ${JSON.stringify(networkError, null, 2)})`
      )

    if (networkError || graphQLErrors) {
      const statusCode =
        networkError && 'statusCode' in networkError
          ? networkError.statusCode
          : null
      const graphQLError = graphQLErrors?.[0]

      cache.writeQuery({
        query: ErrorDocument,
        data: {
          error: {
            __typename: 'error',
            statusCode,
            message: graphQLError?.message || networkError?.message || '',
            location: graphQLError?.locations || '',
            path: graphQLError?.path || ''
          }
        }
      })
    }
  })

  return ApolloLink.from([errorLink, httpLink])
}

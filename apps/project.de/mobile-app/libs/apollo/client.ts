import { ACCESS_TOKEN_KEY } from '@/constants/constants'
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  from
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { setToStore } from '../storages/secure-store/store'
import { getApiUrl, getBearerString } from './util'

const httpLink = createHttpLink({
  credentials: 'include',
  uri: getApiUrl()
})

const logoutLink = onError(({ graphQLErrors, networkError }) => {
  console.log({ graphQLErrors: JSON.stringify(graphQLErrors, null, 2) })
  console.log({ networkError })

  if (
    graphQLErrors?.length &&
    (graphQLErrors[0].extensions as unknown as any).response.statusCode === 401
  ) {
    setToStore(ACCESS_TOKEN_KEY, '')
    client.resetStore()
  }
})

const asyncAuthLink = setContext(async (request, previousContext) => {
  return { token: await getBearerString() }
})

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {}, token = null }) => ({
    headers: {
      ...headers,
      authorization: token
    }
  }))

  return forward(operation)
})

const client = new ApolloClient({
  link: logoutLink.concat(from([asyncAuthLink, authLink, httpLink])),
  cache: new InMemoryCache()
})

export { client }

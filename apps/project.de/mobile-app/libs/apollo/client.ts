import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from
} from '@apollo/client'

import { getApiUrl } from './util'

// import { getFromStore } from '../storages/secure-store/store'

const httpLink = createHttpLink({
  credentials: 'include',
  uri: getApiUrl()
})

console.log(getApiUrl(), 'url')

// const authLink = new ApolloLink((operation, forward) => {
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       authorization: getFromStore(ACCESS_TOKEN_KEY) || null
//     }
//   }))

//   return forward(operation)
// })

const client = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache()
})

export { client }

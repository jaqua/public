import React from 'react'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { SessionProvider } from 'next-auth/react'
import withApollo, { InitApolloOptions } from 'next-with-apollo'
import NextApp, { AppProps } from 'next/app'

import { getLink } from '@jaqua/shared/util/apollo-link'

type Props = AppProps & {
  apollo: ApolloClient<Record<string, unknown>>
}
const App = ({ Component, pageProps, apollo }: Props) => (
  <ApolloProvider client={apollo}>
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <Component {...pageProps} />
    </SessionProvider>
  </ApolloProvider>
)

App.getInitialProps = async (appContext: any) => {
  const appProps = await NextApp.getInitialProps(appContext)
  return { ...appProps }
}

export default withApollo(
  ({ initialState }: InitApolloOptions<any>): ApolloClient<any> => {
    return new ApolloClient({
      link: getLink({ usesUpload: false }),
      cache: new InMemoryCache({
        addTypename: false
      }).restore(initialState || {})
    })
  },
  { getDataFromTree }
)(App)

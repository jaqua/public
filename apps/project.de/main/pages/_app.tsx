/**
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import '../public/styles/revealjs.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createEmotionCache } from '@jaqua/project.de/cache';
import theme from '@jaqua/project.de/theme';
import { Auth } from '@jaqua/shared/feat/login';
import { getLink } from '@jaqua/shared/util/apollo-link';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import withApollo, { InitApolloOptions } from 'next-with-apollo';
import NextApp, { AppProps } from 'next/app';
import Head from 'next/head';
import { createContext, useState } from 'react';
import 'reveal.js/dist/reveal.css';

export const UserContext = createContext(undefined);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  apollo?: ApolloClient<Record<string, unknown>>;
}

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  auth?: any;
};

export type AppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout;
};

const App = (props: AppPropsWithLayout) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
    apollo,
  } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  const [target, setTarget] = useState<string>('doctor');

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apollo}>
          <UserContext.Provider value={{ target, setTarget }}>
            <SessionProvider session={session} refetchInterval={5 * 60}>
              {Component.auth ? (
                <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
              ) : (
                getLayout(<Component {...pageProps} />)
              )}
            </SessionProvider>
          </UserContext.Provider>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

App.getInitialProps = async (appContext: any) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return { ...appProps };
};

export default withApollo(
  ({ initialState }: InitApolloOptions<any>): ApolloClient<any> => {
    return new ApolloClient({
      link: getLink(),
      cache: new InMemoryCache({
        addTypename: false,
      }).restore(initialState || {}),
    });
  },
  { getDataFromTree }
)(App);

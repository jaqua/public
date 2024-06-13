import React from 'react'

import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { ServerStyleSheets } from '@mui/styles'

import { Footer } from '../components/Footer'

class Document extends NextDocument {
  override render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv="content-type" content="text/html;charset=UTF-8" />
          <meta charSet="utf-8" />
        </Head>
        <body style={{ backgroundColor: '#f2f2f2' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pt: 2
            }}
          >
            <CssBaseline />
            <Main />
          </Box>
          <Footer />
          <NextScript />
        </body>
      </Html>
    )
  }
}

Document.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    })

  const initialProps = await NextDocument.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  }
}

export default Document

import React from 'react'

import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import { ServerStyleSheets } from '@mui/styles'

class Document extends NextDocument {
  render() {
    return (
      <Html lang="de">
        <Head>
          <meta httpEquiv="content-type" content="text/html;charset=UTF-8" />
          <meta charSet="utf-8" />
        </Head>
        <body style={{ backgroundColor: '#f2f2f2' }}>
          <Main />
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
    id: ctx?.query?.id,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  }
}

export default Document

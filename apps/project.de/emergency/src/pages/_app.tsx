import { AppProps } from 'next/app'
import Head from 'next/head'

import '../../public/styles/print.scss'

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Notfallmedikamente</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp

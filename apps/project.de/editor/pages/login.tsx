/**
 * @author        Dr. J. Quader
 * @copyright     © 2024 by J. Quader
 */
import { useEffect } from 'react'

import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import { Login } from '@jaqua/shared/feat/login'

const LoginPage = () => {
  const {
    query: { callbackUrl },
    push
  } = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) push('/')
  }, [session])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Login callbackUrl={callbackUrl as string} />

      {session ? (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: (theme) => theme.palette.primary.dark
          }}
          open
          transitionDuration={0}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
    </>
  )
}

export default LoginPage

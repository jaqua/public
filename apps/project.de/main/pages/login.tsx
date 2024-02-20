/**
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import { useEffect } from 'react'

import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import { options as authOptions } from '@jaqua/auth'
import { Login } from '@jaqua/shared/feat/login'

import BabyImg from '../assets/images/baby.jpg'
import RootLayout from '../components/RootLayout'
import { EmptyAppBar } from '../components/headers/BaseHeader'
import FullwidthImage from '../components/images/FullwidthImage'
import BaseSection from '../components/ui/sections/BaseSection'
import { NextPageWithLayout } from './_app'

const LoginPage: NextPageWithLayout = () => {
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
      <BaseSection
        sx={{
          backgroundColor: 'primary.dark',
          py: 2,
          display: { laptop: 'none' }
        }}
      >
        <EmptyAppBar />
      </BaseSection>
      <Grid
        container
        sx={{
          height: {
            laptop: '100vh',
            mobile: '50vh'
          }
        }}
      >
        <Grid
          item
          mobile={12}
          laptop={6}
          desktop={8}
          sx={{
            position: 'relative',
            display: {
              mobile: 'none',
              laptop: 'inherit'
            }
          }}
        >
          <FullwidthImage src={BabyImg} alt={'Babyfoto'} />
        </Grid>

        <Grid item mobile={12} laptop={6} desktop={4}>
          <Stack
            spacing={5}
            sx={{
              paddingLeft: (theme) => theme.spacing(5),
              paddingRight: (theme) => theme.spacing(5),
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Login callbackUrl={callbackUrl as string} />
          </Stack>
        </Grid>
      </Grid>
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

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions)
    }
  }
}

LoginPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>
}

export default LoginPage

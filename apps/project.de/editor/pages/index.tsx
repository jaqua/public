/**
 * @author        Dr. J. Quader
 * @copyright     © 2023 by J. Quader
 */
import React, { useState } from 'react'

import { useApolloClient } from '@apollo/client'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

import AlertTitle from '@mui/material/AlertTitle'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Snackbar from '@mui/material/Snackbar'
import { ThemeProvider } from '@mui/material/styles'

import { ErrorDocument, useErrorQuery } from '@jaqua/project.de/graphql'
import {
  Alert,
  AppBarComponent as AppBar,
  DrawerComponent as Drawer,
  Main,
  drawerWidth
} from '@jaqua/shared/feat/layout'
import { Login } from '@jaqua/shared/feat/login'
import { theme } from '@jaqua/shared/util/theme'

import { Drawer as DrawerContent } from '../components/Drawer'
import NotecardList from '../components/notecard/List'

export const NotecardListPage = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const isUnauthenticated = status === 'unauthenticated'
  const { roles }: any = session?.user || { roles: [] }
  const isAdmin = roles.indexOf('admin') > -1

  const [openNavMenu, setOpenNavMenu] = useState<boolean>(false)

  const client = useApolloClient()
  const { data } = useErrorQuery()
  const { error } = data || {}
  if (error) console.error(error)

  const handleClose = () => {
    client.writeQuery({
      query: ErrorDocument,
      data: { error: null }
    })
  }

  if (loading)
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        transitionDuration={500}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )

  if (isUnauthenticated) return <Login />
  if (!isAdmin) return <Alert severity="error">Permission denied</Alert>

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Notecard</title>
      </Head>
      <CssBaseline />
      <AppBar title="Redaktion" open={openNavMenu} setOpen={setOpenNavMenu} />
      <Drawer
        open={openNavMenu}
        setOpen={setOpenNavMenu}
        width={drawerWidth}
        content={<DrawerContent />}
      />
      <Main open={openNavMenu}>
        <Container maxWidth="laptop" sx={{ p: 0 }}>
          <NotecardList />
        </Container>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={Boolean(error)}
          onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose}>
            <AlertTitle>An error occured</AlertTitle>
            {error?.message}
          </Alert>
        </Snackbar>
      </Main>
    </ThemeProvider>
  )
}

export default NotecardListPage

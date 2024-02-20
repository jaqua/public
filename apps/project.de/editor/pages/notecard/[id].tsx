/**
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import React, { useState } from 'react'

import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import {
  Alert,
  AppBarComponent as AppBar,
  DrawerComponent as Drawer,
  Main,
  drawerWidth
} from '@jaqua/shared/feat/layout'
import { theme } from '@jaqua/shared/util/theme'

import { Drawer as DrawerContent } from '../../components/Drawer'
import Notecard from '../../components/notecard/Data'

export const NotecardPage = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const { roles }: any = session?.user || { roles: [] }
  const isAdmin = roles.indexOf('admin') > -1

  const { query } = useRouter()
  const id = query.id !== 'new' && (query.id as string)

  const [openNavMenu, setOpenNavMenu] = useState<boolean>(false)

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
  if (!isAdmin) return <Alert severity="error">Permission denied</Alert>

  if (!id) return <Notecard />

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
          <Notecard id={id} />
        </Container>
      </Main>
    </ThemeProvider>
  )
}

export default NotecardPage

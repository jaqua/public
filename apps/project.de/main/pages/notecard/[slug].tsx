/**
 * @author        Dr. J. Quader
 * @copyright     © 2024 by J. Quader
 */
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { NoSsr } from '@mui/base/NoSsr'
import { Link } from '@mui/material'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { Notecard, useNotecardContentQuery } from '@jaqua/project.de/graphql'
import { TProcessedNodeObj, converter } from '@jaqua/project.de/util/notecard'
import { Alert } from '@jaqua/shared/feat/layout'

import RootLayout from '../../components/RootLayout'
import Content from '../../components/notecards/Accordion'
import BaseSection from '../../components/ui/sections/BaseSection'
import { NextPageWithLayout } from '../_app'

const NotecardPage: NextPageWithLayout = () => {
  const { status }: any = useSession()
  const isLoggedIn = status === 'authenticated'

  const { query } = useRouter()
  const { slug, t } = query
  if (!slug) return

  const {
    loading,
    data: { notecardContent: data } = { notecardContent: {} }
  } = // eslint-disable-next-line react-hooks/rules-of-hooks
    useNotecardContentQuery({
      variables: {
        param: { name: 'slug', value: slug as string, testId: t as string }
      }
    })

  if (loading) return <CircularProgress size={80} className="animated fadeIn" />
  if (!data)
    return (
      <Box>
        <BaseSection sx={{ py: 5, pt: 12, backgroundColor: 'primary.dark' }}>
          <Alert severity="error" elevation={0}>
            No data existing
          </Alert>
        </BaseSection>
      </Box>
    )

  const { id, title, intro, content } = (data as Notecard) || {}
  const href = ['', 'presentation', id].join('/')

  const json = JSON.parse(content || '{}')
  const contents = json?.content?.[0]
    ? (converter(json.content[0]) as TProcessedNodeObj[])
    : undefined

  if (!contents)
    return (
      <Box>
        <BaseSection sx={{ py: 5, pt: 12, backgroundColor: 'primary.dark' }}>
          <Alert severity="error" elevation={0}>
            Empty dataset
          </Alert>
        </BaseSection>
      </Box>
    )

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Box>
        <BaseSection sx={{ py: 5, pt: 10, backgroundColor: 'primary.dark' }}>
          <Container sx={{ mt: (theme) => theme.spacing(5) }}>
            <Typography
              variant="h1"
              sx={{
                color: 'common.white',
                fontWeight: 400,
                marginBottom: (theme) => theme.spacing(3)
              }}
            >
              {title}
            </Typography>
            {intro ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: (theme) => theme.spacing(5),
                  whiteSpace: 'pre-wrap'
                }}
              >
                <Typography variant="body1" sx={{ color: 'common.grey' }}>
                  {intro}
                </Typography>
              </Box>
            ) : null}
          </Container>
        </BaseSection>

        <BaseSection sx={{ py: 5 }}>
          <Container sx={{ p: 0 }}>
            <Paper
              id="content"
              className="wrapper"
              elevation={0}
              sx={{ position: 'relative', p: 2 }}
            >
              <NoSsr>
                <Content contents={contents} />
              </NoSsr>
            </Paper>
            {isLoggedIn ? (
              <Link
                href={href}
                component={NextLink}
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  color: (theme) => theme.palette.text.primary,
                  position: 'relative',
                  opacity: 0.6,
                  '&:hover': {
                    opacity: 1
                  }
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: [14, '!important'],
                    position: 'absolute',
                    bottom: -28,
                    right: 10
                  }}
                >
                  Open presentation
                </Typography>
              </Link>
            ) : null}
          </Container>
        </BaseSection>
      </Box>
    </>
  )
}

NotecardPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>
}

export default NotecardPage

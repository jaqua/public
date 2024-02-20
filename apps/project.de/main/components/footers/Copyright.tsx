import { Box, Grid } from '@mui/material'
import { Stack } from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import Link from '../ui/links/Link'

const Copyright = () => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const copyrightArray: string[] = ['2023']
  if (currentYear > 2023) copyrightArray.push('-', currentYear.toString())

  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        color: 'common.grey',
        paddingBlock: (theme) => theme.spacing(4)
      }}
    >
      <Container maxWidth={'desktop'}>
        <Grid container rowSpacing={2}>
          <Grid item mobile={12} tablet={6}>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: {
                  mobile: 'center',
                  desktop: 'left'
                }
              }}
            >
              Copyright © {copyrightArray.join('')} project.de
            </Typography>
            {process.env.NEXT_PUBLIC_VERSION ? (
              <Typography variant="caption" sx={{ color: '#1d335f' }}>
                Version {process.env.NEXT_PUBLIC_VERSION}
              </Typography>
            ) : null}
          </Grid>
          <Grid item mobile={12} tablet={6}>
            <Stack
              direction={'row'}
              spacing={3}
              sx={{
                width: '100%',
                justifyContent: 'right'
              }}
            >
              <Link
                underline="none"
                variant="subtitle2"
                sx={{
                  color: 'inherit',
                  '&:hover': { color: (theme) => theme.palette.common.white }
                }}
                href="/page"
              >
                Page
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Copyright

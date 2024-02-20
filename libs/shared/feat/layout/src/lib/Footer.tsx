import Link from 'next/link'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[300]
            : theme.palette.grey[800]
      }}
    >
      <Container>
        <Typography variant="body1" sx={{ mb: 5 }}>
          "Wer ein Warum zum Leben hat, erträgt fast jedes Wie."{' '}
          <span style={{ fontStyle: 'italic', fontSize: 0.8 + 'rem' }}>
            Friedrich Nietzsche
          </span>
        </Typography>
        <Grid container spacing={5}>
          <Grid item mobile={12} tablet={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Philosophie
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tiefgehende Hintergründe verständlich aufbereiten und zugänglich
              zu machen - das ist mehr als nur ein Job.
            </Typography>
          </Grid>
          <Grid item mobile={12} tablet={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Rechtliche Hinweise
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              <Link
                href="http://jaqua.de/impressum"
                style={{ textDecoration: 'none', color: '#0009' }}
              >
                Impressum
              </Link>
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              <Link
                href="http://jaqua.de/datenschutz"
                style={{ textDecoration: 'none', color: '#0009' }}
              >
                Datenschutz
              </Link>
            </Typography>
          </Grid>
          <Grid item mobile={12} tablet={4}></Grid>
        </Grid>

        <Box mt={5}>
          <Typography variant="body2" color="text.secondary">
            {'Copyright © 2013-'}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

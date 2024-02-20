import NextImage, { StaticImageData } from 'next/image'

import { Box, Container, Theme } from '@mui/material'
import { SxProps } from '@mui/system'

const BaseSection = ({
  children,
  backgroundImage,
  sx
}: {
  children: React.ReactNode
  backgroundImage?: StaticImageData
  sx?: SxProps<Theme>
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        py: {
          mobile: 10,
          tablet: 10,
          desktop: 10
        },
        ...sx
      }}
    >
      {backgroundImage ? (
        <Box
          src={backgroundImage}
          alt="This is banner 2"
          component={NextImage}
          fill
          sx={{
            objectFit: 'cover',
            // zIndex: -1,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      ) : null}
      <Container sx={{ position: 'relative' }} maxWidth="desktop">
        {children}
      </Container>
    </Box>
  )
}

export default BaseSection

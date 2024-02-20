import { grey } from '@mui/material/colors'
import { deDE } from '@mui/material/locale'
import { Theme, createTheme } from '@mui/material/styles'
import '@mui/styles'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true
    smallMobile: true
    tablet: true
    laptop: true
    desktop: true
  }
  interface Palette {
    neutral: Palette['primary']
    neutralDark: Palette['primary']
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary']
    neutralDark?: PaletteOptions['primary']
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true
    neutralDark: true
  }
}

const { palette } = createTheme()
const { augmentColor } = palette

// Create a theme instance.
export const theme: Theme = createTheme(
  {
    breakpoints: {
      values: {
        mobile: 0,
        smallMobile: 300,
        tablet: 640,
        laptop: 1024,
        desktop: 1280
      }
    },
    palette: {
      neutral: augmentColor({ color: { main: grey[400] } }),
      neutralDark: augmentColor({ color: { main: grey[600] } })
    }
  },
  deDE
)

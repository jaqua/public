import localFont from 'next/font/local'

import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    grey: string
    lightBlue: string
  }
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

  interface TypographyVariants {
    link: React.CSSProperties
  }

  interface Palette {
    blue: Palette['primary']
    purple: Palette['primary']
  }

  interface PaletteOptions {
    blue?: PaletteOptions['primary']
    purple?: PaletteOptions['primary']
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    link?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    link: true
  }
}

const montserrat = localFont({
  src: [
    {
      path: '../assets/fonts/Montserrat/Montserrat-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Montserrat/Montserrat-Medium.otf',
      weight: '500',
      style: 'normal'
    }
  ]
})
const aeonis = localFont({
  src: [
    {
      path: '../assets/fonts/Aeonis LT Pro/Aeonis LT W01 Medium.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Aeonis LT Pro/Aeonis LT W01 Medium.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Aeonis LT Pro/Aeonis LT W01 Medium.ttf',
      weight: '500',
      style: 'normal'
    }
  ]
})

// Create a theme instance.
let theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      smallMobile: 300,
      tablet: 900,
      laptop: 1200,
      desktop: 1520
    }
  }
})
theme = createTheme({
  ...theme,
  palette: {
    primary: {
      main: '#00CBF0', // Light Blue
      light: '#5C8AB0', // Medium Blue
      dark: '#111B2F', // Dark Blue
      contrastText: '#F1F1F2' // White
    },
    secondary: {
      main: '#B297DD', // Dark Purple
      contrastText: '#F1F1F2' // White
    },
    error: {
      main: red.A700
    },
    text: {
      primary: '#111B2F', // Dark Blue
      secondary: '#00CBF0' // Middle Blue
    },
    common: {
      white: '#F1F1F2',
      grey: '#939D9E',
      lightBlue: '#00CBF0' // Light Blue
    },
    purple: {
      main: '#6C74D5',
      light: '#6C74D5',
      dark: '#B297DD',
      contrastText: '#F1F1F2'
    },

    background: {
      default: '#F1F1F2' // White
    }
  },
  typography: () => ({
    fontFamily: aeonis.style.fontFamily,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontSize: 45,
      fontWeight: 700,
      [theme.breakpoints.up('laptop')]: {
        fontSize: 60
      },
      [theme.breakpoints.up('desktop')]: {
        fontSize: 90
      }
    },
    h2: {
      fontSize: 30,
      [theme.breakpoints.up('laptop')]: {
        fontSize: 45
      },
      [theme.breakpoints.up('desktop')]: {
        fontSize: 55
      }
    },
    h3: {
      fontSize: 25,
      [theme.breakpoints.up('laptop')]: {
        fontSize: 40
      },
      [theme.breakpoints.up('desktop')]: {
        fontSize: 50
      }
    },
    body1: {
      fontFamily: montserrat.style.fontFamily,
      fontWeight: montserrat.style.fontWeight, // '400'
      fontSize: 20,
      [theme.breakpoints.up('tablet')]: {
        fontSize: 25
      },
      [theme.breakpoints.up('desktop')]: {
        fontSize: 30
      }
    },
    body2: {
      fontFamily: montserrat.style.fontFamily,
      fontWeight: montserrat.style.fontWeight, // '400'
      fontSize: 18,
      [theme.breakpoints.up('laptop')]: {
        fontSize: 20
      },
      [theme.breakpoints.up('desktop')]: {
        fontSize: 23
      }
    },
    subtitle2: {
      fontSize: 16,
      [theme.breakpoints.up('laptop')]: {
        fontSize: 20
      }
    },
    link: {
      fontSize: 20,
      [theme.breakpoints.up('laptop')]: {
        fontSize: 25
      }
    }
  }),
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'desktop'
      },
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,

          [theme.breakpoints.up('mobile')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3)
          },
          [theme.breakpoints.up('tablet')]: {
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6)
          },
          [theme.breakpoints.up('desktop')]: {
            paddingLeft: 0,
            paddingRight: 0
          },
          '&.MuiContainer-disableGutters': {
            paddingLeft: 0,
            paddingRight: 0
          }
        }
      }
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontFamily: aeonis.style.fontFamily,
          fontWeight: 700
        },
        sizeMedium: {
          fontSize: '1rem',
          padding: theme.spacing(1, 3),
          [theme.breakpoints.up('laptop')]: {
            fontSize: '1.4rem'
          }
        },
        sizeLarge: {
          fontSize: 25,
          padding: theme.spacing(1, 4),

          [theme.breakpoints.up('laptop')]: {
            fontSize: 35
          }
        },
        outlined: ({ theme }) => ({
          border: `1px solid ${theme.palette.common.white}`
        })
      }
    },
    MuiCssBaseline: {
      styleOverrides: `
        html,body,#__next {
          height:100%;
        }
        #__next {
          position:relative;
        }
      `
    },
    MuiIcon: {
      defaultProps: {
        fontSize: 'inherit'
      }
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'inherit'
      }
    }
  }
})

export default theme

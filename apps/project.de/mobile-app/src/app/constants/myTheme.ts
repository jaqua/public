import { hexToRgb } from '@/utils/utils'

type LightMode = 'light' | 'dark'
class ColorMode {
  lightMode: string
  r: number
  g: number
  b: number
  alpha: number
  constructor(a: string, b = '') {
    this.lightMode = a
    this.r = 0
    this.g = 0
    this.b = 0
    this.alpha = 0
  }
  toColorStr() {
    return `rgba(${this.r},${this.g},${this.b},${this.alpha})`
  }
  opacity(a: number) {
    this.alpha = a
    this.toRgb()
    return this.toColorStr()
  }
  toRgb(mode: 'light' | 'dark' = 'light') {
    if (mode === 'light') {
      if (this.r && this.g && this.b) return
      const { r, g, b } = hexToRgb(this.lightMode)
      this.r = r
      this.g = g
      this.b = b
    }
  }
}

export const Colors = {
  primary: new ColorMode('#111b2f'),
  secondary: new ColorMode('#3399CC'),
  accent: new ColorMode('#00ADEE'),
  basicGrey: new ColorMode('#929497'),
  lightBlue: new ColorMode('#3FB0DB'),
  lightGrey: new ColorMode('#A6A8AB'),
  white: new ColorMode('#FFFFFF')
}

export const fontSizes = {
  lg: 18
}

export const fontNames = {
  aeonisMedium: 'AeonisMedium',
  aeonisBold: 'AeonisBold',
  aeonisBoldExtended: 'AeonisBoldExtended',
  aeonisExtended: 'AeonisExtended',
  montserrat: 'Montserrat'
} as const

const ThemeConfig = () => {
  return {
    ...Colors,
    ...fontSizes,
    ...fontNames
  }
}

export const getMyTheme = () => ThemeConfig()

export default ThemeConfig

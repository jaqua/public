import { Dimensions, PixelRatio } from 'react-native'

import clsx, { ClassArray } from 'clsx'

type NumOrStr = number | string

export const cs = (...inputs: ClassArray) => {
  return clsx(...inputs)
}

export const wp = (widthPercent: NumOrStr) => {
  const srW = Dimensions.get('window').width
  const elemWidth =
    typeof widthPercent === 'number'
      ? widthPercent
      : parseFloat(widthPercent as string)

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((srW * elemWidth) / 100)
}

export const hp = (heightPercent: NumOrStr) => {
  const srH = Dimensions.get('window').height
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent as string)

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((srH * elemHeight) / 100)
}

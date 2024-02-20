import NextImage from 'next/image'

import { styled } from '@mui/material/styles'

const FullwidthImage = styled(NextImage)(() => ({
  width: '100%',
  maxWidth: '100%',
  height: '100%',
  objectFit: 'cover'
}))

export default FullwidthImage

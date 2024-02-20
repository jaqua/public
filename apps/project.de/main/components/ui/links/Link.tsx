import NextLink from 'next/link'

import { Link as MuiLink } from '@mui/material'
import { styled } from '@mui/material/styles'

const BaseLink = styled(NextLink)({}).withComponent(MuiLink)
BaseLink.defaultProps = {
  rel: 'noreferrer'
}
export default BaseLink

import { AppBar as MuiAppBar, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

const Appbar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'empty'
})<{ empty?: boolean }>(({ theme, ...props }) => ({
  boxShadow: 'none',
  position: props.empty ? 'static' : 'absolute',
  backgroundColor: props.empty
    ? 'transparent'
    : alpha(theme.palette.primary.dark, 0.3),
  backdropFilter: 'blur(5px)'
}))

export default Appbar

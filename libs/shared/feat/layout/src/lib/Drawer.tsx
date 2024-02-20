import { ReactChild } from 'react'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

interface DrawerProps {
  width: number
  open: boolean
  setOpen: (status: boolean) => void
  content: ReactChild
}
export const DrawerComponent: React.FC<DrawerProps> = ({
  width,
  open,
  setOpen,
  content
}) => {
  return (
    <Drawer
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box'
        }
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />

      {content}
      {process.env.NEXT_PUBLIC_VERSION ? (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 5,
            color: (theme) => theme.palette.grey[400]
          }}
        >
          {process.env.NEXT_PUBLIC_VERSION}
        </Typography>
      ) : null}
    </Drawer>
  )
}

export default DrawerComponent

import { useSession } from 'next-auth/react'
import Image from 'next/image'

import ChatIcon from '@mui/icons-material/Chat'
import CancelIcon from '@mui/icons-material/Clear'
import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { drawerWidth } from './Main'

export interface MenuProps {
  open: boolean
  setOpen: (status: boolean) => void
  title: string
  id?: string
  setOpenChat?: (id: string) => void
  countUnreadCommunicator?: number
  countUnreadTickets?: number
}
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

export const AppBarComponent = ({
  open,
  setOpen,
  title,
  id,
  setOpenChat,
  countUnreadCommunicator,
  countUnreadTickets
}: MenuProps) => {
  const { data: session }: any = useSession()

  const user = session?.user
  const isAdmin = user?.roles.indexOf('admin') > -1

  const handleClick = () => setOpen(session ? !open : false)
  return (
    <Box sx={{ flexGrow: 1 }} mb={1}>
      <AppBar
        open={open}
        position="static"
        color="inherit"
        className="shadow"
        elevation={0}
        sx={session ? {} : { padding: 2 }}
      >
        <Toolbar>
          {session ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
              onClick={handleClick}
            >
              {open ? <CancelIcon /> : <MenuIcon />}
            </IconButton>
          ) : null}

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            {session ? (
              title
            ) : (
              <Image
                src="/images/logo_vertical.png"
                width={215}
                height={60}
                alt="Logo"
              />
            )}
          </Typography>
          <Box>
            {id && countUnreadCommunicator > -1 ? (
              <IconButton onClick={() => setOpenChat(id)}>
                <Badge badgeContent={countUnreadCommunicator} color="primary">
                  <ChatIcon />
                </Badge>
              </IconButton>
            ) : null}
          </Box>
          <Box>
            {isAdmin && !id && countUnreadTickets > -1 ? (
              <IconButton href="/communicator">
                <Badge badgeContent={countUnreadTickets} color="primary">
                  <ChatIcon />
                </Badge>
              </IconButton>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
      <Divider />
    </Box>
  )
}

export default AppBarComponent

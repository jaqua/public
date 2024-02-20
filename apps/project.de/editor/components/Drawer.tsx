import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'

export const Drawer = () => {
  const { data: session }: any = useSession()

  return (
    <>
      <MenuList>
        <MenuItem href="/" component={Link}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>

        {session ? (
          <MenuItem onClick={() => signOut()}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        ) : null}
      </MenuList>
    </>
  )
}

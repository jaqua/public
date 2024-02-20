/**
 * @author        Dr. J. Quader
 * @copyright     © 2024 by J. Quader
 */
import { useSession } from 'next-auth/react'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export const Auth = ({ children }) => {
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
        transitionDuration={500}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return children
}

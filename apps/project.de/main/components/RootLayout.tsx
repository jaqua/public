/**
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import { ReactNode } from 'react'

import { Box } from '@mui/material'

import { ErrorHandler } from '@jaqua/shared/feat/layout'

import BaseFooter from './footers/BaseFooter'
import BaseHeader from './headers/BaseHeader'
import { Main } from './ui/Main'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ height: '100%' }}>
      <BaseHeader />
      <Main>{children}</Main>
      <BaseFooter />
      <ErrorHandler />
    </Box>
  )
}

export default RootLayout

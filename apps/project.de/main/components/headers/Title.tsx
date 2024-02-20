/**
 * @author        Dr. J. Quader
 * @copyright     © 2024 by J. Quader
 */
import Typography from '@mui/material/Typography'

import BaseSection from '../ui/sections/BaseSection'
import { EmptyAppBar } from './BaseHeader'

export const Title = ({ title }) => {
  return (
    <BaseSection sx={{ backgroundColor: 'primary.dark', py: 2 }}>
      <EmptyAppBar />
      {title ? (
        <Typography
          variant="h1"
          sx={{
            color: 'common.white',
            marginBottom: (theme) => theme.spacing(0)
          }}
        >
          {title}
        </Typography>
      ) : null}
    </BaseSection>
  )
}

export default Title

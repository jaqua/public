/**
 * @copyright     © 2023-2024 by J. Quader
 * @author        Dr. J. Quader
 * @author        A. Naseem
 */
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { Accordion } from './Accordion'

type Props = {
  showContentBox: boolean
  content: string[]
  formattedNestedList: any[]
}
const ContentBox = ({
  showContentBox = false,
  content,
  formattedNestedList
}: Props) => {
  if (!showContentBox) return null
  const [title, intro] = content
  return (
    <Paper elevation={0} sx={{ flex: 1, padding: 2 }}>
      {title ? (
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
      ) : null}
      {intro ? (
        <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
          {intro}
        </Typography>
      ) : null}
      <Accordion contents={formattedNestedList ? formattedNestedList : []} />
    </Paper>
  )
}

export default ContentBox

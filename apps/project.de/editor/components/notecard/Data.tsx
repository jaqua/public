/**
 * @fileoverview  Get editor data
 * @author        Dr. J. Quader
 * @copyright     © 2023 by J. Quader
 */
import { FunctionComponent } from 'react'

import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import { Notecard, useNotecardContentQuery } from '@jaqua/project.de/graphql'

import Editor from './Notecard'

export type Props = {
  id?: string
}
export const Wrapper: FunctionComponent<Props> = ({ id }) => {
  if (!id) return <Editor />

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { loading, error, data } = useNotecardContentQuery({
    variables: { param: { name: 'id', value: id } }
  })

  if (loading) return <CircularProgress color="inherit" />
  if (error) return <Alert severity="error">An error occured</Alert>
  if (!data?.notecardContent)
    return <Typography variant="body1">No data existing</Typography>

  return <Editor data={data.notecardContent as Notecard} />
}

export default Wrapper

import { FunctionComponent } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import {
  GetUsersDocument,
  RemoveUserInput,
  ResetPwdInput,
  useRemoveUserMutation,
  useResetPwdMutation
} from '@jaqua/shared/graphql'

interface Props {
  username: string
  handleClose: () => void
}
export const DialogContent: FunctionComponent<Props> = ({
  username,
  handleClose
}) => {
  const refetchQueries = [
    {
      query: GetUsersDocument
    }
  ]
  const [removeUser] = useRemoveUserMutation({ refetchQueries })
  const [resetPwd] = useResetPwdMutation({ refetchQueries })

  const handleClickReset = () => {
    const input: ResetPwdInput = { username }
    resetPwd({ variables: { input } })
      .then(() => handleClose())
      .catch((error) => console.error(error))
  }

  const handleClickDelete = () => {
    const input: RemoveUserInput = { username }
    removeUser({ variables: { input } })
      .then(() => handleClose())
      .catch((error) => console.error(error))
  }
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {username}
      </Typography>
      <Button
        color="primary"
        variant="contained"
        disableElevation
        onClick={handleClickReset}
        sx={{ mr: 2 }}
      >
        Password zurücksetzen
      </Button>
      <Button
        color="error"
        variant="contained"
        disableElevation
        onClick={handleClickDelete}
      >
        Löschen
      </Button>
    </Box>
  )
}

export default DialogContent

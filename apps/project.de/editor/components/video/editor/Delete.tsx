/**
 * @fileoverview  Delete component of video module
 * @author        Dr. J. Quader
 * @copyright     © 2024 by J. Quader
 */
import { useConfirm } from 'material-ui-confirm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Button from '@mui/material/Button'

import {
  VideoRemoveInput,
  useVideoRemoveMutation
} from '@jaqua/project.de/graphql'

export type Props = {
  fileId: string
}
const Delete = ({ fileId }: Props) => {
  const router = useRouter()
  const confirm = useConfirm()

  const {
    data: { user }
  } = useSession() as any
  const isAdmin = user?.roles.indexOf('admin') > -1

  const [videoRemove] = useVideoRemoveMutation()

  const handleDelete = async () => {
    const input: VideoRemoveInput = { fileId: fileId }

    try {
      await confirm({
        title: 'Video endgültig löschen?',
        cancellationText: 'Abbrechen',
        confirmationText: 'Löschen',
        confirmationButtonProps: {
          color: 'error',
          variant: 'contained',
          disableElevation: true
        }
      })
      await videoRemove({ variables: { input } })
      if(router){
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!(isAdmin && fileId)) return null

  return (
    <Button
      size="small"
      variant="outlined"
      color="error"
      sx={{ mt: 3 }}
      onClick={handleDelete}
    >
      Löschen
    </Button>
  )
}

export default Delete

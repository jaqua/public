/**
 * @fileoverview  Video content editor
 * @author        Dr. J. Quader
 * @copyright     © 2024 by J. Quader
 */
import { useForm } from 'react-hook-form'

import { useSnackbar } from 'notistack'

import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import {
  Video,
  VideoUpdateContentInput,
  useVideoUpdateContentMutation
} from '@jaqua/project.de/graphql'
import { TextField } from '@jaqua/shared/feat/form'

export type Props = {
  data: Video
}
export const VideoContent = ({ data }: Props) => {
  const { enqueueSnackbar } = useSnackbar()

  const [videoUpdateContent] = useVideoUpdateContentMutation()

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting }
  } = useForm({
    defaultValues: {
      content: data?.content || ''
    }
  })

  const submitForm = async (values) => {
    const input: VideoUpdateContentInput = {
      id: data.id,
      ...values
    }

    try {
      await videoUpdateContent({ variables: { input } })
      enqueueSnackbar('gespeichert', {
        variant: 'success',
        autoHideDuration: 2000
      })
    } catch (error) {
      enqueueSnackbar('Es ist ein Fehler aufgetreten', {
        variant: 'error',
        autoHideDuration: 2000
      })
      console.error(error)
    }
  }

  if (!data) return null
  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Typography variant="h3">{data?.title}</Typography>

        <TextField
          type="text"
          name="content"
          label="Transkript"
          control={control}
          multiline
          minRows={14}
          sx={{ mt: 2 }}
        />
        <Typography variant="caption" sx={{ mb: 2 }}>
          Bitte hier Text verfassen, welcher im Video entsprechend vertont wird
        </Typography>

        <Button
          type="submit"
          size="large"
          color="primary"
          variant="contained"
          fullWidth
          disableElevation
          disabled={!isValid || isSubmitting}
          sx={{ mt: 2 }}
        >
          Speichern
        </Button>
      </form>
    </Paper>
  )
}

export default VideoContent

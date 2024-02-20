import { useApolloClient } from '@apollo/client'

import AlertTitle from '@mui/material/AlertTitle'
import Snackbar from '@mui/material/Snackbar'

import { ErrorDocument, useErrorQuery } from '@jaqua/shared/graphql'

import { Alert } from './Main'

export const ErrorHandler = () => {
  const client = useApolloClient()
  const { data } = useErrorQuery()
  const { error } = data || {}
  if (error) console.error(error)

  const handleClose = () => {
    client.writeQuery({
      query: ErrorDocument,
      data: { error: null }
    })
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={Boolean(error)}
      onClose={handleClose}
    >
      <Alert severity="error" onClose={handleClose}>
        <AlertTitle>Es ist ein Fehler aufgetreten</AlertTitle>
        {error?.message}
      </Alert>
    </Snackbar>
  )
}

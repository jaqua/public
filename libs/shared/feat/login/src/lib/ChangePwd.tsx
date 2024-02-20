import React, { FunctionComponent } from 'react'

import { useFormik } from 'formik'
import { signOut } from 'next-auth/react'
import * as yup from 'yup'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { ChangePwdInput, useChangePwdMutation } from '@jaqua/shared/graphql'

const validationSchema = yup.object({
  password: yup
    .string()
    .min(5, 'Password should be of minimum 5 characters length')
    .required('Password is required'),
  confirm: yup
    .string()
    .min(5, 'Password should be of minimum 5 characters length')
    .required('Password is required')
})

interface Props {
  username: string
  isInitialPwd: boolean
}
export const ChangePwd: FunctionComponent<Props> = ({
  username,
  isInitialPwd
}) => {
  const [changePwd] = useChangePwdMutation()
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm: ''
    },
    validationSchema: validationSchema,
    onSubmit: async ({ password, confirm }) => {
      if (!username || password !== confirm) return
      const input: ChangePwdInput = { username, password }
      changePwd({ variables: { input } })
        .then(() => signOut())
        .catch((error) => console.error(error))
    }
  })

  return (
    <Paper sx={{ padding: 3, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        New password
      </Typography>
      {isInitialPwd ? (
        <Alert color="info" sx={{ mb: 3 }}>
          Please set your own password
        </Alert>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Passwort"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          id="confirm"
          name="confirm"
          label="Wiederholung"
          type="password"
          value={formik.values.confirm}
          onChange={formik.handleChange}
          error={formik.touched.confirm && Boolean(formik.errors.confirm)}
          helperText={formik.touched.confirm && formik.errors.confirm}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          size="large"
          color="primary"
          variant="contained"
          fullWidth
          disableElevation
          disabled={
            formik.values.password.length < 8 ||
            formik.values.password !== formik.values.confirm
          }
        >
          Save password
        </Button>
      </form>
    </Paper>
  )
}

export default ChangePwd

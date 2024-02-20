/**
 * @fileoverview Form to add new user dataset
 * @author Dr. J. Quader
 * @copyright © 2022-2023 by J. Quader
 */
import { FunctionComponent } from 'react'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

import { inputProps } from '@jaqua/config'
import {
  AddUserInput,
  GetUsersDocument,
  useAddUserMutation
} from '@jaqua/shared/graphql'
import { objectHasEveryValues, objectHasKeys } from '@jaqua/shared/util/check'
import { generateRolesArray } from '@jaqua/shared/util/generator'

export const AddUserInitialValues = () => {
  return {
    username: '',
    admin: false,
    editor: false,
    user: false
  }
}

export const AddUserSchema = Yup.object().shape({
  username: Yup.string().required('Benutzername erforderlich')
})

interface Props {
  setContent: (value: string) => void
}
export const UserAdd: FunctionComponent<Props> = ({ setContent }) => {
  const [addUser] = useAddUserMutation({
    refetchQueries: [
      {
        query: GetUsersDocument
      }
    ]
  })

  const handleOnSubmit = (values, { setSubmitting, resetForm }) => {
    const input: AddUserInput = {
      username: values.username,
      roles: generateRolesArray(values)
    }

    addUser({ variables: { input } })
      .then((res) => {
        setContent('')
      })
      .catch((error) => console.error(error))
  }

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Formik
        initialValues={AddUserInitialValues()}
        validationSchema={AddUserSchema}
        onSubmit={handleOnSubmit}
        validateOnBlur
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
          const hasErrors: boolean = objectHasKeys(errors)
          const hasValues: boolean = objectHasEveryValues(values)

          return (
            <Form
              id="form-new-user"
              onSubmit={handleSubmit}
              autoComplete="off"
              autoCapitalize="none"
              style={{ width: 540 }}
            >
              <FormControl sx={{ mr: 1 }}>
                <TextField
                  id="username"
                  name="username"
                  type="text"
                  label="Benutzername"
                  value={values.username}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username as string}
                  style={{ width: 250 }}
                  InputProps={{ inputProps }}
                />
              </FormControl>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">Zugriffsrechte</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.admin}
                        onChange={handleChange}
                        name="admin"
                      />
                    }
                    label="Administrator"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.editor}
                        onChange={handleChange}
                        name="editor"
                      />
                    }
                    label="Editor"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.user}
                        onChange={handleChange}
                        name="user"
                      />
                    }
                    label="Benutzer"
                  />
                </FormGroup>
              </FormControl>
              <Button
                id="button-new-user"
                variant="contained"
                type="submit"
                disableElevation
                disabled={isSubmitting || hasErrors || !hasValues}
                sx={{ marginTop: 4 }}
              >
                Benutzer erstellen
              </Button>
            </Form>
          )
        }}
      </Formik>
    </Paper>
  )
}

export default UserAdd

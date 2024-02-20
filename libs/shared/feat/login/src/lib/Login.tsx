/**
 * @author        Dr. J. Quader
 * @copyright     © 2023-2024 by J. Quader
 */
import { Controller, useForm } from 'react-hook-form'

import { signIn } from 'next-auth/react'

import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'

export const StyledInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxSizing: 'border-box',
  '&.MuiInputBase-root': {
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow'
    ]),
    overflow: 'hidden',
    borderRadius: 8,
    position: 'relative',
    width: '100%',
    border: '2px solid transparent',
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 .2rem`
    }
  },
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    ...theme.typography.body1,
    fontWeight: 500,
    color: 'inherit',
    paddingBlock: theme.spacing(1),
    paddingInline: theme.spacing(3)
  }
}))

export const Login = ({ callbackUrl = '/' }) => {
  const theme = useTheme()

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting }
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async ({ username, password }) => {
    signIn('credentials', {
      username: username.toLowerCase(),
      password,
      redirect: true,
      callbackUrl
    })
  }

  return (
    <Paper
      sx={{
        padding: 3,
        maxWidth: 500,
        margin: 'auto',
        backgroundColor: 'transparent'
      }}
      elevation={0}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant="h3">Login</Typography>
          <Controller
            name="username"
            control={control}
            rules={{ required: true, minLength: 3 }}
            render={({ field, fieldState: { error } }) => (
              <StyledInput
                {...field}
                startAdornment={
                  <Box
                    sx={{
                      color: 'primary.light',
                      display: 'flex',
                      alignContent: 'center',
                      justifyContent: 'center',
                      paddingInline: 2
                    }}
                  >
                    <PersonIcon />
                  </Box>
                }
                placeholder="Username"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.dark
                }}
                error={Boolean(error)}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true, minLength: 5 }}
            render={({ field, fieldState: { error } }) => (
              <StyledInput
                {...field}
                startAdornment={
                  <Box
                    sx={{
                      color: 'primary.light',
                      display: 'flex',
                      alignContent: 'center',
                      justifyContent: 'center',
                      paddingInline: 2
                    }}
                  >
                    <LockIcon />
                  </Box>
                }
                placeholder="Password"
                type="password"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.dark
                }}
                error={Boolean(error)}
              />
            )}
          />
        </Stack>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disableElevation
          sx={{
            mt: 2,
            '&.Mui-disabled': {
              background: (theme) => theme.palette.primary.light,
              color: (theme) => theme.palette.primary.contrastText
            }
          }}
          disabled={!isValid || isSubmitting}
        >
          Login
        </Button>
      </form>
    </Paper>
  )
}

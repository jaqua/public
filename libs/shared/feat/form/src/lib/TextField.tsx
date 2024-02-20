import { FunctionComponent } from 'react'
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'

import MuiTextField from '@mui/material/TextField'

interface Props {
  name: string
  label: string
  control: any
  autoFocus?: boolean
  minRows?: number
  sx?: any
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined
  type?: string
  multiline?: boolean
  disabled?: boolean
  handleKeyDown?: (event: any) => void
  handleBlur?: (event: any) => void
  inputRef?: any
}
export const TextField: FunctionComponent<Props> = ({
  name,
  control,
  label,
  type = 'text',
  sx,
  minRows = 1,
  rules,
  autoFocus = false,
  multiline = false,
  disabled = false,
  handleKeyDown,
  handleBlur,
  inputRef
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <MuiTextField
        {...field}
        type={type}
        label={label}
        helperText={error ? error.message : null}
        error={Boolean(error)}
        autoFocus={autoFocus}
        autoCorrect="off"
        spellCheck={false}
        sx={sx}
        fullWidth
        multiline={multiline}
        minRows={minRows}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        inputRef={inputRef}
      />
    )}
  />
)

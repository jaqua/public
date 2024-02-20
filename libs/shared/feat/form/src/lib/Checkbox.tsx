import { FunctionComponent } from 'react'
import { Controller } from 'react-hook-form'

import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

interface Props {
  name: string
  label: string
  control: any
  color?: CheckboxProps['color']
  disabled?: boolean
  sx?: any
}
export const Checkbox: FunctionComponent<Props> = ({
  name,
  control,
  label,
  color = 'default',
  disabled,
  sx
}) => {
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field: props }) => (
            <MuiCheckbox
              {...props}
              checked={props.value}
              color={color}
              disabled={disabled}
              sx={{
                ...sx
              }}
            />
          )}
        />
      }
      label={label}
      sx={{
        color: color === 'default' ? 'text.primary' : color + '.main',
        cursor: disabled ? 'default' : 'pointer'
      }}
    />
  )
}

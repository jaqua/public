import { FunctionComponent } from 'react'
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import MuiSelect from '@mui/material/Select'

interface Props {
  name: string
  label: string
  control: any
  sx?: any
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined
  options: Array<Record<string, string | number>>
}
export const Select: FunctionComponent<Props> = ({
  name,
  control,
  label,
  sx,
  rules,
  options = []
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: props }) => (
        <FormControl fullWidth>
          <InputLabel id="select-label">{label}</InputLabel>
          <MuiSelect
            {...props}
            sx={sx}
            label={label}
            labelId="select-label"
            id="select"
          >
            {options.map(({ label, value, key }) => (
              <MenuItem value={value} key={key}>
                {label}
              </MenuItem>
            ))}
          </MuiSelect>
        </FormControl>
      )}
    />
  )
}

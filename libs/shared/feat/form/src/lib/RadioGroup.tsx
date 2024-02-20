import { FunctionComponent } from 'react'
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import MuiRadioGroup from '@mui/material/RadioGroup'

interface Props {
  name: string
  label: string
  options: Array<Record<'value' | 'label' | 'key', string>>
  control: any
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined
}
export const RadioGroup: FunctionComponent<Props> = ({
  name,
  control,
  label,
  options = [],
  rules = {}
}) => {
  const generateRadioOptions = () => {
    return options.map(({ value, label, key }) => (
      <FormControlLabel
        value={value}
        label={label}
        key={key}
        control={<Radio />}
      />
    ))
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field: { onChange, value } }) => (
          <MuiRadioGroup value={value} onChange={onChange}>
            {generateRadioOptions()}
          </MuiRadioGroup>
        )}
      />
    </FormControl>
  )
}

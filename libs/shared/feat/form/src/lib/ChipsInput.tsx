import { FunctionComponent } from 'react'
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'

import { MuiChipsInput } from 'mui-chips-input'

interface Props {
  name: string
  label: string
  control: any
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined
  sx?: any
}
export const ChipsInput: FunctionComponent<Props> = ({
  name,
  control,
  label,
  rules,
  sx
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: props }) => (
        <MuiChipsInput
          {...props}
          label={label}
          helperText={
            props.value.length > 0 ? 'Doppelklick um Element zu bearbeiten' : ''
          }
          clearInputOnBlur
          placeholder="Eingabe und Enter drücken"
          sx={sx}
        />
      )}
    />
  )
}

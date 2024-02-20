import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'

import AutocompleteMui from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import MuiTextField from '@mui/material/TextField'

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
  options?: string[]
}

export const Autocomplete = ({
  name,
  control,
  label,
  sx,
  rules,
  options
}: Props) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, ..._field } }) => (
      <AutocompleteMui
        freeSolo
        multiple
        options={options || []}
        onChange={(_, data) => onChange(data)}
        renderInput={(params) => (
          <MuiTextField {...params} label={label} sx={sx} />
        )}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        {..._field}
      />
    )}
  />
)

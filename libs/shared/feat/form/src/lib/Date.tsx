import { FunctionComponent } from 'react'
import { Controller } from 'react-hook-form'

import { de } from 'date-fns/locale'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

interface Props {
  name: string
  label: string
  control: any
  minDate?: Date
  maxDate?: Date
  autoFocus?: boolean
  disableFuture?: boolean
}
export const DatePicker: FunctionComponent<Props> = ({
  name,
  label,
  control,
  minDate,
  maxDate,
  autoFocus,
  disableFuture
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <MuiDatePicker
            label={label}
            slotProps={{
              textField: {
                helperText: 'TT/MM/JJJJ'
              }
            }}
            minDate={minDate}
            maxDate={maxDate}
            autoFocus={autoFocus}
            disableFuture={disableFuture}
            {...field}
          />
        )}
      />
    </LocalizationProvider>
  )
}

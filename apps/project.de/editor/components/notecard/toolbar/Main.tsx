import { FormState } from 'react-hook-form'

import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

type Props = {
  formState: FormState<any>
  isSaving: boolean
  submitForm: (values: any) => void
  onToggleSplit: () => void
}
const MainToolbar = ({
  formState,
  isSaving,
  submitForm,
  onToggleSplit
}: Props) => {
  const { isValid, isSubmitting } = formState
  return (
    <Box sx={{ mb: 2, display: 'flex' }}>
      <IconButton
        type="submit"
        onClick={submitForm}
        value="save"
        sx={{ borderRadius: 1 }}
        disabled={!isValid || isSubmitting || isSaving}
      >
        {isSaving ? <CheckIcon /> : <SaveIcon />}
      </IconButton>
      <IconButton
        onClick={onToggleSplit}
        value="split"
        sx={{ borderRadius: 1, ml: 'auto' }}
        disabled={!isValid}
      >
        <VerticalSplitIcon />
      </IconButton>
    </Box>
  )
}

export default MainToolbar

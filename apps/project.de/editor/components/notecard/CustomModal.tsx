/**
 * @copyright     © 2024 by J. Quader
 * @author        Dr. J. Quader
 * @author        H. Nadir
 */
import React, { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

interface ModalProps {
  title: string
  open: boolean
  handleClose: () => void
  handleSubmitSingleInput: (value: string) => void
  handleSubmitMultipleInputs: (value: string[]) => void
  multipleInputs?: boolean
  data?: any
}

const CustomModal: React.FC<ModalProps> = ({
  title,
  open,
  handleClose,
  handleSubmitSingleInput,
  handleSubmitMultipleInputs,
  multipleInputs = false,
  data
}) => {
  const [inputValue, setInputValue] = useState('')
  const [inputValues, setInputValues] = useState<string[]>([''])

  useEffect(() => {
    if (data) setInputValues([...data])
  }, [data])

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues]
    newInputValues[index] = value
    setInputValues(newInputValues)
  }

  const handleAddField = () => {
    setInputValues([...inputValues, ''])
  }

  const handleRemoveField = (index: number) => {
    const newInputValues = [...inputValues]
    newInputValues.splice(index, 1)
    setInputValues(newInputValues)
  }

  const handleSingleSubmit = () => {
    handleSubmitSingleInput(inputValue)
    clear()
  }

  const handleMultipleSubmit = () => {
    handleSubmitMultipleInputs(inputValues)
    clear()
  }

  const close = () => {
    clear()
    handleClose()
  }

  const clear = () => {
    setInputValue('')
    setInputValues([''])
  }

  return (
    <Box>
      <Modal
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        open={open}
        onClose={close}
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0)' } // Transparent background
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFFFFF', // White background
            borderRadius: '8px', // Rounded corners
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Shadow
            p: 3, // Padding
            minWidth: '500px', // Minimum width
            maxWidth: '600px', // Maximum width
            position: 'relative', // Position for close icon
            overflowY: 'auto', // Enable vertical scroll if needed
            maxHeight: '400px' // Limit max height for scroll
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px'
            }}
            onClick={close}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {title}
          </Typography>
          {multipleInputs ? (
            inputValues.map((value, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  label={`Enter ${title}Id`}
                  fullWidth
                  sx={{ mb: 2 }}
                  name="newfield"
                />
                {
                  // Render delete icon for all fields except the first one
                  <IconButton
                    onClick={() => handleRemoveField(index)}
                    sx={{
                      mt: '-10px'
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              </Box>
            ))
          ) : (
            <TextField
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              label={`Enter ${title}Id`}
              fullWidth
              sx={{ mb: 2 }}
            />
          )}
          {multipleInputs && ( // Render "Add Field" button if less than 3 fields are added
            <div
              onClick={handleAddField}
              style={{
                marginTop: '1px',
                marginLeft: 'auto',
                display: 'flex',
                justifyContent: 'end',
                color: '#757ce8',
                paddingBottom: '10px',
                cursor: 'pointer'
              }}
            >
              Add Field
            </div>
          )}
          <Button onClick={close} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            onClick={multipleInputs ? handleMultipleSubmit : handleSingleSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default CustomModal

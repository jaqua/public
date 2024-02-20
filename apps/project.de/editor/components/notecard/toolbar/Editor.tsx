/**
 * @copyright     © 2023-2024 by J. Quader
 * @author        Dr. J. Quader
 * @author        H. Nadir
 * @author        A. Naseem
 */
import { Editor } from '@tiptap/react'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease'
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { styled } from '@mui/material/styles'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius
    }
  }
}))

type TEditorMenuProps = {
  setOpenImageModal: React.Dispatch<React.SetStateAction<boolean>>
  setOpenRefModal: React.Dispatch<React.SetStateAction<boolean>>
  editor: Editor | null
}
export default function EditorMenu({
  setOpenImageModal,
  setOpenRefModal,
  editor
}: TEditorMenuProps) {
  const onToggleBold = () => editor?.commands.toggleBold()
  const onToggleItalic = () => editor?.commands.toggleItalic()
  const onToggleIndent = () =>
    editor?.chain().focus().sinkListItem('listItem').run()
  const onToggleOutdent = () =>
    editor?.chain().focus().liftListItem('listItem').run()

  const menuToggleButtonFormats = [
    'bold',
    'italic',
    'indent',
    'outdent',
    'image',
    'ref'
  ]

  const onToggleImage = () => {
    setOpenImageModal(true)
  }

  const onToggleRef = () => {
    setOpenRefModal(true)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        px: (t) => t.spacing(1),
        py: (t) => t.spacing(0.5),
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderBottom: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        flexWrap: 'wrap'
      }}
    >
      <StyledToggleButtonGroup
        size="small"
        value={menuToggleButtonFormats}
        aria-label="text formatting"
      >
        <ToggleButton
          onClick={onToggleBold}
          value={editor?.isActive('bold') ? 'bold' : ''}
          aria-label="bold"
        >
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton
          value={editor?.isActive('italic') ? 'italic' : ''}
          aria-label="italic"
          onClick={onToggleItalic}
        >
          <FormatItalicIcon />
        </ToggleButton>

        {/* <Divider
          flexItem
          orientation="vertical"
          sx={{
            mx: 0.5,
            my: 1,
            backgroundColor: (theme) => theme.palette.divider
          }}
        /> */}

        <ToggleButton
          value={editor?.can().liftListItem('listItem') ? '' : 'outdent'}
          disabled={!editor?.can().liftListItem('listItem')}
          aria-label="Outdent"
          onClick={onToggleOutdent}
        >
          <FormatIndentDecreaseIcon />
        </ToggleButton>

        <ToggleButton
          value={editor?.can().liftListItem('listItem') ? '' : 'indent'}
          disabled={!editor?.can().sinkListItem('listItem')}
          aria-label="Indent"
          onClick={onToggleIndent}
        >
          <FormatIndentIncreaseIcon />
        </ToggleButton>

        {/* <Divider
          flexItem
          orientation="vertical"
          sx={{
            mx: 0.5,
            my: 1,
            backgroundColor: (theme) => theme.palette.divider
          }}
        /> */}

        <ToggleButton
          value={editor?.can().liftListItem('listItem') ? '' : 'image'}
          aria-label="image"
          onClick={onToggleImage}
        >
          <CropOriginalIcon />
        </ToggleButton>

        <ToggleButton
          value={editor?.can().liftListItem('listItem') ? '' : 'ref'}
          aria-label="ref"
          onClick={onToggleRef}
        >
          <BookmarkBorderIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  )
}

import * as React from 'react'

import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined'
import { Divider, IconButton, ToggleButton } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export default function TableMenu({ editor }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <ToggleButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <TableViewOutlinedIcon />
      </ToggleButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
              .run()
          }
        >
          Insert Table
        </MenuItem>
        <MenuItem onClick={() => editor.chain().focus().deleteTable().run()}>
          deleteTable
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => editor.chain().focus().addColumnBefore().run()}
        >
          addColumnBefore
        </MenuItem>
        <MenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
          addColumnAfter
        </MenuItem>
        <MenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>
          deleteColumn
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>
          addRowBefore
        </MenuItem>
        <MenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>
          addRowAfter
        </MenuItem>
        <MenuItem onClick={() => editor.chain().focus().deleteRow().run()}>
          deleteRow
        </MenuItem>

        <Divider />
        {/* <MenuItem onClick={() => editor.chain().focus().mergeCells().run()}>
          mergeCells
        </MenuItem>
        <MenuItem onClick={() => editor.chain().focus().splitCell().run()}>
          splitCell
        </MenuItem>
        <MenuItem onClick={() => editor.chain().focus().mergeOrSplit().run()}>
          mergeOrSplit
        </MenuItem> */}

        <Divider />
        <MenuItem
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        >
          toggleHeaderColumn
        </MenuItem>
        <MenuItem
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        >
          toggleHeaderRow
        </MenuItem>
        <MenuItem
          onClick={() => editor.chain().focus().toggleHeaderCell().run()}
        >
          toggleHeaderCell
        </MenuItem>
      </Menu>
    </div>
  )
}

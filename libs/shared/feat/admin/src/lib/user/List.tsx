import { useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import Content from './dialog/Content'

export const UserList = ({ data }) => {
  const [selectedUser, setSelectedUser] = useState<string>(null)

  const handleClose = () => setSelectedUser(null)
  const handleClick = (username) => setSelectedUser(username)

  return (
    <Paper elevation={0} sx={{ padding: 1, maxWidth: 600 }}>
      <List>
        {data.map((user) => (
          <ListItemText
            key={user.username}
            primary={user.username}
            secondary={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {user.roles.join(', ')}
              </Typography>
            }
            style={{ backgroundColor: '#eee', cursor: 'pointer' }}
            sx={{
              borderRadius: 1,
              paddingX: 2,
              paddingY: 1,
              display: 'flex',
              justifyContent: 'space-between'
            }}
            onClick={() => handleClick(user?.username)}
          />
        ))}
      </List>
      <Dialog
        open={Boolean(selectedUser)}
        onClose={handleClose}
        scroll="paper"
        maxWidth="laptop"
      >
        <DialogContent>
          {selectedUser ? (
            <Content username={selectedUser} handleClose={handleClose} />
          ) : null}
        </DialogContent>
      </Dialog>
    </Paper>
  )
}

export default UserList

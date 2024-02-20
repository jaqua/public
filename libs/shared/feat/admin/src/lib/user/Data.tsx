import CircularProgress from '@mui/material/CircularProgress'

import { useGetUsersQuery } from '@jaqua/shared/graphql'

import List from './List'

export const UserList = () => {
  const getUser = useGetUsersQuery()
  const { data, loading } = getUser

  if (loading) return <CircularProgress color="inherit" />
  if (!data?.getUsers) return <div>Keine Benutzer verfügbar</div>

  return <List data={data.getUsers} />
}

export default UserList

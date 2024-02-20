import { Button } from '@mui/material'

const ButtonPrimary = ({ children }: { children: React.ReactNode }) => {
  return <Button variant="contained">{children}</Button>
}

export default ButtonPrimary

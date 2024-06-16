import { PropsWithChildren, createContext, useContext } from 'react'

import useAuth from '@/hooks/useAuth'
import { ApolloError } from '@apollo/client/errors'
import { MutationResult } from '@apollo/client/react/types/types'

type AuthContextType = {
  isLoggedIn: boolean
  login: (username: string, password: string) => Promise<void>
  loginState: MutationResult<any> | null
  logout: () => Promise<void>
}
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => new Promise((res) => res()),
  loginState: null,
  logout: () => new Promise((res) => res())
})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { isLoggedIn, login, loginState, logout } = useAuth()

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        loginState,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

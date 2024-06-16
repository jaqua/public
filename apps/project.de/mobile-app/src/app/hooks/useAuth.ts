import { useCallback, useEffect, useState } from 'react'

import { ACCESS_TOKEN_KEY } from '@/constants/constants'
import { getFromStore, setToStore } from '@@/libs/storages/secure-store/store'
// import { gql, useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

import useLogin from './useLogin'

export type UserType = {
  name: string
} | null

const useAuth = () => {
  const navigation = useNavigation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [loginMutation, loginState] = useLogin()

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        setIsLoggedIn(false)
        const res = await loginMutation({
          variables: {
            input: {
              username,
              password
            }
          }
        })
        const token = res.data.login.access_token
        await setToStore(ACCESS_TOKEN_KEY, token || '')
        setIsLoggedIn(true)
      } catch (error) {
        console.log(error)
        setIsLoggedIn(false)
      }
    },
    [loginMutation]
  )

  const logout = useCallback(async () => {
    await setToStore(ACCESS_TOKEN_KEY, '')
    setIsLoggedIn(false)
  }, [])

  useEffect(() => {
    const fn = async (e: any) => {
      e.preventDefault()
      const token = await getFromStore(ACCESS_TOKEN_KEY)
      if (token) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }
    const unsubBeforeRemove = navigation.addListener('beforeRemove', fn)
    const unsubBlur = navigation.addListener('blur', fn)

    return () => {
      unsubBeforeRemove()
      unsubBlur()
    }
  }, [navigation])

  return {
    isLoggedIn,
    login,
    loginState,
    loginMutation,
    logout
  }
}

export default useAuth

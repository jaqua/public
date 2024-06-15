import {
  ACCESS_TOKEN_KEY,
  apiEndpoint,
  apiPort,
  apiUrl
} from '@/constants/constants'
import { getFromStore } from '@@/libs/storages/secure-store/store'

export const getApiUrl = () => {
  return `${apiUrl}:${apiPort}/${apiEndpoint}`
}

export const getBearerString = async () => {
  const token = await getFromStore(ACCESS_TOKEN_KEY)
  return token ? `Bearer ${token}` : null
}

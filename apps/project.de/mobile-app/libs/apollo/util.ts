import { apiEndpoint, apiPort, apiUrl } from '@/constants/constants'

export const getApiUrl = () => {
  return `${apiUrl}:${apiPort}/${apiEndpoint}`
}

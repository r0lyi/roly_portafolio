import axios from 'axios'
import { getStoredAdminAuthHeader } from '../../utils/adminSession.js'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  const storedAuthHeader = getStoredAdminAuthHeader()

  if (storedAuthHeader && !config.headers.Authorization) {
    config.headers.Authorization = storedAuthHeader
  }

  return config
})

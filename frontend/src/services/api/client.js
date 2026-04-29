import axios from 'axios'
import { getStoredAdminAuthHeader } from '../../utils/adminSession.js'

const DEFAULT_API_URL = 'https://rolyportafolio-production.up.railway.app'
const apiBaseUrl =
  (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/+$/, '')

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  const storedAuthHeader = getStoredAdminAuthHeader()

  if (storedAuthHeader && !config.headers.Authorization) {
    config.headers.Authorization = storedAuthHeader
  }

  return config
})

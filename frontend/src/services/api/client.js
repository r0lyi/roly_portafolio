import axios from 'axios'
import { getStoredAdminAuthHeader } from '../../utils/adminSession.js'
import { apiBaseUrl } from './config.js'

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

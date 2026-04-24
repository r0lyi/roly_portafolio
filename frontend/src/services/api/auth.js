import { apiClient } from './client.js'
import { buildBasicAuthorizationHeader } from '../../utils/basicAuth.js'
import { clearStoredAdminAuthHeader } from '../../utils/adminSession.js'

export async function getAuthStatus() {
  const { data } = await apiClient.get('/auth/status')
  return data
}

export async function getCurrentAdminProfile(authHeader) {
  const config = authHeader
    ? {
        headers: {
          Authorization: authHeader,
        },
      }
    : undefined

  const { data } = await apiClient.get('/auth/me', config)
  return data
}

export async function loginAdmin({ email, password }) {
  const authHeader = buildBasicAuthorizationHeader(email, password)
  const user = await getCurrentAdminProfile(authHeader)

  return {
    authHeader,
    user,
  }
}

export function logoutAdminSession() {
  clearStoredAdminAuthHeader()
}

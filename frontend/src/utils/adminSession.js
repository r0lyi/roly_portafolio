const ADMIN_AUTH_STORAGE_KEY = 'roly_portafolio_admin_auth'

export function getStoredAdminAuthHeader() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY)
}

export function setStoredAdminAuthHeader(authHeader) {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, authHeader)
}

export function clearStoredAdminAuthHeader() {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY)
}

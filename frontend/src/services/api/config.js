const DEFAULT_API_URL = 'https://rolyportafolio-production.up.railway.app'

export function resolveApiBaseUrl(rawApiUrl) {
  const normalizedApiUrl = (rawApiUrl || DEFAULT_API_URL).trim().replace(/\/+$/, '')

  if (normalizedApiUrl.endsWith('/api')) {
    return normalizedApiUrl
  }

  return `${normalizedApiUrl}/api`
}

export function resolveApiOrigin(rawApiUrl) {
  const fallbackOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost'

  try {
    return new URL(rawApiUrl || DEFAULT_API_URL, fallbackOrigin).origin
  } catch {
    return fallbackOrigin
  }
}

export const apiBaseUrl = resolveApiBaseUrl(import.meta.env.VITE_API_URL)
export const apiOrigin = resolveApiOrigin(import.meta.env.VITE_API_URL)

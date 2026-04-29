import { apiOrigin } from '../services/api/config.js'

const EXTERNAL_URL_PATTERN = /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i

function sanitizeImagePath(value) {
  return String(value ?? '')
    .trim()
    .replace(/\\/g, '/')
}

export function normalizeImageAssetPath(
  value,
  { defaultDirectory = '/img' } = {},
) {
  let path = sanitizeImagePath(value)

  if (!path) {
    return ''
  }

  if (EXTERNAL_URL_PATTERN.test(path)) {
    return path
  }

  if (path.startsWith('./')) {
    path = path.slice(2)
  }

  if (path.startsWith('/public/')) {
    return path.slice('/public'.length)
  }

  if (path.startsWith('public/')) {
    return `/${path.slice('public/'.length)}`
  }

  if (path.startsWith('/')) {
    return path
  }

  if (path.startsWith('img/')) {
    return `/${path}`
  }

  const normalizedBase = `/${String(defaultDirectory)
    .trim()
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')}`

  return `${normalizedBase}/${path.replace(/^\/+/, '')}`
}

export function resolveImageAssetUrl(value, options) {
  const normalizedPath = normalizeImageAssetPath(value, options)

  if (!normalizedPath || EXTERNAL_URL_PATTERN.test(normalizedPath)) {
    return normalizedPath
  }

  return new URL(normalizedPath, `${apiOrigin}/`).toString()
}

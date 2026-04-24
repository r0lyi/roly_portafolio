import axios from 'axios'

export function getApiErrorMessage(error, fallbackMessage) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.detail ?? fallbackMessage
  }

  return fallbackMessage
}

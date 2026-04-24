import { apiClient } from './client.js'

export async function createContactMessage(payload) {
  const { data } = await apiClient.post('/contact-messages/', payload)
  return data
}

export async function getContactMessages() {
  const { data } = await apiClient.get('/contact-messages/')
  return data
}

export async function updateContactMessage(messageId, payload) {
  const { data } = await apiClient.patch(`/contact-messages/${messageId}`, payload)
  return data
}

export async function deleteContactMessage(messageId) {
  await apiClient.delete(`/contact-messages/${messageId}`)
}

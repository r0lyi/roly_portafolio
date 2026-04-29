import { apiClient } from './client.js'

export async function getUsers() {
  const { data } = await apiClient.get('/users/')
  return data
}

export async function updateUser(userId, payload) {
  const { data } = await apiClient.patch(`/users/${userId}`, payload)
  return data
}

export async function deleteUser(userId) {
  await apiClient.delete(`/users/${userId}`)
}

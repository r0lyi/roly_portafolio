import { apiClient } from './client.js'

export async function getTechnologies() {
  const { data } = await apiClient.get('/technologies/')
  return data
}

export async function createTechnology(payload) {
  const { data } = await apiClient.post('/technologies/', payload)
  return data
}

export async function updateTechnology(technologyId, payload) {
  const { data } = await apiClient.patch(`/technologies/${technologyId}`, payload)
  return data
}

export async function deleteTechnology(technologyId) {
  await apiClient.delete(`/technologies/${technologyId}`)
}

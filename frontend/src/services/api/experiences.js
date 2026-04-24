import { apiClient } from './client.js'

export async function getExperiences() {
  const { data } = await apiClient.get('/experiences/')
  return data
}

export async function createExperience(payload) {
  const { data } = await apiClient.post('/experiences/', payload)
  return data
}

export async function updateExperience(experienceId, payload) {
  const { data } = await apiClient.patch(`/experiences/${experienceId}`, payload)
  return data
}

export async function deleteExperience(experienceId) {
  await apiClient.delete(`/experiences/${experienceId}`)
}

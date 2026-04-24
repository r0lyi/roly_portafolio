import { apiClient } from './client.js'

export async function getExperiences() {
  const { data } = await apiClient.get('/experiences/')
  return data
}

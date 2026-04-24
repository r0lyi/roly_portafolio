import { apiClient } from './client.js'

export async function getProjects() {
  const { data } = await apiClient.get('/projects/')
  return data
}

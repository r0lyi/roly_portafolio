import { apiClient } from './client.js'

export async function getProjects() {
  const { data } = await apiClient.get('/projects/')
  return data
}

export async function createProject(payload) {
  const { data } = await apiClient.post('/projects/', payload)
  return data
}

export async function updateProject(projectId, payload) {
  const { data } = await apiClient.patch(`/projects/${projectId}`, payload)
  return data
}

export async function deleteProject(projectId) {
  await apiClient.delete(`/projects/${projectId}`)
}

export async function getProjectImages(projectId) {
  const { data } = await apiClient.get(`/projects/${projectId}/images`)
  return data
}

export async function createProjectImage(projectId, payload) {
  const { data } = await apiClient.post(
    `/projects/${projectId}/images`,
    buildProjectImageFormData(payload),
  )
  return data
}

export async function updateProjectImage(projectId, imageId, payload) {
  const { data } = await apiClient.patch(
    `/projects/${projectId}/images/${imageId}`,
    buildProjectImageFormData(payload),
  )
  return data
}

export async function deleteProjectImage(projectId, imageId) {
  await apiClient.delete(`/projects/${projectId}/images/${imageId}`)
}

function buildProjectImageFormData(payload) {
  const formData = new FormData()

  if (payload.position !== undefined && payload.position !== null) {
    formData.append('position', String(payload.position))
  }

  if (payload.image_url !== undefined && payload.image_url !== null) {
    formData.append('image_url', payload.image_url)
  }

  if (payload.image instanceof File) {
    formData.append('image', payload.image)
  }

  return formData
}

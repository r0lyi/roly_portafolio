import { apiClient } from './client.js'

export async function getTechnologies() {
  const { data } = await apiClient.get('/technologies/')
  return data
}

export async function createTechnology(payload) {
  const { data } = await apiClient.post(
    '/technologies/',
    buildTechnologyFormData(payload),
  )
  return data
}

export async function updateTechnology(technologyId, payload) {
  const { data } = await apiClient.patch(
    `/technologies/${technologyId}`,
    buildTechnologyFormData(payload),
  )
  return data
}

export async function deleteTechnology(technologyId) {
  await apiClient.delete(`/technologies/${technologyId}`)
}

function buildTechnologyFormData(payload) {
  const formData = new FormData()

  formData.append('name', payload.name)
  formData.append('group', payload.group ?? '')
  formData.append(
    'order',
    payload.order === undefined || payload.order === null
      ? ''
      : String(payload.order),
  )
  formData.append('img_url', payload.img_url ?? '')

  if (payload.remove_image) {
    formData.append('remove_image', 'true')
  }

  if (payload.image instanceof File) {
    formData.append('image', payload.image)
  }

  return formData
}

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'medium',
})

const dateTimeFormatter = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function formatAdminDate(value) {
  if (!value) {
    return 'Sin fecha'
  }

  return dateFormatter.format(new Date(value))
}

export function formatAdminDateTime(value) {
  if (!value) {
    return 'Sin fecha'
  }

  return dateTimeFormatter.format(new Date(value))
}

export function createExcerpt(value, maxLength = 120) {
  if (!value) {
    return 'Sin contenido.'
  }

  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength).trim()}...`
}

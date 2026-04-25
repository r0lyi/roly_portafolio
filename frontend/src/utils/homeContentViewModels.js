const MONTH_YEAR_FORMATTER = new Intl.DateTimeFormat('es-ES', {
  month: 'short',
  year: 'numeric',
})

function normalizeText(value) {
  return String(value ?? '').trim()
}

function normalizeCollection(items) {
  return Array.isArray(items) ? items : []
}

function normalizeOrder(value) {
  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) ? parsedValue : Number.MAX_SAFE_INTEGER
}

function parseDate(value) {
  if (!value) {
    return null
  }

  const parsedDate = new Date(value)
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

function formatMonthYear(value) {
  const parsedDate = parseDate(value)
  return parsedDate ? MONTH_YEAR_FORMATTER.format(parsedDate) : ''
}

function createExperienceDateLabel(startDate, endDate) {
  const formattedStartDate = formatMonthYear(startDate)
  const formattedEndDate = formatMonthYear(endDate)

  if (formattedStartDate && formattedEndDate) {
    return `${formattedStartDate} - ${formattedEndDate}`
  }

  if (formattedStartDate) {
    return `${formattedStartDate} - Actualidad`
  }

  if (formattedEndDate) {
    return `Hasta ${formattedEndDate}`
  }

  return 'Sin fechas'
}

function createProjectLinks(project) {
  const links = []
  const demoUrl = normalizeText(project.demo_url)
  const repoUrl = normalizeText(project.repo_url)

  if (demoUrl) {
    links.push({
      label: 'Ver demo',
      href: demoUrl,
      tone: 'primary',
    })
  }

  if (repoUrl) {
    links.push({
      label: 'Ver repositorio',
      href: repoUrl,
      tone: links.length === 0 ? 'primary' : 'secondary',
    })
  }

  return links
}

function createMonogram(name) {
  const normalizedName = normalizeText(name)
  const fragments = normalizedName
    .split(/[\s/+&.,_-]+/)
    .map((fragment) => fragment.replace(/[^a-z0-9]/gi, ''))
    .filter(Boolean)

  if (fragments.length >= 2) {
    return `${fragments[0][0]}${fragments[1][0]}`.toUpperCase()
  }

  if (fragments.length === 1) {
    return fragments[0].slice(0, 2).toUpperCase()
  }

  return normalizedName.slice(0, 2).toUpperCase() || 'ST'
}

export function mapProjectsToViewModels(items) {
  return normalizeCollection(items).map((project, index) => {
    const title = normalizeText(project.title) || `Proyecto ${index + 1}`
    const description = normalizeText(project.description)
    const stack = normalizeCollection(project.technologies)
      .map((technology) => normalizeText(technology.name))
      .filter(Boolean)
    const primaryImage = normalizeCollection(project.images).find((image) =>
      normalizeText(image.image_url),
    )
    const links = createProjectLinks(project)

    return {
      id: project.id ?? `${title}-${index}`,
      title,
      description:
        description || 'Este proyecto todavia no tiene una descripcion publica.',
      imageUrl: primaryImage?.image_url ?? '',
      stack,
      links,
      statusLabel: links.length === 0 ? 'Proximamente' : '',
      createdAtLabel: formatMonthYear(project.created_at),
    }
  })
}

export function mapExperiencesToViewModels(items) {
  return normalizeCollection(items).map((experience, index) => {
    const title = normalizeText(experience.title) || `Experiencia ${index + 1}`
    const company = normalizeText(experience.company) || 'Experiencia'
    const description = normalizeText(experience.description)

    return {
      id: experience.id ?? `${title}-${index}`,
      title,
      company,
      description:
        description ||
        'Descripcion pendiente. Este bloque esta listo para mostrar mas contexto en cuanto exista contenido.',
      dateLabel: createExperienceDateLabel(
        experience.start_date,
        experience.end_date,
      ),
    }
  })
}

export function mapTechnologiesToViewModels(items) {
  const groups = new Map()

  normalizeCollection(items)
    .map((technology, index) => ({
      id: technology.id ?? index,
      name: normalizeText(technology.name) || `Stack ${index + 1}`,
      groupLabel: normalizeText(technology.group) || 'General',
      imgUrl: normalizeText(technology.img_url),
      order: normalizeOrder(technology.order),
      index,
    }))
    .sort((leftItem, rightItem) => {
      if (leftItem.order !== rightItem.order) {
        return leftItem.order - rightItem.order
      }

      return leftItem.name.localeCompare(rightItem.name, 'es')
    })
    .forEach((technology) => {
      const currentGroup = groups.get(technology.groupLabel) ?? {
        groupLabel: technology.groupLabel,
        sortOrder: technology.order,
        items: [],
      }

      currentGroup.sortOrder = Math.min(currentGroup.sortOrder, technology.order)
      currentGroup.items.push({
        id: technology.id ?? `${technology.name}-${technology.index}`,
        name: technology.name,
        imgUrl: technology.imgUrl,
        monogram: createMonogram(technology.name),
      })

      groups.set(technology.groupLabel, currentGroup)
    })

  return Array.from(groups.values())
    .sort((leftGroup, rightGroup) => {
      if (leftGroup.sortOrder !== rightGroup.sortOrder) {
        return leftGroup.sortOrder - rightGroup.sortOrder
      }

      return leftGroup.groupLabel.localeCompare(rightGroup.groupLabel, 'es')
    })
    .map(({ groupLabel, items: itemsInGroup }) => ({
      groupLabel,
      items: itemsInGroup,
    }))
}

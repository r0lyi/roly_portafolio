import { useCallback, useEffect, useRef, useState } from 'react'
import { getExperiences } from '../services/api/experiences.js'
import { getProjects } from '../services/api/projects.js'
import { getTechnologies } from '../services/api/technologies.js'
import { getApiErrorMessage } from '../utils/getApiErrorMessage.js'
import {
  mapExperiencesToViewModels,
  mapProjectsToViewModels,
  mapTechnologiesToViewModels,
} from '../utils/homeContentViewModels.js'

function createInitialResourceState() {
  return {
    isLoading: true,
    data: [],
    isEmpty: false,
    error: '',
  }
}

function useHomeContent() {
  const [projectsState, setProjectsState] = useState(createInitialResourceState)
  const [experiencesState, setExperiencesState] = useState(
    createInitialResourceState,
  )
  const [technologiesState, setTechnologiesState] = useState(
    createInitialResourceState,
  )
  const requestIdsRef = useRef({
    projects: 0,
    experiences: 0,
    technologies: 0,
  })
  const isMountedRef = useRef(true)

  const loadResource = useCallback(async function loadResource({
    key,
    setState,
    fetcher,
    mapper,
    fallbackMessage,
  }) {
    const requestId = requestIdsRef.current[key] + 1
    requestIdsRef.current[key] = requestId

    setState(createInitialResourceState())

    try {
      const items = await fetcher()

      if (!isMountedRef.current || requestIdsRef.current[key] !== requestId) {
        return
      }

      const mappedItems = mapper(items)

      setState({
        isLoading: false,
        data: mappedItems,
        isEmpty: mappedItems.length === 0,
        error: '',
      })
    } catch (error) {
      if (!isMountedRef.current || requestIdsRef.current[key] !== requestId) {
        return
      }

      setState({
        isLoading: false,
        data: [],
        isEmpty: true,
        error: getApiErrorMessage(error, fallbackMessage),
      })
    }
  }, [])

  const loadProjects = useCallback(async function loadProjects() {
    await loadResource({
      key: 'projects',
      setState: setProjectsState,
      fetcher: getProjects,
      mapper: mapProjectsToViewModels,
      fallbackMessage: 'No se pudieron cargar los proyectos.',
    })
  }, [loadResource])

  const loadExperiences = useCallback(async function loadExperiences() {
    await loadResource({
      key: 'experiences',
      setState: setExperiencesState,
      fetcher: getExperiences,
      mapper: mapExperiencesToViewModels,
      fallbackMessage: 'No se pudieron cargar las experiencias.',
    })
  }, [loadResource])

  const loadTechnologies = useCallback(async function loadTechnologies() {
    await loadResource({
      key: 'technologies',
      setState: setTechnologiesState,
      fetcher: getTechnologies,
      mapper: mapTechnologiesToViewModels,
      fallbackMessage: 'No se pudieron cargar las tecnologias.',
    })
  }, [loadResource])

  useEffect(() => {
    isMountedRef.current = true

    loadProjects()
    loadExperiences()
    loadTechnologies()

    return () => {
      isMountedRef.current = false
    }
  }, [loadExperiences, loadProjects, loadTechnologies])

  return {
    projectsState: {
      ...projectsState,
      retry: loadProjects,
    },
    experiencesState: {
      ...experiencesState,
      retry: loadExperiences,
    },
    technologiesState: {
      ...technologiesState,
      retry: loadTechnologies,
    },
  }
}

export default useHomeContent

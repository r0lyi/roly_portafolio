import { useEffect, useRef, useState } from 'react'
import AdminSectionHeader from './AdminSectionHeader.jsx'
import AdminStatusBanner from './AdminStatusBanner.jsx'
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from '../../services/api/projects.js'
import { getTechnologies } from '../../services/api/technologies.js'
import {
  createExcerpt,
  formatAdminDateTime,
} from '../../utils/formatAdminValue.js'
import { getApiErrorMessage } from '../../utils/getApiErrorMessage.js'
import {
  adminChipGridClass,
  adminChipOptionClass,
  adminEmptyStateClass,
  adminFieldsetClass,
  adminFieldsetHeaderClass,
  adminFormActionsClass,
  adminFormClass,
  adminImageEditorListClass,
  adminImageEditorRowClass,
  adminInlineDangerButtonClass,
  adminInputGridTwoClass,
  adminLinkButtonClass,
  adminModuleClass,
  adminPanelClass,
  adminPanelHeadingClass,
  adminPanelHeadingMetaClass,
  adminRecordCardClass,
  adminRecordListClass,
  adminRecordMainClass,
  adminRecordMetaClass,
  adminRecordSummaryClass,
  adminResourceGridClass,
  dangerButtonClass,
  formFieldClass,
  formLabelClass,
  primaryButtonClass,
  secondaryButtonClass,
  textInputClass,
  textareaClass,
} from '../../styles/tailwindClasses.js'

const initialFormData = {
  title: '',
  description: '',
  demo_url: '',
  repo_url: '',
  technology_ids: [],
  images: [],
}

function createClientId() {
  return `image-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function createImageRow(image = {}) {
  return {
    clientId: image.id ? `image-${image.id}` : createClientId(),
    id: image.id ?? null,
    image_url: image.image_url ?? '',
    position:
      image.position === null || image.position === undefined
        ? '0'
        : String(image.position),
  }
}

function mapProjectToForm(project) {
  return {
    title: project.title ?? '',
    description: project.description ?? '',
    demo_url: project.demo_url ?? '',
    repo_url: project.repo_url ?? '',
    technology_ids: project.technologies.map((technology) => technology.id),
    images: project.images.map((image) => createImageRow(image)),
  }
}

function buildProjectPayload(formData) {
  return {
    title: formData.title.trim(),
    description: formData.description.trim() || null,
    demo_url: formData.demo_url.trim() || null,
    repo_url: formData.repo_url.trim() || null,
    technology_ids: formData.technology_ids,
    images: formData.images
      .filter((image) => image.image_url.trim())
      .map((image, index) => ({
        image_url: image.image_url.trim(),
        position:
          image.position === '' || Number.isNaN(Number(image.position))
            ? index
            : Number(image.position),
      })),
  }
}

function AdminProjectsManager({ onDataChange }) {
  const [projects, setProjects] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const loadProjectsDataRef = useRef(null)
  const [viewState, setViewState] = useState({
    isLoading: true,
    error: '',
    success: '',
  })

  async function loadProjectsData(nextSelectedId) {
    setViewState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: '',
    }))

    try {
      const [projectItems, technologyItems] = await Promise.all([
        getProjects(),
        getTechnologies(),
      ])

      setProjects(projectItems)
      setTechnologies(technologyItems)
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
      }))

      if (nextSelectedId) {
        const project = projectItems.find((item) => item.id === nextSelectedId)

        if (project) {
          startEditing(project)
        }
      }
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
        error: getApiErrorMessage(error, 'No se pudieron cargar los proyectos.'),
      }))
    }
  }

  loadProjectsDataRef.current = loadProjectsData

  useEffect(() => {
    loadProjectsDataRef.current?.()
  }, [])

  function handleCreateNew() {
    setSelectedProjectId(null)
    setFormData(initialFormData)
    setViewState((currentState) => ({
      ...currentState,
      error: '',
      success: '',
    }))
  }

  function startEditing(project) {
    setSelectedProjectId(project.id)
    setFormData(mapProjectToForm(project))
    setViewState((currentState) => ({
      ...currentState,
      error: '',
      success: '',
    }))
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function toggleTechnology(technologyId) {
    setFormData((currentData) => ({
      ...currentData,
      technology_ids: currentData.technology_ids.includes(technologyId)
        ? currentData.technology_ids.filter((item) => item !== technologyId)
        : [...currentData.technology_ids, technologyId],
    }))
  }

  function addImageRow() {
    setFormData((currentData) => ({
      ...currentData,
      images: [...currentData.images, createImageRow()],
    }))
  }

  function updateImageRow(clientId, field, value) {
    setFormData((currentData) => ({
      ...currentData,
      images: currentData.images.map((image) =>
        image.clientId === clientId
          ? {
              ...image,
              [field]: value,
            }
          : image,
      ),
    }))
  }

  function removeImageRow(clientId) {
    setFormData((currentData) => ({
      ...currentData,
      images: currentData.images.filter((image) => image.clientId !== clientId),
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formData.title.trim()) {
      setViewState((currentState) => ({
        ...currentState,
        error: 'El titulo del proyecto es obligatorio.',
        success: '',
      }))
      return
    }

    try {
      const payload = buildProjectPayload(formData)
      const savedProject = selectedProjectId
        ? await updateProject(selectedProjectId, payload)
        : await createProject(payload)

      await loadProjectsData(savedProject.id)
      setViewState((currentState) => ({
        ...currentState,
        success: selectedProjectId
          ? 'Proyecto actualizado correctamente.'
          : 'Proyecto creado correctamente.',
      }))
      onDataChange()
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        error: getApiErrorMessage(error, 'No se pudo guardar el proyecto.'),
        success: '',
      }))
    }
  }

  async function handleDelete() {
    if (!selectedProjectId) {
      return
    }

    const confirmed = window.confirm(
      'Se eliminara el proyecto seleccionado junto con sus relaciones e imagenes. Esta accion no se puede deshacer.',
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteProject(selectedProjectId)
      handleCreateNew()
      await loadProjectsData()
      setViewState((currentState) => ({
        ...currentState,
        success: 'Proyecto eliminado correctamente.',
      }))
      onDataChange()
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        error: getApiErrorMessage(error, 'No se pudo eliminar el proyecto.'),
        success: '',
      }))
    }
  }

  return (
    <section className={adminModuleClass}>
      <AdminSectionHeader
        eyebrow="CRUD de proyectos"
        title="Gestion central de proyectos, tecnologias e imagenes."
        description="Cada proyecto puede editar su contenido, enlaces, tecnologias asociadas e imagenes embebidas usando la API real del backend."
        actions={
          <button
            type="button"
            className={secondaryButtonClass}
            onClick={handleCreateNew}
          >
            Nuevo proyecto
          </button>
        }
      />

      <AdminStatusBanner type="error" message={viewState.error} />
      <AdminStatusBanner type="success" message={viewState.success} />

      <div className={adminResourceGridClass}>
        <div className={adminPanelClass}>
          <div className={adminPanelHeadingClass}>
            <h3>Registros</h3>
            <span className={adminPanelHeadingMetaClass}>
              {viewState.isLoading ? 'Cargando...' : projects.length}
            </span>
          </div>

          {projects.length === 0 && !viewState.isLoading ? (
            <div className={adminEmptyStateClass}>
              <p className="m-0">No hay proyectos creados todavia.</p>
            </div>
          ) : (
            <div className={adminRecordListClass}>
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className={adminRecordCardClass(selectedProjectId === project.id)}
                  onClick={() => startEditing(project)}
                >
                  <div className={adminRecordMainClass}>
                    <strong>{project.title}</strong>
                    <p className={adminRecordSummaryClass}>
                      {createExcerpt(project.description, 80)}
                    </p>
                  </div>
                  <div className={adminRecordMetaClass}>
                    <span>
                      Tecnologias: {project.technologies.length} · Imagenes:{' '}
                      {project.images.length}
                    </span>
                    <span>Creado: {formatAdminDateTime(project.created_at)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={adminPanelClass}>
          <div className={adminPanelHeadingClass}>
            <h3>{selectedProjectId ? 'Editar proyecto' : 'Nuevo proyecto'}</h3>
            {selectedProjectId ? (
              <span className={adminPanelHeadingMetaClass}>ID #{selectedProjectId}</span>
            ) : null}
          </div>

          <form className={adminFormClass} onSubmit={handleSubmit}>
            <div className={adminInputGridTwoClass}>
              <label className={formFieldClass} htmlFor="project-title">
                <span className={formLabelClass}>Titulo</span>
                <input
                  id="project-title"
                  className={textInputClass}
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Nombre del proyecto"
                  required
                />
              </label>

              <label className={formFieldClass} htmlFor="project-demo-url">
                <span className={formLabelClass}>Demo URL</span>
                <input
                  id="project-demo-url"
                  className={textInputClass}
                  name="demo_url"
                  value={formData.demo_url}
                  onChange={handleChange}
                  placeholder="https://demo..."
                />
              </label>
            </div>

            <label className={formFieldClass} htmlFor="project-repo-url">
              <span className={formLabelClass}>Repositorio</span>
              <input
                id="project-repo-url"
                className={textInputClass}
                name="repo_url"
                value={formData.repo_url}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </label>

            <label className={formFieldClass} htmlFor="project-description">
              <span className={formLabelClass}>Descripcion</span>
              <textarea
                id="project-description"
                className={textareaClass}
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Objetivo, stack, resultados..."
              />
            </label>

            <div className={adminFieldsetClass}>
              <div className={adminFieldsetHeaderClass}>
                <h3>Tecnologias asociadas</h3>
                <span className={adminPanelHeadingMetaClass}>
                  {formData.technology_ids.length} seleccionadas
                </span>
              </div>

              {technologies.length === 0 ? (
                <div className={adminEmptyStateClass}>
                  <p className="m-0">
                    Primero crea tecnologias en su modulo para poder asociarlas.
                  </p>
                </div>
              ) : (
                <div className={adminChipGridClass}>
                  {technologies.map((technology) => (
                    <label
                      key={technology.id}
                      className={adminChipOptionClass(
                        formData.technology_ids.includes(technology.id),
                      )}
                    >
                      <input
                        type="checkbox"
                        className="pointer-events-none absolute inset-0 opacity-0"
                        checked={formData.technology_ids.includes(technology.id)}
                        onChange={() => toggleTechnology(technology.id)}
                      />
                      <span>{technology.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className={adminFieldsetClass}>
              <div className={adminFieldsetHeaderClass}>
                <h3>Imagenes embebidas del proyecto</h3>
                <button
                  type="button"
                  className={adminLinkButtonClass}
                  onClick={addImageRow}
                >
                  Agregar fila de imagen
                </button>
              </div>

              {formData.images.length === 0 ? (
                <div className={adminEmptyStateClass}>
                  <p className="m-0">
                    Este proyecto aun no tiene imagenes. Puedes agregarlas aqui o
                    usar el modulo especifico de imagenes.
                  </p>
                </div>
              ) : (
                <div className={adminImageEditorListClass}>
                  {formData.images.map((image) => (
                    <div key={image.clientId} className={adminImageEditorRowClass}>
                      <input
                        className={textInputClass}
                        value={image.image_url}
                        onChange={(event) =>
                          updateImageRow(
                            image.clientId,
                            'image_url',
                            event.target.value,
                          )
                        }
                        placeholder="https://..."
                      />
                      <input
                        className={textInputClass}
                        type="number"
                        value={image.position}
                        onChange={(event) =>
                          updateImageRow(
                            image.clientId,
                            'position',
                            event.target.value,
                          )
                        }
                        placeholder="0"
                      />
                      <button
                        type="button"
                        className={adminInlineDangerButtonClass}
                        onClick={() => removeImageRow(image.clientId)}
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={adminFormActionsClass}>
              <button type="submit" className={primaryButtonClass}>
                {selectedProjectId ? 'Guardar cambios' : 'Crear proyecto'}
              </button>

              {selectedProjectId ? (
                <button
                  type="button"
                  className={dangerButtonClass}
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AdminProjectsManager

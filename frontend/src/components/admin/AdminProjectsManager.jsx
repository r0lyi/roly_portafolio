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
    <section className="admin-module">
      <AdminSectionHeader
        eyebrow="CRUD de proyectos"
        title="Gestion central de proyectos, tecnologias e imagenes."
        description="Cada proyecto puede editar su contenido, enlaces, tecnologias asociadas e imagenes embebidas usando la API real del backend."
        actions={
          <button
            type="button"
            className="secondary-button"
            onClick={handleCreateNew}
          >
            Nuevo proyecto
          </button>
        }
      />

      <AdminStatusBanner type="error" message={viewState.error} />
      <AdminStatusBanner type="success" message={viewState.success} />

      <div className="admin-resource-grid">
        <div className="admin-resource-panel">
          <div className="admin-panel-heading">
            <h3>Registros</h3>
            <span>{viewState.isLoading ? 'Cargando...' : projects.length}</span>
          </div>

          {projects.length === 0 && !viewState.isLoading ? (
            <div className="admin-empty-state">
              <p>No hay proyectos creados todavia.</p>
            </div>
          ) : (
            <div className="admin-record-list">
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className={`admin-record-card${
                    selectedProjectId === project.id
                      ? ' admin-record-card-active'
                      : ''
                  }`}
                  onClick={() => startEditing(project)}
                >
                  <div className="admin-record-main">
                    <strong>{project.title}</strong>
                    <p>{createExcerpt(project.description, 80)}</p>
                  </div>
                  <div className="admin-record-meta">
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

        <div className="admin-resource-panel">
          <div className="admin-panel-heading">
            <h3>{selectedProjectId ? 'Editar proyecto' : 'Nuevo proyecto'}</h3>
            {selectedProjectId ? <span>ID #{selectedProjectId}</span> : null}
          </div>

          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-input-grid admin-input-grid-two">
              <label className="form-field" htmlFor="project-title">
                <span className="form-label">Titulo</span>
                <input
                  id="project-title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Nombre del proyecto"
                  required
                />
              </label>

              <label className="form-field" htmlFor="project-demo-url">
                <span className="form-label">Demo URL</span>
                <input
                  id="project-demo-url"
                  name="demo_url"
                  value={formData.demo_url}
                  onChange={handleChange}
                  placeholder="https://demo..."
                />
              </label>
            </div>

            <label className="form-field" htmlFor="project-repo-url">
              <span className="form-label">Repositorio</span>
              <input
                id="project-repo-url"
                name="repo_url"
                value={formData.repo_url}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </label>

            <label className="form-field" htmlFor="project-description">
              <span className="form-label">Descripcion</span>
              <textarea
                id="project-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Objetivo, stack, resultados..."
              />
            </label>

            <div className="admin-fieldset">
              <div className="admin-fieldset-header">
                <h3>Tecnologias asociadas</h3>
                <span>{formData.technology_ids.length} seleccionadas</span>
              </div>

              {technologies.length === 0 ? (
                <div className="admin-empty-state">
                  <p>
                    Primero crea tecnologias en su modulo para poder asociarlas.
                  </p>
                </div>
              ) : (
                <div className="admin-chip-grid">
                  {technologies.map((technology) => (
                    <label
                      key={technology.id}
                      className={`admin-chip-option${
                        formData.technology_ids.includes(technology.id)
                          ? ' admin-chip-option-active'
                          : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.technology_ids.includes(technology.id)}
                        onChange={() => toggleTechnology(technology.id)}
                      />
                      <span>{technology.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="admin-fieldset">
              <div className="admin-fieldset-header">
                <h3>Imagenes embebidas del proyecto</h3>
                <button
                  type="button"
                  className="admin-link-button"
                  onClick={addImageRow}
                >
                  Agregar fila de imagen
                </button>
              </div>

              {formData.images.length === 0 ? (
                <div className="admin-empty-state">
                  <p>
                    Este proyecto aun no tiene imagenes. Puedes agregarlas aqui o
                    usar el modulo especifico de imagenes.
                  </p>
                </div>
              ) : (
                <div className="admin-image-editor-list">
                  {formData.images.map((image) => (
                    <div key={image.clientId} className="admin-image-editor-row">
                      <input
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
                        className="auth-link auth-link-danger admin-inline-danger"
                        onClick={() => removeImageRow(image.clientId)}
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="primary-button">
                {selectedProjectId ? 'Guardar cambios' : 'Crear proyecto'}
              </button>

              {selectedProjectId ? (
                <button
                  type="button"
                  className="auth-link auth-link-danger"
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

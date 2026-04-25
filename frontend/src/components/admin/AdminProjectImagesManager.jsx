import { useEffect, useRef, useState } from 'react'
import AdminSectionHeader from './AdminSectionHeader.jsx'
import AdminStatusBanner from './AdminStatusBanner.jsx'
import {
  createProjectImage,
  deleteProjectImage,
  getProjectImages,
  getProjects,
  updateProjectImage,
} from '../../services/api/projects.js'
import { createExcerpt } from '../../utils/formatAdminValue.js'
import { getApiErrorMessage } from '../../utils/getApiErrorMessage.js'
import {
  adminEmptyStateClass,
  adminFormActionsClass,
  adminFormClass,
  adminImagePreviewClass,
  adminModuleClass,
  adminPanelClass,
  adminPanelHeadingClass,
  adminPanelHeadingMetaClass,
  adminProjectSwitchClass,
  adminProjectSwitcherClass,
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
} from '../../styles/tailwindClasses.js'

const initialFormData = {
  image_url: '',
  position: '0',
}

function mapImageToForm(image) {
  return {
    image_url: image.image_url ?? '',
    position:
      image.position === null || image.position === undefined
        ? '0'
        : String(image.position),
  }
}

function AdminProjectImagesManager({ onDataChange }) {
  const [projects, setProjects] = useState([])
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [images, setImages] = useState([])
  const [selectedImageId, setSelectedImageId] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const loadProjectsRef = useRef(null)
  const [viewState, setViewState] = useState({
    isLoading: true,
    error: '',
    success: '',
  })

  async function loadImages(projectId, nextSelectedImageId) {
    try {
      const imageItems = await getProjectImages(projectId)
      setImages(imageItems)
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
      }))

      if (nextSelectedImageId) {
        const image = imageItems.find((item) => item.id === nextSelectedImageId)

        if (image) {
          startEditing(image)
        }
      }
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
        error: getApiErrorMessage(
          error,
          'No se pudieron cargar las imagenes del proyecto.',
        ),
      }))
    }
  }

  async function loadProjects(preferredProjectId) {
    setViewState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: '',
    }))

    try {
      const projectItems = await getProjects()
      setProjects(projectItems)

      const nextProjectId =
        preferredProjectId ??
        selectedProjectId ??
        projectItems[0]?.id ??
        null

      setSelectedProjectId(nextProjectId)

      if (nextProjectId) {
        await loadImages(nextProjectId)
      } else {
        setImages([])
        setViewState((currentState) => ({
          ...currentState,
          isLoading: false,
        }))
      }
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
        error: getApiErrorMessage(
          error,
          'No se pudieron cargar los proyectos para gestionar imagenes.',
        ),
      }))
    }
  }

  loadProjectsRef.current = loadProjects

  useEffect(() => {
    loadProjectsRef.current?.()
  }, [])

  function handleCreateNew() {
    setSelectedImageId(null)
    setFormData(initialFormData)
    setViewState((currentState) => ({
      ...currentState,
      error: '',
      success: '',
    }))
  }

  function startEditing(image) {
    setSelectedImageId(image.id)
    setFormData(mapImageToForm(image))
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

  async function handleProjectSelection(projectId) {
    setSelectedProjectId(projectId)
    setSelectedImageId(null)
    setFormData(initialFormData)
    setViewState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: '',
      success: '',
    }))
    await loadImages(projectId)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!selectedProjectId) {
      setViewState((currentState) => ({
        ...currentState,
        error: 'Primero debes seleccionar un proyecto.',
        success: '',
      }))
      return
    }

    if (!formData.image_url.trim()) {
      setViewState((currentState) => ({
        ...currentState,
        error: 'La URL de la imagen es obligatoria.',
        success: '',
      }))
      return
    }

    try {
      const payload = {
        image_url: formData.image_url.trim(),
        position:
          formData.position === '' || Number.isNaN(Number(formData.position))
            ? 0
            : Number(formData.position),
      }

      const savedImage = selectedImageId
        ? await updateProjectImage(selectedProjectId, selectedImageId, payload)
        : await createProjectImage(selectedProjectId, payload)

      await loadImages(selectedProjectId, savedImage.id)
      setViewState((currentState) => ({
        ...currentState,
        success: selectedImageId
          ? 'Imagen actualizada correctamente.'
          : 'Imagen creada correctamente.',
      }))
      onDataChange()
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        error: getApiErrorMessage(error, 'No se pudo guardar la imagen.'),
        success: '',
      }))
    }
  }

  async function handleDelete() {
    if (!selectedProjectId || !selectedImageId) {
      return
    }

    const confirmed = window.confirm(
      'Se eliminara la imagen seleccionada del proyecto. Esta accion no se puede deshacer.',
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteProjectImage(selectedProjectId, selectedImageId)
      handleCreateNew()
      await loadImages(selectedProjectId)
      setViewState((currentState) => ({
        ...currentState,
        success: 'Imagen eliminada correctamente.',
      }))
      onDataChange()
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        error: getApiErrorMessage(error, 'No se pudo eliminar la imagen.'),
        success: '',
      }))
    }
  }

  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? null

  return (
    <section className={adminModuleClass}>
      <AdminSectionHeader
        eyebrow="Tabla project_image"
        title="Gestion puntual de imagenes ligadas a proyectos."
        description="Usa este modulo cuando necesites administrar la tabla de imagenes sin tocar el resto del proyecto."
      />

      <AdminStatusBanner type="error" message={viewState.error} />
      <AdminStatusBanner type="success" message={viewState.success} />

      {projects.length === 0 && !viewState.isLoading ? (
        <div className={`${adminEmptyStateClass} mt-3`}>
          <p className="m-0">
            Todavia no existen proyectos. Crea uno en el modulo de proyectos
            antes de gestionar sus imagenes.
          </p>
        </div>
      ) : null}

      {projects.length > 0 ? (
        <div className={adminProjectSwitcherClass}>
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={adminProjectSwitchClass(selectedProjectId === project.id)}
              onClick={() => handleProjectSelection(project.id)}
            >
              {project.title}
            </button>
          ))}
        </div>
      ) : null}

      {selectedProject ? (
        <div className={adminResourceGridClass}>
          <div className={adminPanelClass}>
            <div className={adminPanelHeadingClass}>
              <h3>Imagenes de {selectedProject.title}</h3>
              <span className={adminPanelHeadingMetaClass}>
                {viewState.isLoading ? 'Cargando...' : images.length}
              </span>
            </div>

            {images.length === 0 && !viewState.isLoading ? (
              <div className={adminEmptyStateClass}>
                <p className="m-0">Este proyecto todavia no tiene imagenes registradas.</p>
              </div>
            ) : (
              <div className={adminRecordListClass}>
                {images.map((image) => (
                  <button
                    key={image.id}
                    type="button"
                    className={adminRecordCardClass(selectedImageId === image.id)}
                    onClick={() => startEditing(image)}
                  >
                    <div className={adminImagePreviewClass}>
                      <img src={image.image_url} alt="" />
                    </div>
                    <div className={adminRecordMainClass}>
                      <strong>Imagen #{image.id}</strong>
                      <p className={adminRecordSummaryClass}>
                        {createExcerpt(image.image_url, 60)}
                      </p>
                    </div>
                    <div className={adminRecordMetaClass}>
                      <span>Posicion: {image.position}</span>
                    </div>
                  </button>
                ))}
              </div>
          )}
        </div>

          <div className={adminPanelClass}>
            <div className={adminPanelHeadingClass}>
              <h3>{selectedImageId ? 'Editar imagen' : 'Nueva imagen'}</h3>
              {selectedImageId ? (
                <span className={adminPanelHeadingMetaClass}>ID #{selectedImageId}</span>
              ) : null}
            </div>

            <form className={adminFormClass} onSubmit={handleSubmit}>
              <label className={formFieldClass} htmlFor="project-image-url">
                <span className={formLabelClass}>URL de imagen</span>
                <input
                  id="project-image-url"
                  className={textInputClass}
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                />
              </label>

              <label className={formFieldClass} htmlFor="project-image-position">
                <span className={formLabelClass}>Posicion</span>
                <input
                  id="project-image-position"
                  className={textInputClass}
                  name="position"
                  type="number"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="0"
                />
              </label>

              <div className={adminFormActionsClass}>
                <button type="submit" className={primaryButtonClass}>
                  {selectedImageId ? 'Guardar cambios' : 'Crear imagen'}
                </button>

                <button
                  type="button"
                  className={secondaryButtonClass}
                  onClick={handleCreateNew}
                >
                  Nueva fila
                </button>

                {selectedImageId ? (
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
      ) : null}
    </section>
  )
}

export default AdminProjectImagesManager

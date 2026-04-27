import { useEffect, useRef, useState } from 'react'
import AdminSectionHeader from './AdminSectionHeader.jsx'
import AdminStatusBanner from './AdminStatusBanner.jsx'
import {
  createTechnology,
  deleteTechnology,
  getTechnologies,
  updateTechnology,
} from '../../services/api/technologies.js'
import { getApiErrorMessage } from '../../utils/getApiErrorMessage.js'
import {
  adminEmptyStateClass,
  adminFormActionsClass,
  adminFormClass,
  adminImagePreviewClass,
  adminInputGridTwoClass,
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
} from '../../styles/tailwindClasses.js'
import {
  normalizeImageAssetPath,
  resolveImageAssetUrl,
} from '../../utils/resolveImageAssetUrl.js'

const initialFormData = {
  name: '',
  img_url: '',
  group: '',
  order: '',
}

const initialImageState = {
  file: null,
  removeCurrentImage: false,
}

function mapTechnologyToForm(technology) {
  return {
    name: technology.name ?? '',
    img_url: normalizeImageAssetPath(technology.img_url ?? ''),
    group: technology.group ?? '',
    order:
      technology.order === null || technology.order === undefined
        ? ''
        : String(technology.order),
  }
}

function buildTechnologyPayload(formData, imageState) {
  const payload = {
    name: formData.name.trim(),
    img_url: normalizeImageAssetPath(formData.img_url) || null,
    group: formData.group.trim() || null,
    order:
      formData.order === '' || Number.isNaN(Number(formData.order))
        ? null
        : Number(formData.order),
  }

  if (imageState.file) {
    payload.image = imageState.file
  }

  if (imageState.removeCurrentImage) {
    payload.remove_image = true
  }

  return payload
}

function AdminTechnologiesManager({ onDataChange }) {
  const [technologies, setTechnologies] = useState([])
  const [selectedTechnologyId, setSelectedTechnologyId] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const [imageState, setImageState] = useState(initialImageState)
  const [selectedImagePreviewUrl, setSelectedImagePreviewUrl] = useState('')
  const loadTechnologiesRef = useRef(null)
  const imageInputRef = useRef(null)
  const [viewState, setViewState] = useState({
    isLoading: true,
    error: '',
    success: '',
  })

  async function loadTechnologies(nextSelectedId) {
    setViewState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: '',
    }))

    try {
      const items = await getTechnologies()
      const sortedItems = [...items].sort((left, right) => {
        const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER
        const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER

        if (leftOrder !== rightOrder) {
          return leftOrder - rightOrder
        }

        return left.name.localeCompare(right.name, 'es')
      })

      setTechnologies(sortedItems)
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
      }))

      if (nextSelectedId) {
        const technology = sortedItems.find((item) => item.id === nextSelectedId)

        if (technology) {
          startEditing(technology)
          return
        }
      }

      if (
        selectedTechnologyId &&
        !sortedItems.some((item) => item.id === selectedTechnologyId)
      ) {
        handleCreateNew()
      }
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
        error: getApiErrorMessage(
          error,
          'No se pudieron cargar las tecnologias.',
        ),
      }))
    }
  }

  loadTechnologiesRef.current = loadTechnologies

  useEffect(() => {
    loadTechnologiesRef.current?.()
  }, [])

  useEffect(() => {
    if (!imageState.file) {
      setSelectedImagePreviewUrl('')
      return undefined
    }

    const nextPreviewUrl = URL.createObjectURL(imageState.file)
    setSelectedImagePreviewUrl(nextPreviewUrl)

    return () => {
      URL.revokeObjectURL(nextPreviewUrl)
    }
  }, [imageState.file])

  function resetImageState() {
    setImageState({ ...initialImageState })

    if (imageInputRef.current) {
      imageInputRef.current.value = ''
    }
  }

  function handleCreateNew() {
    setSelectedTechnologyId(null)
    setFormData(initialFormData)
    resetImageState()
    setViewState((currentState) => ({
      ...currentState,
      error: '',
      success: '',
    }))
  }

  function startEditing(technology) {
    setSelectedTechnologyId(technology.id)
    setFormData(mapTechnologyToForm(technology))
    resetImageState()
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

  function handleImageChange(event) {
    const nextImage = event.target.files?.[0] ?? null

    setImageState({
      file: nextImage,
      removeCurrentImage: false,
    })
  }

  function handleClearSelectedImage() {
    resetImageState()
  }

  function handleRemoveCurrentImage() {
    if (imageInputRef.current) {
      imageInputRef.current.value = ''
    }

    setImageState({
      file: null,
      removeCurrentImage: true,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formData.name.trim()) {
      setViewState((currentState) => ({
        ...currentState,
        error: 'El nombre de la tecnologia es obligatorio.',
        success: '',
      }))
      return
    }

    try {
      const payload = buildTechnologyPayload(formData, imageState)
      const savedTechnology = selectedTechnologyId
        ? await updateTechnology(selectedTechnologyId, payload)
        : await createTechnology(payload)

      await loadTechnologies(savedTechnology.id)
      setViewState((currentState) => ({
        ...currentState,
        success: selectedTechnologyId
          ? 'Tecnologia actualizada correctamente.'
          : 'Tecnologia creada correctamente.',
      }))
      onDataChange()
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        error: getApiErrorMessage(
          error,
          'No se pudo guardar la tecnologia.',
        ),
        success: '',
      }))
    }
  }

  async function handleDelete() {
    if (!selectedTechnologyId) {
      return
    }

    const confirmed = window.confirm(
      'Se eliminara la tecnologia seleccionada. Esta accion no se puede deshacer.',
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteTechnology(selectedTechnologyId)
      handleCreateNew()
      await loadTechnologies()
      setViewState((currentState) => ({
        ...currentState,
        success: 'Tecnologia eliminada correctamente.',
      }))
      onDataChange()
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        error: getApiErrorMessage(
          error,
          'No se pudo eliminar la tecnologia.',
        ),
        success: '',
      }))
    }
  }

  const currentImageUrl =
    formData.img_url && !imageState.removeCurrentImage
      ? resolveImageAssetUrl(formData.img_url)
      : ''
  const previewImageUrl = selectedImagePreviewUrl || currentImageUrl

  return (
    <section className={adminModuleClass}>
      <AdminSectionHeader
        eyebrow="CRUD de tecnologias"
        title="Stack tecnico reutilizable para proyectos."
        description="Administra nombres, logos, grupos y orden de aparicion para relacionarlos despues con cada proyecto."
        actions={
          <button
            type="button"
            className={secondaryButtonClass}
            onClick={handleCreateNew}
          >
            Nueva tecnologia
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
              {viewState.isLoading ? 'Cargando...' : technologies.length}
            </span>
          </div>

          {technologies.length === 0 && !viewState.isLoading ? (
            <div className={adminEmptyStateClass}>
              <p className="m-0">No hay tecnologias creadas todavia.</p>
            </div>
          ) : (
            <div className={adminRecordListClass}>
              {technologies.map((technology) => (
                <button
                  key={technology.id}
                  type="button"
                  className={adminRecordCardClass(
                    selectedTechnologyId === technology.id,
                  )}
                  onClick={() => startEditing(technology)}
                >
                  {technology.img_url ? (
                    <div className={adminImagePreviewClass}>
                      <img
                        className="h-full w-full object-contain p-5"
                        src={resolveImageAssetUrl(technology.img_url)}
                        alt=""
                      />
                    </div>
                  ) : null}
                  <div className={adminRecordMainClass}>
                    <strong>{technology.name}</strong>
                    <p className={adminRecordSummaryClass}>
                      {technology.group || 'Sin grupo'}
                    </p>
                  </div>
                  <div className={adminRecordMetaClass}>
                    <span>Orden: {technology.order ?? 'N/D'}</span>
                    <span>
                      Logo: {technology.img_url ? normalizeImageAssetPath(technology.img_url) : 'Sin logo'}
                    </span>
                    <span>ID #{technology.id}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={adminPanelClass}>
          <div className={adminPanelHeadingClass}>
            <h3>{selectedTechnologyId ? 'Editar tecnologia' : 'Nueva tecnologia'}</h3>
            {selectedTechnologyId ? (
              <span className={adminPanelHeadingMetaClass}>
                ID #{selectedTechnologyId}
              </span>
            ) : null}
          </div>

          <form className={adminFormClass} onSubmit={handleSubmit}>
            <div className={adminInputGridTwoClass}>
              <label className={formFieldClass} htmlFor="technology-name">
                <span className={formLabelClass}>Nombre</span>
                <input
                  id="technology-name"
                  className={textInputClass}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="React, FastAPI, PostgreSQL..."
                  required
                />
              </label>

              <label className={formFieldClass} htmlFor="technology-group">
                <span className={formLabelClass}>Grupo</span>
                <input
                  id="technology-group"
                  className={textInputClass}
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  placeholder="Frontend, Backend, DevOps..."
                />
              </label>
            </div>

            <label className={formFieldClass} htmlFor="technology-image">
              <span className={formLabelClass}>Logo</span>
              <input
                id="technology-image"
                ref={imageInputRef}
                className={textInputClass}
                type="file"
                accept=".svg,.png,.jpg,.jpeg,image/svg+xml,image/png,image/jpeg"
                onChange={handleImageChange}
              />
              <span className="text-xs font-bold uppercase leading-5 tracking-[0.04em] text-[#3c3c3c]">
                Sube un archivo SVG, PNG, JPG o JPEG. Se guardara
                automaticamente en `frontend/public/img/tecnologias`.
              </span>
              {imageState.file ? (
                <span className="text-xs font-bold uppercase leading-5 tracking-[0.04em] text-[#3c3c3c]">
                  Archivo seleccionado: {imageState.file.name}
                </span>
              ) : null}
              {!imageState.file && currentImageUrl ? (
                <span className="text-xs font-bold uppercase leading-5 tracking-[0.04em] text-[#3c3c3c]">
                  Logo actual: {normalizeImageAssetPath(formData.img_url)}
                </span>
              ) : null}
              {imageState.removeCurrentImage ? (
                <span className="text-xs font-bold uppercase leading-5 tracking-[0.04em] text-[#8a1c1c]">
                  El logo actual se eliminara al guardar.
                </span>
              ) : null}
            </label>

            {previewImageUrl ? (
              <div className={adminImagePreviewClass}>
                <img
                  className="h-full w-full object-contain p-5"
                  src={previewImageUrl}
                  alt={`Vista previa del logo de ${formData.name || 'la tecnologia'}`}
                />
              </div>
            ) : null}

            {imageState.removeCurrentImage && formData.img_url ? (
              <div className={adminFormActionsClass}>
                <button
                  type="button"
                  className={secondaryButtonClass}
                  onClick={handleClearSelectedImage}
                >
                  Conservar logo actual
                </button>
              </div>
            ) : null}

            {(imageState.file || currentImageUrl) && !imageState.removeCurrentImage ? (
              <div className={adminFormActionsClass}>
                {imageState.file ? (
                  <button
                    type="button"
                    className={secondaryButtonClass}
                    onClick={handleClearSelectedImage}
                  >
                    Quitar archivo seleccionado
                  </button>
                ) : null}

                {!imageState.file && currentImageUrl ? (
                  <button
                    type="button"
                    className={dangerButtonClass}
                    onClick={handleRemoveCurrentImage}
                  >
                    Eliminar logo actual
                  </button>
                ) : null}
              </div>
            ) : null}

            <label className={formFieldClass} htmlFor="technology-order">
              <span className={formLabelClass}>Orden</span>
              <input
                id="technology-order"
                className={textInputClass}
                name="order"
                type="number"
                value={formData.order}
                onChange={handleChange}
                placeholder="0"
              />
            </label>

            <div className={adminFormActionsClass}>
              <button type="submit" className={primaryButtonClass}>
                {selectedTechnologyId ? 'Guardar cambios' : 'Crear tecnologia'}
              </button>

              {selectedTechnologyId ? (
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

export default AdminTechnologiesManager

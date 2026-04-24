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

const initialFormData = {
  name: '',
  group: '',
  order: '',
}

function mapTechnologyToForm(technology) {
  return {
    name: technology.name ?? '',
    group: technology.group ?? '',
    order:
      technology.order === null || technology.order === undefined
        ? ''
        : String(technology.order),
  }
}

function buildTechnologyPayload(formData) {
  return {
    name: formData.name.trim(),
    group: formData.group.trim() || null,
    order:
      formData.order === '' || Number.isNaN(Number(formData.order))
        ? null
        : Number(formData.order),
  }
}

function AdminTechnologiesManager({ onDataChange }) {
  const [technologies, setTechnologies] = useState([])
  const [selectedTechnologyId, setSelectedTechnologyId] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const loadTechnologiesRef = useRef(null)
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

  function handleCreateNew() {
    setSelectedTechnologyId(null)
    setFormData(initialFormData)
    setViewState((currentState) => ({
      ...currentState,
      error: '',
      success: '',
    }))
  }

  function startEditing(technology) {
    setSelectedTechnologyId(technology.id)
    setFormData(mapTechnologyToForm(technology))
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
      const payload = buildTechnologyPayload(formData)
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

  return (
    <section className="admin-module">
      <AdminSectionHeader
        eyebrow="CRUD de tecnologias"
        title="Stack tecnico reutilizable para proyectos."
        description="Administra nombres, grupos y orden de aparicion para relacionarlos despues con cada proyecto."
        actions={
          <button
            type="button"
            className="secondary-button"
            onClick={handleCreateNew}
          >
            Nueva tecnologia
          </button>
        }
      />

      <AdminStatusBanner type="error" message={viewState.error} />
      <AdminStatusBanner type="success" message={viewState.success} />

      <div className="admin-resource-grid">
        <div className="admin-resource-panel">
          <div className="admin-panel-heading">
            <h3>Registros</h3>
            <span>{viewState.isLoading ? 'Cargando...' : technologies.length}</span>
          </div>

          {technologies.length === 0 && !viewState.isLoading ? (
            <div className="admin-empty-state">
              <p>No hay tecnologias creadas todavia.</p>
            </div>
          ) : (
            <div className="admin-record-list">
              {technologies.map((technology) => (
                <button
                  key={technology.id}
                  type="button"
                  className={`admin-record-card${
                    selectedTechnologyId === technology.id
                      ? ' admin-record-card-active'
                      : ''
                  }`}
                  onClick={() => startEditing(technology)}
                >
                  <div className="admin-record-main">
                    <strong>{technology.name}</strong>
                    <p>{technology.group || 'Sin grupo'}</p>
                  </div>
                  <div className="admin-record-meta">
                    <span>Orden: {technology.order ?? 'N/D'}</span>
                    <span>ID #{technology.id}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="admin-resource-panel">
          <div className="admin-panel-heading">
            <h3>{selectedTechnologyId ? 'Editar tecnologia' : 'Nueva tecnologia'}</h3>
            {selectedTechnologyId ? <span>ID #{selectedTechnologyId}</span> : null}
          </div>

          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-input-grid admin-input-grid-two">
              <label className="form-field" htmlFor="technology-name">
                <span className="form-label">Nombre</span>
                <input
                  id="technology-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="React, FastAPI, PostgreSQL..."
                  required
                />
              </label>

              <label className="form-field" htmlFor="technology-group">
                <span className="form-label">Grupo</span>
                <input
                  id="technology-group"
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  placeholder="Frontend, Backend, DevOps..."
                />
              </label>
            </div>

            <label className="form-field" htmlFor="technology-order">
              <span className="form-label">Orden</span>
              <input
                id="technology-order"
                name="order"
                type="number"
                value={formData.order}
                onChange={handleChange}
                placeholder="0"
              />
            </label>

            <div className="admin-form-actions">
              <button type="submit" className="primary-button">
                {selectedTechnologyId ? 'Guardar cambios' : 'Crear tecnologia'}
              </button>

              {selectedTechnologyId ? (
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

export default AdminTechnologiesManager

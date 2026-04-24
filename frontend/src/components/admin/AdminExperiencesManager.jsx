import { useEffect, useRef, useState } from 'react'
import AdminSectionHeader from './AdminSectionHeader.jsx'
import AdminStatusBanner from './AdminStatusBanner.jsx'
import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from '../../services/api/experiences.js'
import {
  createExcerpt,
  formatAdminDate,
} from '../../utils/formatAdminValue.js'
import { getApiErrorMessage } from '../../utils/getApiErrorMessage.js'

const initialFormData = {
  title: '',
  company: '',
  description: '',
  start_date: '',
  end_date: '',
}

function mapExperienceToForm(experience) {
  return {
    title: experience.title ?? '',
    company: experience.company ?? '',
    description: experience.description ?? '',
    start_date: experience.start_date ?? '',
    end_date: experience.end_date ?? '',
  }
}

function buildExperiencePayload(formData) {
  return {
    title: formData.title.trim(),
    company: formData.company.trim() || null,
    description: formData.description.trim() || null,
    start_date: formData.start_date || null,
    end_date: formData.end_date || null,
  }
}

function AdminExperiencesManager({ onDataChange }) {
  const [experiences, setExperiences] = useState([])
  const [selectedExperienceId, setSelectedExperienceId] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const loadExperiencesRef = useRef(null)
  const [viewState, setViewState] = useState({
    isLoading: true,
    error: '',
    success: '',
  })

  async function loadExperiences(nextSelectedId) {
    setViewState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: '',
    }))

    try {
      const items = await getExperiences()
      setExperiences(items)
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
      }))

      if (nextSelectedId) {
        const experience = items.find((item) => item.id === nextSelectedId)

        if (experience) {
          startEditing(experience)
        }
      }
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
        error: getApiErrorMessage(
          error,
          'No se pudieron cargar las experiencias.',
        ),
      }))
    }
  }

  loadExperiencesRef.current = loadExperiences

  useEffect(() => {
    loadExperiencesRef.current?.()
  }, [])

  function handleCreateNew() {
    setSelectedExperienceId(null)
    setFormData(initialFormData)
    setViewState((currentState) => ({
      ...currentState,
      error: '',
      success: '',
    }))
  }

  function startEditing(experience) {
    setSelectedExperienceId(experience.id)
    setFormData(mapExperienceToForm(experience))
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

    if (!formData.title.trim()) {
      setViewState((currentState) => ({
        ...currentState,
        error: 'El titulo de la experiencia es obligatorio.',
        success: '',
      }))
      return
    }

    try {
      const payload = buildExperiencePayload(formData)
      const savedExperience = selectedExperienceId
        ? await updateExperience(selectedExperienceId, payload)
        : await createExperience(payload)

      await loadExperiences(savedExperience.id)
      setViewState((currentState) => ({
        ...currentState,
        success: selectedExperienceId
          ? 'Experiencia actualizada correctamente.'
          : 'Experiencia creada correctamente.',
      }))
      onDataChange()
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        error: getApiErrorMessage(
          error,
          'No se pudo guardar la experiencia.',
        ),
        success: '',
      }))
    }
  }

  async function handleDelete() {
    if (!selectedExperienceId) {
      return
    }

    const confirmed = window.confirm(
      'Se eliminara la experiencia seleccionada. Esta accion no se puede deshacer.',
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteExperience(selectedExperienceId)
      handleCreateNew()
      await loadExperiences()
      setViewState((currentState) => ({
        ...currentState,
        success: 'Experiencia eliminada correctamente.',
      }))
      onDataChange()
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        error: getApiErrorMessage(
          error,
          'No se pudo eliminar la experiencia.',
        ),
        success: '',
      }))
    }
  }

  return (
    <section className="admin-module">
      <AdminSectionHeader
        eyebrow="CRUD de experiencias"
        title="Gestion profesional de trayectoria y cronologia."
        description="Actualiza empresa, descripcion y periodos para mantener sincronizada la seccion de experiencia con tu portfolio."
        actions={
          <button
            type="button"
            className="secondary-button"
            onClick={handleCreateNew}
          >
            Nueva experiencia
          </button>
        }
      />

      <AdminStatusBanner type="error" message={viewState.error} />
      <AdminStatusBanner type="success" message={viewState.success} />

      <div className="admin-resource-grid">
        <div className="admin-resource-panel">
          <div className="admin-panel-heading">
            <h3>Registros</h3>
            <span>{viewState.isLoading ? 'Cargando...' : experiences.length}</span>
          </div>

          {experiences.length === 0 && !viewState.isLoading ? (
            <div className="admin-empty-state">
              <p>No hay experiencias registradas todavia.</p>
            </div>
          ) : (
            <div className="admin-record-list">
              {experiences.map((experience) => (
                <button
                  key={experience.id}
                  type="button"
                  className={`admin-record-card${
                    selectedExperienceId === experience.id
                      ? ' admin-record-card-active'
                      : ''
                  }`}
                  onClick={() => startEditing(experience)}
                >
                  <div className="admin-record-main">
                    <strong>{experience.title}</strong>
                    <p>{experience.company || 'Sin empresa'}</p>
                  </div>
                  <div className="admin-record-meta">
                    <span>
                      {formatAdminDate(experience.start_date)} -{' '}
                      {experience.end_date
                        ? formatAdminDate(experience.end_date)
                        : 'Actual'}
                    </span>
                    <span>{createExcerpt(experience.description, 70)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="admin-resource-panel">
          <div className="admin-panel-heading">
            <h3>{selectedExperienceId ? 'Editar experiencia' : 'Nueva experiencia'}</h3>
            {selectedExperienceId ? <span>ID #{selectedExperienceId}</span> : null}
          </div>

          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-input-grid admin-input-grid-two">
              <label className="form-field" htmlFor="experience-title">
                <span className="form-label">Titulo</span>
                <input
                  id="experience-title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                  required
                />
              </label>

              <label className="form-field" htmlFor="experience-company">
                <span className="form-label">Empresa</span>
                <input
                  id="experience-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nombre de empresa"
                />
              </label>
            </div>

            <label className="form-field" htmlFor="experience-description">
              <span className="form-label">Descripcion</span>
              <textarea
                id="experience-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Responsabilidades, impacto, stack..."
              />
            </label>

            <div className="admin-input-grid admin-input-grid-two">
              <label className="form-field" htmlFor="experience-start-date">
                <span className="form-label">Fecha de inicio</span>
                <input
                  id="experience-start-date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field" htmlFor="experience-end-date">
                <span className="form-label">Fecha de fin</span>
                <input
                  id="experience-end-date"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="primary-button">
                {selectedExperienceId ? 'Guardar cambios' : 'Crear experiencia'}
              </button>

              {selectedExperienceId ? (
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

export default AdminExperiencesManager

import { useEffect, useRef, useState } from 'react'
import AdminSectionHeader from './AdminSectionHeader.jsx'
import AdminStatusBanner from './AdminStatusBanner.jsx'
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessages,
  updateContactMessage,
} from '../../services/api/contactMessages.js'
import {
  createExcerpt,
  formatAdminDateTime,
} from '../../utils/formatAdminValue.js'
import { getApiErrorMessage } from '../../utils/getApiErrorMessage.js'

const initialFormData = {
  name: '',
  email: '',
  message: '',
  read: false,
}

function mapMessageToForm(message) {
  return {
    name: message.name ?? '',
    email: message.email ?? '',
    message: message.message ?? '',
    read: Boolean(message.read),
  }
}

function sortMessages(messages) {
  return [...messages].sort((left, right) => {
    if (left.read !== right.read) {
      return Number(left.read) - Number(right.read)
    }

    return new Date(right.send_at).getTime() - new Date(left.send_at).getTime()
  })
}

function AdminMessagesManager({ onDataChange }) {
  const [messages, setMessages] = useState([])
  const [selectedMessageId, setSelectedMessageId] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const loadMessagesRef = useRef(null)
  const [viewState, setViewState] = useState({
    isLoading: true,
    error: '',
    success: '',
  })

  async function loadMessages(nextSelectedId) {
    setViewState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: '',
    }))

    try {
      const items = await getContactMessages()
      const sortedItems = sortMessages(items)
      setMessages(sortedItems)
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
      }))

      if (nextSelectedId) {
        const selectedMessage = sortedItems.find(
          (item) => item.id === nextSelectedId,
        )

        if (selectedMessage) {
          startEditing(selectedMessage)
        }
      }
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
        error: getApiErrorMessage(
          error,
          'No se pudieron cargar los mensajes de contacto.',
        ),
      }))
    }
  }

  loadMessagesRef.current = loadMessages

  useEffect(() => {
    loadMessagesRef.current?.()
  }, [])

  function handleCreateNew() {
    setSelectedMessageId(null)
    setFormData(initialFormData)
    setViewState((currentState) => ({
      ...currentState,
      error: '',
      success: '',
    }))
  }

  function startEditing(message) {
    setSelectedMessageId(message.id)
    setFormData(mapMessageToForm(message))
    setViewState((currentState) => ({
      ...currentState,
      error: '',
      success: '',
    }))
  }

  function handleChange(event) {
    const { name, type, checked, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setViewState((currentState) => ({
        ...currentState,
        error: 'Nombre, email y mensaje son obligatorios.',
        success: '',
      }))
      return
    }

    try {
      const basePayload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim(),
      }

      const savedMessage = selectedMessageId
        ? await updateContactMessage(selectedMessageId, {
            ...basePayload,
            read: formData.read,
          })
        : await createContactMessage(basePayload)

      await loadMessages(savedMessage.id)
      setViewState((currentState) => ({
        ...currentState,
        success: selectedMessageId
          ? 'Mensaje actualizado correctamente.'
          : 'Mensaje creado correctamente.',
      }))
      onDataChange()
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        error: getApiErrorMessage(error, 'No se pudo guardar el mensaje.'),
        success: '',
      }))
    }
  }

  async function handleDelete() {
    if (!selectedMessageId) {
      return
    }

    const confirmed = window.confirm(
      'Se eliminara el mensaje seleccionado. Esta accion no se puede deshacer.',
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteContactMessage(selectedMessageId)
      handleCreateNew()
      await loadMessages()
      setViewState((currentState) => ({
        ...currentState,
        success: 'Mensaje eliminado correctamente.',
      }))
      onDataChange()
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        error: getApiErrorMessage(error, 'No se pudo eliminar el mensaje.'),
        success: '',
      }))
    }
  }

  return (
    <section className="admin-module">
      <AdminSectionHeader
        eyebrow="CRUD de mensajes"
        title="Bandeja de contacto conectada a la tabla real."
        description="Consulta, corrige, marca como leidos o elimina mensajes enviados desde el formulario publico."
        actions={
          <button
            type="button"
            className="secondary-button"
            onClick={handleCreateNew}
          >
            Nuevo mensaje
          </button>
        }
      />

      <AdminStatusBanner type="error" message={viewState.error} />
      <AdminStatusBanner type="success" message={viewState.success} />

      <div className="admin-resource-grid">
        <div className="admin-resource-panel">
          <div className="admin-panel-heading">
            <h3>Bandeja</h3>
            <span>{viewState.isLoading ? 'Cargando...' : messages.length}</span>
          </div>

          {messages.length === 0 && !viewState.isLoading ? (
            <div className="admin-empty-state">
              <p>No hay mensajes registrados todavia.</p>
            </div>
          ) : (
            <div className="admin-record-list">
              {messages.map((message) => (
                <button
                  key={message.id}
                  type="button"
                  className={`admin-record-card${
                    selectedMessageId === message.id
                      ? ' admin-record-card-active'
                      : ''
                  }`}
                  onClick={() => startEditing(message)}
                >
                  <div className="admin-record-main">
                    <strong>{message.name}</strong>
                    <p>{message.email}</p>
                  </div>
                  <div className="admin-record-meta">
                    <span>
                      {message.read ? 'Leido' : 'Pendiente'} ·{' '}
                      {formatAdminDateTime(message.send_at)}
                    </span>
                    <span>{createExcerpt(message.message, 80)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="admin-resource-panel">
          <div className="admin-panel-heading">
            <h3>{selectedMessageId ? 'Editar mensaje' : 'Nuevo mensaje'}</h3>
            {selectedMessageId ? <span>ID #{selectedMessageId}</span> : null}
          </div>

          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-input-grid admin-input-grid-two">
              <label className="form-field" htmlFor="message-name">
                <span className="form-label">Nombre</span>
                <input
                  id="message-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre del remitente"
                  required
                />
              </label>

              <label className="form-field" htmlFor="message-email">
                <span className="form-label">Email</span>
                <input
                  id="message-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="correo@dominio.com"
                  required
                />
              </label>
            </div>

            <label className="form-field" htmlFor="message-body">
              <span className="form-label">Mensaje</span>
              <textarea
                id="message-body"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="7"
                placeholder="Contenido del mensaje..."
                required
              />
            </label>

            {selectedMessageId ? (
              <label className="admin-checkbox-row" htmlFor="message-read">
                <input
                  id="message-read"
                  name="read"
                  type="checkbox"
                  checked={formData.read}
                  onChange={handleChange}
                />
                <span>Marcar como leido</span>
              </label>
            ) : null}

            <div className="admin-form-actions">
              <button type="submit" className="primary-button">
                {selectedMessageId ? 'Guardar cambios' : 'Crear mensaje'}
              </button>

              {selectedMessageId ? (
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

export default AdminMessagesManager

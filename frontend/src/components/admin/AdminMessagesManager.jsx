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
import {
  adminCheckboxRowClass,
  adminEmptyStateClass,
  adminFormActionsClass,
  adminFormClass,
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
  textareaClass,
} from '../../styles/tailwindClasses.js'

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
    <section className={adminModuleClass}>
      <AdminSectionHeader
        eyebrow="CRUD de mensajes"
        title="Bandeja de contacto conectada a la tabla real."
        description="Consulta, corrige, marca como leidos o elimina mensajes enviados desde el formulario publico."
        actions={
          <button
            type="button"
            className={secondaryButtonClass}
            onClick={handleCreateNew}
          >
            Nuevo mensaje
          </button>
        }
      />

      <AdminStatusBanner type="error" message={viewState.error} />
      <AdminStatusBanner type="success" message={viewState.success} />

      <div className={adminResourceGridClass}>
        <div className={adminPanelClass}>
          <div className={adminPanelHeadingClass}>
            <h3>Bandeja</h3>
            <span className={adminPanelHeadingMetaClass}>
              {viewState.isLoading ? 'Cargando...' : messages.length}
            </span>
          </div>

          {messages.length === 0 && !viewState.isLoading ? (
            <div className={adminEmptyStateClass}>
              <p className="m-0">No hay mensajes registrados todavia.</p>
            </div>
          ) : (
            <div className={adminRecordListClass}>
              {messages.map((message) => (
                <button
                  key={message.id}
                  type="button"
                  className={adminRecordCardClass(selectedMessageId === message.id)}
                  onClick={() => startEditing(message)}
                >
                  <div className={adminRecordMainClass}>
                    <strong>{message.name}</strong>
                    <p className={adminRecordSummaryClass}>{message.email}</p>
                  </div>
                  <div className={adminRecordMetaClass}>
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

        <div className={adminPanelClass}>
          <div className={adminPanelHeadingClass}>
            <h3>{selectedMessageId ? 'Editar mensaje' : 'Nuevo mensaje'}</h3>
            {selectedMessageId ? (
              <span className={adminPanelHeadingMetaClass}>ID #{selectedMessageId}</span>
            ) : null}
          </div>

          <form className={adminFormClass} onSubmit={handleSubmit}>
            <div className={adminInputGridTwoClass}>
              <label className={formFieldClass} htmlFor="message-name">
                <span className={formLabelClass}>Nombre</span>
                <input
                  id="message-name"
                  className={textInputClass}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre del remitente"
                  required
                />
              </label>

              <label className={formFieldClass} htmlFor="message-email">
                <span className={formLabelClass}>Email</span>
                <input
                  id="message-email"
                  className={textInputClass}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="correo@dominio.com"
                  required
                />
              </label>
            </div>

            <label className={formFieldClass} htmlFor="message-body">
              <span className={formLabelClass}>Mensaje</span>
              <textarea
                id="message-body"
                className={textareaClass}
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="7"
                placeholder="Contenido del mensaje..."
                required
              />
            </label>

            {selectedMessageId ? (
              <label className={adminCheckboxRowClass} htmlFor="message-read">
                <input
                  id="message-read"
                  className="h-[18px] w-[18px]"
                  name="read"
                  type="checkbox"
                  checked={formData.read}
                  onChange={handleChange}
                />
                <span>Marcar como leido</span>
              </label>
            ) : null}

            <div className={adminFormActionsClass}>
              <button type="submit" className={primaryButtonClass}>
                {selectedMessageId ? 'Guardar cambios' : 'Crear mensaje'}
              </button>

              {selectedMessageId ? (
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

export default AdminMessagesManager

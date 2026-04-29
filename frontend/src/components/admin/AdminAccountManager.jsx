import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import { deleteUser, getUsers, updateUser } from '../../services/api/users.js'
import { formatAdminDateTime } from '../../utils/formatAdminValue.js'
import { getApiErrorMessage } from '../../utils/getApiErrorMessage.js'
import AdminSectionHeader from './AdminSectionHeader.jsx'
import AdminStatusBanner from './AdminStatusBanner.jsx'
import {
  adminEmptyStateClass,
  adminFormActionsClass,
  adminFormClass,
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
  textInputClass,
} from '../../styles/tailwindClasses.js'

const initialFormData = {
  email: '',
  password: '',
}

function mapUserToForm(user) {
  return {
    email: user.email ?? '',
    password: '',
  }
}

function AdminAccountManager({ onDataChange }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const loadUsersRef = useRef(null)
  const [viewState, setViewState] = useState({
    isLoading: true,
    error: '',
    success: '',
  })

  async function loadUsers(nextSelectedId) {
    setViewState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: '',
    }))

    try {
      const items = await getUsers()
      setUsers(items)
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
      }))

      const preferredUser =
        items.find((item) => item.id === nextSelectedId) ??
        items.find((item) => item.id === user?.id) ??
        items[0]

      if (preferredUser) {
        startEditing(preferredUser)
      }
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        isLoading: false,
        error: getApiErrorMessage(
          error,
          'No se pudo cargar la cuenta administradora.',
        ),
      }))
    }
  }

  loadUsersRef.current = loadUsers

  useEffect(() => {
    loadUsersRef.current?.()
  }, [])

  function startEditing(account) {
    setSelectedUserId(account.id)
    setFormData(mapUserToForm(account))
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

    const selectedUser = users.find((item) => item.id === selectedUserId)

    if (!selectedUser) {
      return
    }

    const payload = {}
    const normalizedEmail = formData.email.trim().toLowerCase()

    if (normalizedEmail && normalizedEmail !== selectedUser.email) {
      payload.email = normalizedEmail
    }

    if (formData.password.trim()) {
      payload.password = formData.password.trim()
    }

    if (Object.keys(payload).length === 0) {
      setViewState((currentState) => ({
        ...currentState,
        error: '',
        success: 'No hay cambios pendientes por guardar.',
      }))
      return
    }

    try {
      await updateUser(selectedUserId, payload)
      onDataChange()
      window.alert(
        'La cuenta admin se actualizo correctamente. Debes iniciar sesion otra vez para continuar.',
      )
      logout()
      navigate('/admin/login', { replace: true })
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        error: getApiErrorMessage(
          error,
          'No se pudo actualizar la cuenta administradora.',
        ),
        success: '',
      }))
    }
  }

  async function handleDelete() {
    if (!selectedUserId) {
      return
    }

    const confirmed = window.confirm(
      'Vas a eliminar el unico administrador del sistema. El acceso al panel se perdera hasta reiniciar el backend para recrear el admin por defecto. Quieres continuar?',
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteUser(selectedUserId)
      onDataChange()
      logout()
      window.alert(
        'El administrador se elimino. Reinicia el backend para que vuelva a crearse el admin por defecto.',
      )
      navigate('/admin/login', { replace: true })
    } catch (error) {
      setViewState((currentState) => ({
        ...currentState,
        error: getApiErrorMessage(
          error,
          'No se pudo eliminar la cuenta administradora.',
        ),
        success: '',
      }))
    }
  }

  const selectedUser = users.find((item) => item.id === selectedUserId) ?? null

  return (
    <section className={adminModuleClass}>
      <AdminSectionHeader
        eyebrow="Cuenta administradora"
        title="Gestion de la tabla users con politica de un solo admin."
        description="El backend fuerza un unico usuario administrador. Por eso aqui se gestiona la cuenta del sistema y su zona de riesgo."
      />

      <AdminStatusBanner type="error" message={viewState.error} />
      <AdminStatusBanner type="success" message={viewState.success} />

      <div className={adminResourceGridClass}>
        <div className={adminPanelClass}>
          <div className={adminPanelHeadingClass}>
            <h3>Cuenta actual</h3>
            <span className={adminPanelHeadingMetaClass}>
              {viewState.isLoading ? 'Cargando...' : users.length}
            </span>
          </div>

          {users.length === 0 && !viewState.isLoading ? (
            <div className={adminEmptyStateClass}>
              <p className="m-0">
                No hay administrador activo. Reinicia el backend para restaurar
                el admin por defecto.
              </p>
            </div>
          ) : (
            <div className={adminRecordListClass}>
              {users.map((account) => (
                <button
                  key={account.id}
                  type="button"
                  className={adminRecordCardClass(selectedUserId === account.id)}
                  onClick={() => startEditing(account)}
                >
                  <div className={adminRecordMainClass}>
                    <strong>{account.email}</strong>
                    <p className={adminRecordSummaryClass}>Administrador del sistema</p>
                  </div>
                  <div className={adminRecordMetaClass}>
                    <span>ID #{account.id}</span>
                    <span>Creado: {formatAdminDateTime(account.created_at)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          <AdminStatusBanner
            type="info"
            message="La creacion manual de nuevos admins esta bloqueada por la politica de un unico administrador en backend."
          />
        </div>

        <div className={adminPanelClass}>
          <div className={adminPanelHeadingClass}>
            <h3>Ajustes del admin</h3>
            {selectedUser ? (
              <span className={adminPanelHeadingMetaClass}>ID #{selectedUser.id}</span>
            ) : null}
          </div>

          <form className={adminFormClass} onSubmit={handleSubmit}>
            <label className={formFieldClass} htmlFor="admin-email">
              <span className={formLabelClass}>Email</span>
              <input
                id="admin-email"
                className={textInputClass}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo del administrador"
                required
              />
            </label>

            <label className={formFieldClass} htmlFor="admin-password">
              <span className={formLabelClass}>Nueva contrasena</span>
              <input
                id="admin-password"
                className={textInputClass}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Dejar vacio para mantener la actual"
                minLength={8}
              />
            </label>

            <div className="mt-2 grid gap-3 border-[3px] border-[#101010] bg-[#f2f0e8] p-6">
              <p className="m-0 text-[0.76rem] font-black uppercase tracking-[0.1em] text-[#101010]">
                Nota operativa
              </p>
              <p className="m-0 text-[0.98rem] font-bold leading-[1.6] text-[#323232]">
                Si cambias email o contrasena, el panel cerrara la sesion
                actual para volver a autenticarse con las nuevas credenciales.
              </p>
            </div>

            <div className={adminFormActionsClass}>
              <button type="submit" className={primaryButtonClass}>
                Guardar cuenta
              </button>
            </div>
          </form>

          {selectedUser ? (
            <div className="mt-2 grid gap-[10px] border-[3px] border-[#101010] bg-[#ffb0a6] p-6">
              <p className="m-0 text-[0.76rem] font-black uppercase tracking-[0.1em] text-[#101010]">
                Zona de riesgo
              </p>
              <h3 className="m-0 font-['Manrope'] text-[1.4rem] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-[#101010]">
                Eliminar administrador actual
              </h3>
              <p className="m-0 text-[0.98rem] font-bold leading-[1.6] text-[#323232]">
                Esta accion te sacara del panel. Para restaurar el acceso
                deberas reiniciar el backend y dejar que recree el admin por
                defecto si la tabla queda vacia.
              </p>
              <button
                type="button"
                className={dangerButtonClass}
                onClick={handleDelete}
              >
                Eliminar admin
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default AdminAccountManager

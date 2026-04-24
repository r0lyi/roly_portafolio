import { useEffect, useState } from 'react'
import { LockKeyhole, LogIn, Mail, ShieldCheck } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'
import { getAuthStatus } from '../../services/api/auth.js'
import { getApiErrorMessage } from '../../utils/getApiErrorMessage.js'

function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [pageState, setPageState] = useState({
    isSubmitting: false,
    isCheckingStatus: true,
    adminConfigured: true,
    error: '',
  })

  useDocumentTitle('Login Admin | Roly')

  useEffect(() => {
    let isMounted = true

    async function checkAuthStatus() {
      try {
        const status = await getAuthStatus()

        if (!isMounted) {
          return
        }

        setPageState((currentState) => ({
          ...currentState,
          isCheckingStatus: false,
          adminConfigured: status.admin_configured,
        }))
      } catch {
        if (!isMounted) {
          return
        }

        setPageState((currentState) => ({
          ...currentState,
          isCheckingStatus: false,
        }))
      }
    }

    checkAuthStatus()

    return () => {
      isMounted = false
    }
  }, [])

  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname ?? '/admin'} replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setPageState((currentState) => ({
      ...currentState,
      isSubmitting: true,
      error: '',
    }))

    try {
      await login(formData)
      navigate(location.state?.from?.pathname ?? '/admin', { replace: true })
    } catch (error) {
      setPageState((currentState) => ({
        ...currentState,
        isSubmitting: false,
        error: getApiErrorMessage(
          error,
          'No fue posible iniciar sesion con esas credenciales.',
        ),
      }))
      return
    }

    setPageState((currentState) => ({
      ...currentState,
      isSubmitting: false,
    }))
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  return (
    <section className="page-section auth-page">
      <div className="auth-layout">
        <div className="auth-copy">
          <p className="eyebrow">Acceso administrador</p>
          <h1>Inicia sesion para entrar al dashboard.</h1>
          <p className="hero-summary">
            El formulario valida el email y la contrasena usando la logica
            existente del backend.
          </p>

          <div className="auth-feature-list">
            <div className="content-card auth-feature-card">
              <ShieldCheck size={20} strokeWidth={2.2} />
              <div>
                <h3>Autenticacion real</h3>
                <p>
                  El acceso se comprueba contra <code>/api/auth/me</code>.
                </p>
              </div>
            </div>

            <div className="content-card auth-feature-card">
              <LogIn size={20} strokeWidth={2.2} />
              <div>
                <h3>Sesion de admin</h3>
                <p>
                  La sesion se conserva en la pestana para proteger el panel.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-card">
          <p className="card-meta">Login</p>
          <h2>Panel de administracion</h2>

          {!pageState.isCheckingStatus && !pageState.adminConfigured ? (
            <p className="form-message form-warning">
              Aun no existe un admin configurado en el backend. Primero debes
              crear el usuario administrador.
            </p>
          ) : null}

          {pageState.error ? (
            <p className="form-message form-error">{pageState.error}</p>
          ) : null}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="form-field" htmlFor="email">
              <span className="form-label">
                <Mail size={16} strokeWidth={2.2} />
                <span>Email</span>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="admin@tuportfolio.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-field" htmlFor="password">
              <span className="form-label">
                <LockKeyhole size={16} strokeWidth={2.2} />
                <span>Contrasena</span>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Tu contrasena"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </label>

            <button
              type="submit"
              className="primary-button auth-submit"
              disabled={isLoading || pageState.isSubmitting}
            >
              {pageState.isSubmitting ? 'Entrando...' : 'Iniciar sesion'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage

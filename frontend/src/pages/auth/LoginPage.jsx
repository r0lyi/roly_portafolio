import { useEffect, useState } from 'react'
import { LockKeyhole, LogIn, Mail, ShieldCheck } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'
import { getAuthStatus } from '../../services/api/auth.js'
import {
  cardBodyClass,
  cardMetaClass,
  cardTitleClass,
  contentCardClass,
  displayHeadingClass,
  eyebrowClass,
  formFieldClass,
  formLabelClass,
  formMessageClass,
  heroSummaryClass,
  pageSectionClass,
  primaryButtonClass,
  sectionHeadingClass,
  textInputClass,
} from '../../styles/tailwindClasses.js'
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
    <section className={`${pageSectionClass} min-h-[72vh]`}>
      <div className="grid items-start gap-6 [grid-template-columns:minmax(0,1.05fr)_minmax(320px,0.95fr)] max-[960px]:grid-cols-1">
        <div>
          <p className={eyebrowClass}>Acceso administrador</p>
          <h1 className={displayHeadingClass}>Inicia sesion para entrar al dashboard.</h1>
          <p className={`mt-6 ${heroSummaryClass}`}>
            El formulario valida el email y la contrasena usando la logica
            existente del backend.
          </p>

          <div className="mt-6 grid gap-[14px]">
            <div className={`${contentCardClass} grid grid-cols-[auto_1fr] items-start gap-[14px]`}>
              <ShieldCheck size={20} strokeWidth={2.2} />
              <div>
                <h3 className={cardTitleClass}>Autenticacion real</h3>
                <p className={cardBodyClass}>
                  El acceso se comprueba contra <code>/api/auth/me</code>.
                </p>
              </div>
            </div>

            <div className={`${contentCardClass} grid grid-cols-[auto_1fr] items-start gap-[14px]`}>
              <LogIn size={20} strokeWidth={2.2} />
              <div>
                <h3 className={cardTitleClass}>Sesion de admin</h3>
                <p className={cardBodyClass}>
                  La sesion se conserva en la pestana para proteger el panel.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={contentCardClass}>
          <p className={cardMetaClass}>Login</p>
          <h2 className={`mt-[10px] ${sectionHeadingClass}`}>Panel de administracion</h2>

          {!pageState.isCheckingStatus && !pageState.adminConfigured ? (
            <p className={`mt-[18px] ${formMessageClass('warning')}`}>
              Aun no existe un admin configurado en el backend. Primero debes
              crear el usuario administrador.
            </p>
          ) : null}

          {pageState.error ? (
            <p className={`mt-[18px] ${formMessageClass('error')}`}>{pageState.error}</p>
          ) : null}

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <label className={formFieldClass} htmlFor="email">
              <span className={formLabelClass}>
                <Mail size={16} strokeWidth={2.2} />
                <span>Email</span>
              </span>
              <input
                id="email"
                className={textInputClass}
                name="email"
                type="email"
                autoComplete="username"
                placeholder="admin@tuportfolio.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className={formFieldClass} htmlFor="password">
              <span className={formLabelClass}>
                <LockKeyhole size={16} strokeWidth={2.2} />
                <span>Contrasena</span>
              </span>
              <input
                id="password"
                className={textInputClass}
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
              className={`${primaryButtonClass} w-full justify-center`}
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

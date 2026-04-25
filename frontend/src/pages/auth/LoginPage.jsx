import { useEffect, useState } from 'react'
import { LockKeyhole, LogIn, Mail, ShieldCheck } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'
import { getAuthStatus } from '../../services/api/auth.js'
import {
  adminDisplayHeadingClass,
  adminEyebrowClass,
  adminSummaryClass,
  formFieldClass,
  formLabelClass,
  formMessageClass,
  textInputClass,
} from '../../styles/tailwindClasses.js'
import { getApiErrorMessage } from '../../utils/getApiErrorMessage.js'

const loginSubmitButtonClass =
  'inline-flex w-full items-center justify-center gap-2.5 border-[3px] border-[#101010] bg-white px-[1.05rem] py-[0.92rem] text-[0.8rem] font-black uppercase tracking-[0.05em] text-[#101010] shadow-[4px_4px_0_#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#18ff48] hover:shadow-[6px_6px_0_#101010] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-70'

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
    <section className="grid gap-6">
      <div className="grid items-start gap-6 [grid-template-columns:minmax(0,1.08fr)_minmax(340px,0.92fr)] max-[960px]:grid-cols-1">
        <div className="grid gap-6">
          <div className="relative overflow-hidden border-[4px] border-[#101010] bg-[#fffef8] p-[clamp(22px,4vw,40px)] shadow-[10px_10px_0_rgba(16,16,16,0.16)]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-4 hidden border-[3px] border-[#101010] bg-[#18ff48] px-3 py-2 text-[0.76rem] font-black uppercase tracking-[0.08em] text-[#101010] lg:inline-flex"
            >
              Secure access
            </span>
            <p className={adminEyebrowClass}>Acceso administrador</p>
            <h1 className={`mt-5 ${adminDisplayHeadingClass} max-[960px]:max-w-none`}>
              Entra al panel y controla el portfolio.
            </h1>
            <p className={`mt-5 ${adminSummaryClass}`}>
              El formulario valida el email y la contrasena contra el backend
              real para proteger el dashboard y mantener la sesion del admin
              bajo control.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="grid gap-3 border-[4px] border-[#101010] bg-white p-5 shadow-[8px_8px_0_rgba(16,16,16,0.14)]">
              <span className="grid h-12 w-12 place-items-center border-[3px] border-[#101010] bg-[#ffde59] text-[#101010]">
                <ShieldCheck size={22} strokeWidth={2.4} />
              </span>
              <div className="grid gap-2">
                <h2 className="m-0 font-['Manrope'] text-[1.45rem] font-extrabold uppercase leading-[0.95] tracking-[-0.05em] text-[#101010]">
                  Auth real
                </h2>
                <p className="m-0 text-[0.98rem] font-bold leading-[1.6] text-[#323232]">
                  El acceso se comprueba contra <code>/api/auth/me</code> y
                  respeta la logica actual del backend.
                </p>
              </div>
            </article>

            <article className="grid gap-3 border-[4px] border-[#101010] bg-[#f2f0e8] p-5 shadow-[8px_8px_0_rgba(16,16,16,0.14)]">
              <span className="grid h-12 w-12 place-items-center border-[3px] border-[#101010] bg-[#18ff48] text-[#101010]">
                <LogIn size={22} strokeWidth={2.4} />
              </span>
              <div className="grid gap-2">
                <h2 className="m-0 font-['Manrope'] text-[1.45rem] font-extrabold uppercase leading-[0.95] tracking-[-0.05em] text-[#101010]">
                  Sesion segura
                </h2>
                <p className="m-0 text-[0.98rem] font-bold leading-[1.6] text-[#323232]">
                  La sesion se conserva en la pestana y mantiene protegido todo
                  el panel de administracion.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="border-[4px] border-[#101010] bg-white p-6 shadow-[10px_10px_0_rgba(16,16,16,0.16)]">
          <div className="flex items-start justify-between gap-4 border-b-[4px] border-[#101010] pb-5">
            <div>
              <p className="m-0 text-[0.76rem] font-black uppercase tracking-[0.1em] text-[#101010]">
                Login
              </p>
              <h2 className="mt-3 font-['Manrope'] text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.06em] text-[#101010]">
                Panel admin
              </h2>
            </div>
            <span className="border-[3px] border-[#101010] bg-[#ffde59] px-3 py-2 text-[0.74rem] font-black uppercase tracking-[0.08em] text-[#101010]">
              Auth gate
            </span>
          </div>

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
              className={loginSubmitButtonClass}
              disabled={isLoading || pageState.isSubmitting}
            >
              {pageState.isSubmitting ? 'Entrando...' : 'Iniciar sesion'}
            </button>

            <p className="m-0 text-[0.84rem] font-bold leading-[1.6] text-[#3a3a3a]">
              Solo el usuario administrador configurado en backend puede cruzar
              esta puerta.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage

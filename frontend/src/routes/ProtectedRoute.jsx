import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <section className="grid gap-6">
        <div className="max-w-[520px] border-[4px] border-[#101010] bg-white p-6 shadow-[8px_8px_0_rgba(16,16,16,0.16)]">
          <p className="m-0 w-fit border-[3px] border-[#101010] bg-[#ffde59] px-3 py-2 text-[0.76rem] font-black uppercase tracking-[0.1em] text-[#101010]">
            Validando sesion
          </p>
          <h3 className="mt-4 font-['Manrope'] text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.05em] text-[#101010]">
            Comprobando acceso al panel...
          </h3>
        </div>
      </section>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location,
        }}
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute

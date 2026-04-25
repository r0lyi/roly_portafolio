import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'
import {
  cardMetaClass,
  contentCardClass,
  pageSectionClass,
} from '../styles/tailwindClasses.js'

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <section className={pageSectionClass}>
        <div className={`${contentCardClass} max-w-[520px]`}>
          <p className={cardMetaClass}>Validando sesion</p>
          <h3 className="mt-[10px] text-[1.18rem] font-semibold text-[#112029]">
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

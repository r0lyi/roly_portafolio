import { LayoutDashboard, LogIn, LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import { navigationLinks } from '../../constants/navigation.js'
import { scrollToSection } from '../../utils/scrollToSection.js'

function SiteHeader() {
  const { isAuthenticated, logout } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHomePage = pathname === '/'

  function handleBrandClick() {
    if (isHomePage) {
      scrollToSection('hero')
      return
    }

    navigate('/')
  }

  function handleLogout() {
    logout()
    navigate(pathname.startsWith('/admin') ? '/admin/login' : '/')
  }

  return (
    <header className="site-header">
      <button type="button" className="brand" onClick={handleBrandClick}>
        <span className="brand-mark">R</span>
        <span className="brand-copy">
          <strong>Roly Portfolio</strong>
          <span>React + Vite + FastAPI</span>
        </span>
      </button>

      <div className="header-actions">
        <nav
          className="site-nav"
          aria-label={isHomePage ? 'Secciones principales' : 'Navegacion general'}
        >
          {isHomePage ? (
            navigationLinks.map((link) => (
              <button
                key={link.sectionId}
                type="button"
                className="nav-link"
                onClick={() => scrollToSection(link.sectionId)}
              >
                {link.label}
              </button>
            ))
          ) : (
            <Link className="nav-link" to="/">
              Inicio
            </Link>
          )}
        </nav>

        <div className="auth-actions">
          {isAuthenticated ? (
            <>
              <Link
                to="/admin"
                className="auth-link"
                aria-label="Abrir panel de administracion"
              >
                <LayoutDashboard size={18} strokeWidth={2.2} />
                <span>Panel admin</span>
              </Link>

              <button
                type="button"
                className="auth-link auth-link-danger"
                onClick={handleLogout}
                aria-label="Cerrar sesion"
              >
                <LogOut size={18} strokeWidth={2.2} />
                <span>Cerrar sesion</span>
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className="auth-link"
              aria-label="Iniciar sesion como administrador"
            >
              <LogIn size={18} strokeWidth={2.2} />
              <span>Admin</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default SiteHeader

import { LayoutDashboard, LogIn, LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import { navigationLinks } from '../../constants/navigation.js'
import {
  authLinkClass,
  dangerButtonClass,
  secondaryButtonClass,
} from '../../styles/tailwindClasses.js'
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
    <header className="flex items-center justify-between gap-6 border-b border-[rgba(21,39,48,0.12)] px-7 py-5 max-[960px]:flex-col max-[960px]:items-start max-[960px]:px-[18px]">
      <button
        type="button"
        className="inline-flex items-center gap-[14px] border-0 bg-transparent p-0 text-left text-[#112029] transition duration-200 hover:-translate-y-px"
        onClick={handleBrandClick}
      >
        <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#143c46,#27695f)] font-extrabold text-white">
          R
        </span>
        <span className="flex flex-col gap-0.5">
          <strong className="text-[0.98rem]">Roly Portfolio</strong>
          <span className="text-[0.83rem] text-[#5f7881]">React + Vite + FastAPI</span>
        </span>
      </button>

      <div className="flex items-center gap-3 max-[960px]:w-full max-[960px]:flex-col max-[960px]:items-stretch">
        <nav
          className="flex flex-wrap gap-2.5 max-[640px]:w-full"
          aria-label={isHomePage ? 'Secciones principales' : 'Navegacion general'}
        >
          {isHomePage ? (
            navigationLinks.map((link) => (
              <button
                key={link.sectionId}
                type="button"
                className={`${secondaryButtonClass} max-[640px]:w-full`}
                onClick={() => scrollToSection(link.sectionId)}
              >
                {link.label}
              </button>
            ))
          ) : (
            <Link className={`${secondaryButtonClass} max-[640px]:w-full`} to="/">
              Inicio
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3 max-[640px]:w-full max-[640px]:flex-col">
          {isAuthenticated ? (
            <>
              <Link
                to="/admin"
                className={`${authLinkClass} max-[640px]:w-full`}
                aria-label="Abrir panel de administracion"
              >
                <LayoutDashboard size={18} strokeWidth={2.2} />
                <span>Panel admin</span>
              </Link>

              <button
                type="button"
                className={`${dangerButtonClass} max-[640px]:w-full`}
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
              className={`${authLinkClass} max-[640px]:w-full`}
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

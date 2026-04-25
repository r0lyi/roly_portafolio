import { ArrowLeft, LayoutDashboard, LogIn, LogOut, Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import { navigationLinks } from '../../constants/navigation.js'
import {
  authLinkClass,
  dangerButtonClass,
  secondaryButtonClass,
} from '../../styles/tailwindClasses.js'
import { scrollToSection } from '../../utils/scrollToSection.js'
import { useState } from 'react'

function SiteHeader() {
  const { isAuthenticated, logout } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHomePage = pathname === '/'
  const isLoginPage = pathname === '/admin/login'
  const isAdminPanelPage = pathname.startsWith('/admin') && !isLoginPage
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const mobileControlClassName =
    'grid h-[52px] w-[52px] place-items-center border-[3px] border-[#101010] bg-white text-[#101010] shadow-[4px_4px_0_#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#101010] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'

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

  if (isLoginPage) {
    return (
      <header className="border-b-[4px] border-[#101010] bg-[#fffef8]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-4 py-4 sm:px-6 max-[720px]:grid-cols-[auto_1fr] max-[720px]:gap-x-3 max-[720px]:gap-y-4">
          <Link
            to="/"
            className="inline-flex w-fit items-center border-[3px] border-[#101010] bg-white px-3 py-3 shadow-[4px_4px_0_#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#101010] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            aria-label="Volver al inicio desde el logo"
          >
            <img
              className="h-auto w-[88px] min-[360px]:w-[96px] sm:w-[108px]"
              src="/logo_roly_largo.svg"
              alt="Roly"
            />
          </Link>

          <div className="justify-self-center max-[720px]:col-span-2 max-[720px]:row-start-2 max-[720px]:w-full">
            <p className="m-0 text-center font-['Manrope'] text-[clamp(1.05rem,2.2vw,1.45rem)] font-extrabold uppercase tracking-[0.08em] text-[#101010]">
              Admin / Login Surface
            </p>
          </div>

          <div className="justify-self-end max-[720px]:col-start-2 max-[720px]:row-start-1">
            <Link
              to="/"
              className={`${secondaryButtonClass} whitespace-nowrap`}
              aria-label="Volver al inicio"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
              <span>Volver al inicio</span>
            </Link>
          </div>
        </div>
      </header>
    )
  }

  if (isAdminPanelPage && isAuthenticated) {
    return (
      <header className="border-b-[4px] border-[#101010] bg-[#fffef8]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-4 py-4 sm:px-6 max-[820px]:grid-cols-[1fr] max-[820px]:gap-4">
          <Link
            to="/"
            className="inline-flex w-fit items-center border-[3px] border-[#101010] bg-white px-3 py-3 shadow-[4px_4px_0_#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#101010] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none max-[820px]:justify-self-start"
            aria-label="Volver al inicio desde el logo"
          >
            <img
              className="h-auto w-[88px] min-[360px]:w-[96px] sm:w-[108px]"
              src="/logo_roly_largo.svg"
              alt="Roly"
            />
          </Link>

          <div className="justify-self-center max-[820px]:justify-self-center">
            <p className="m-0 text-center font-['Manrope'] text-[clamp(1rem,2vw,1.35rem)] font-extrabold uppercase tracking-[0.08em] text-[#101010]">
              Interfaz de administracion / inicio de sesion
            </p>
          </div>

          <div className="flex items-center justify-self-end gap-3 max-[820px]:justify-self-stretch max-[820px]:justify-center max-[640px]:flex-col">
            <Link
              to="/"
              className={`${secondaryButtonClass} whitespace-nowrap max-[640px]:w-full`}
              aria-label="Volver al inicio"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
              <span>Volver al inicio</span>
            </Link>

            <button
              type="button"
              className={`${dangerButtonClass} whitespace-nowrap max-[640px]:w-full`}
              onClick={handleLogout}
              aria-label="Cerrar sesion"
            >
              <LogOut size={18} strokeWidth={2.2} />
              <span>Cerrar sesion</span>
            </button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="border-b-[4px] border-[#101010] bg-[#fffef8]">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button
          type="button"
          className="inline-flex items-center gap-3 border-0 bg-transparent p-0 text-left text-[#101010]"
          onClick={handleBrandClick}
        >
          <span className="grid h-[52px] w-[52px] place-items-center border-[3px] border-[#101010] bg-[#18ff48] text-[1.15rem] font-black uppercase shadow-[4px_4px_0_#101010]">
            R
          </span>
          <span className="grid gap-1">
            <img
              className="h-auto w-[96px] min-[360px]:w-[104px] sm:w-[112px]"
              src="/logo_roly_largo.svg"
              alt="Roly"
            />
            <span className="text-[0.72rem] font-black uppercase tracking-[0.08em] text-[#3a3a3a] max-[640px]:hidden">
              Admin / Login Surface
            </span>
          </span>
        </button>

        <button
          type="button"
          className={`${mobileControlClassName} lg:hidden`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`${isMenuOpen ? 'grid' : 'hidden'} gap-4 border-t-[4px] border-[#101010] bg-[#f2f0e8] px-4 py-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:border-t-0 lg:bg-[#fffef8] lg:py-0`}
      >
        <nav
          className="flex flex-wrap gap-3 max-[640px]:flex-col"
          aria-label={
            isHomePage ? 'Secciones principales' : 'Navegacion general'
          }
        >
          {isHomePage ? (
            navigationLinks.map((link) => (
              <button
                key={link.sectionId}
                type="button"
                className={`${secondaryButtonClass} max-[640px]:w-full`}
                onClick={() => {
                  scrollToSection(link.sectionId)
                  setIsMenuOpen(false)
                }}
              >
                {link.label}
              </button>
            ))
          ) : (
            <Link
              className={`${secondaryButtonClass} max-[640px]:w-full`}
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3 max-[640px]:flex-col">
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

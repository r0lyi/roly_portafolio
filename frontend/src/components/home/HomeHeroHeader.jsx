import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { navigationLinks } from '../../constants/navigation.js'
import { portfolioData } from '../../data/portfolio.js'
import useAuth from '../../hooks/useAuth.js'
import { scrollToSection } from '../../utils/scrollToSection.js'

function HomeHeroHeader() {
  const { isAuthenticated } = useAuth()
  const { profile } = portfolioData
  const [isOpen, setIsOpen] = useState(false)

  const actionLabel = isAuthenticated ? 'PANEL' : 'ADMIN'
  const actionTarget = isAuthenticated ? '/admin' : '/admin/login'

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const mobileControlClassName =
    'grid h-[52px] w-[52px] place-items-center rounded-[18px] border-[3px] border-[#101010] bg-white text-[#101010] shadow-[4px_4px_0_#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#101010] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b-4 border-[#101010] bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="relative flex items-center justify-between gap-3 lg:static">
          <button
            type="button"
            onClick={toggleMenu}
            className={`${mobileControlClassName} lg:hidden`}
            aria-label={isOpen ? 'Cerrar navegación' : 'Abrir navegación'}
            aria-expanded={isOpen}
            aria-controls="home-mobile-navigation"
          >
            {isOpen ? <X size={22} strokeWidth={2.6} /> : <Menu size={22} strokeWidth={2.6} />}
          </button>

          {/* LOGO */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              closeMenu()
              scrollToSection('hero')
            }}
            aria-label={profile.brand}
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
          >
            <img
              className="h-auto w-[88px] min-[360px]:w-[92px] sm:w-[104px] lg:w-[120px]"
              src="/logo_roly_largo.svg"
              alt={profile.brand}
            />
          </motion.button>

          <Link
            className="inline-flex items-center justify-center border-[3px] border-[#101010] bg-white px-3 py-[0.78rem] text-[0.78rem] font-black uppercase tracking-[0.04em] text-[#101010] shadow-[4px_4px_0_#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#101010] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none max-[359px]:px-2.5 max-[359px]:text-[0.72rem] lg:hidden"
            to={actionTarget}
            aria-label={isAuthenticated ? 'Abrir panel de administración' : 'Abrir acceso de administración'}
            title={actionLabel}
            onClick={closeMenu}
          >
            {actionLabel}
          </Link>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden lg:flex lg:items-center lg:gap-x-8">
            {navigationLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className="relative text-sm font-black uppercase tracking-tight text-[#101010] hover:text-gray-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* BOTÓN CTA (Visible en Desktop) */}
          <div className="hidden lg:block">
            <Link
              className="border-4 border-[#101010] bg-white px-5 py-2 font-black uppercase shadow-[4px_4px_0px_#101010] transition-all hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              to={actionTarget}
            >
              {actionLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="home-mobile-navigation"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            className="overflow-hidden border-t-4 border-[#101010] bg-[#f6f4ed]/95 lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4 sm:px-6">
              <p className="m-0 text-[0.74rem] font-black uppercase tracking-[0.14em] text-[#5b5b5b]">
                Navegación principal
              </p>
              {navigationLinks.map((link) => (
                <button
                  key={link.sectionId}
                  type="button"
                  onClick={() => {
                    scrollToSection(link.sectionId)
                    closeMenu()
                  }}
                  className="flex w-full items-center justify-between rounded-[18px] border-[3px] border-[#101010] bg-white px-4 py-3.5 text-left font-black uppercase tracking-[0.03em] text-[#101010] shadow-[4px_4px_0_#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#101010]"
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true" className="text-lg leading-none">
                    
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default HomeHeroHeader

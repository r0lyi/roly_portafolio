import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { navigationLinks } from '../../constants/navigation.js'
import { portfolioData } from '../../data/portfolio.js'
import useAuth from '../../hooks/useAuth.js'
import { scrollToSection } from '../../utils/scrollToSection.js'

function HomeHeroHeader() {
  const { isAuthenticated } = useAuth()
  const { profile } = portfolioData
  const [isOpen, setIsOpen] = useState(false) // Estado para el menú móvil

  const actionLabel = isAuthenticated ? 'PANEL' : 'ADMIN'
  const actionTarget = isAuthenticated ? '/admin' : '/admin/login'

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b-4 border-[#101010] bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* LOGO */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('hero')}
          className="z-50 shrink-0"
        >
          <img
            className="h-auto w-[100px] md:w-[120px]"
            src="/logo_roly_largo.svg"
            alt="Logo"
          />
        </motion.button>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="hidden lg:flex items-center gap-x-8">
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

        {/* BOTÓN HAMBURGUESA (Solo Mobile/Tablet) */}
        <button 
          onClick={toggleMenu}
          className="z-50 flex flex-col gap-1.5 lg:hidden focus:outline-none"
        >
          <span className={`h-1 w-8 bg-[#101010] transition-transform ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
          <span className={`h-1 w-8 bg-[#101010] ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-1 w-8 bg-[#101010] transition-transform ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </button>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white border-t-4 border-[#101010] lg:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navigationLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => { scrollToSection(link.sectionId); setIsOpen(false); }}
                  className="w-full border-2 border-[#101010] py-4 text-center font-black uppercase shadow-[4px_4px_0px_#101010]"
                >
                  {link.label}
                </button>
              ))}
              <Link
                onClick={() => setIsOpen(false)}
                className="w-full bg-[#101010] py-4 text-center font-black uppercase text-white shadow-[4px_4px_0px_rgba(0,0,0,0.3)]"
                to={actionTarget}
              >
                {actionLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default HomeHeroHeader
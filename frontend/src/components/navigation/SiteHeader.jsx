import { navigationLinks } from '../../constants/navigation.js'
import { scrollToSection } from '../../utils/scrollToSection.js'

function SiteHeader() {
  return (
    <header className="site-header">
      <button
        type="button"
        className="brand"
        onClick={() => scrollToSection('hero')}
      >
        <span className="brand-mark">R</span>
        <span className="brand-copy">
          <strong>Roly Portfolio</strong>
          <span>React + Vite + FastAPI</span>
        </span>
      </button>

      <nav className="site-nav" aria-label="Secciones principales">
        {navigationLinks.map((link) => (
          <button
            key={link.sectionId}
            type="button"
            className="nav-link"
            onClick={() => scrollToSection(link.sectionId)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default SiteHeader

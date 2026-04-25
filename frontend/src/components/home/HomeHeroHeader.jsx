import { Link } from 'react-router-dom'
import { navigationLinks } from '../../constants/navigation.js'
import { portfolioData } from '../../data/portfolio.js'
import useAuth from '../../hooks/useAuth.js'
import { scrollToSection } from '../../utils/scrollToSection.js'

function HomeHeroHeader() {
  const { isAuthenticated } = useAuth()
  const { profile } = portfolioData
  const actionLabel = isAuthenticated ? 'PANEL' : 'ADMIN'
  const actionTarget = isAuthenticated ? '/admin' : '/admin/login'
  const navLinkClassName = 'border-0 bg-transparent p-0 text-base font-extrabold text-[#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 max-[640px]:w-full max-[640px]:border-[3px] max-[640px]:border-[#101010] max-[640px]:bg-white max-[640px]:px-4 max-[640px]:py-[0.95rem] max-[640px]:text-center'

  return (
    <div className="border-y-[4px] border-[#101010]">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-8 px-6 py-[14px] max-[960px]:flex-col max-[960px]:items-stretch">
        <button
          type="button"
          className="shrink-0 border-0 bg-transparent p-0 transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
          onClick={() => scrollToSection('hero')}
          aria-label={profile.brand}
        >
          <img
            className="block h-auto w-[clamp(70px,18vw,100px)] "
            src="/logo_roly_largo.svg"
            alt=""
          />
        </button>

        <nav
          className="flex flex-1 flex-wrap items-center justify-center gap-x-9 gap-y-[14px] max-[960px]:justify-start max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-3"
          aria-label="Secciones principales"
        >
          {navigationLinks.map((link) => (
            <button
              key={link.sectionId}
              type="button"
              className={navLinkClassName}
              onClick={() => scrollToSection(link.sectionId)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <Link
          className="inline-flex items-center justify-center border-[4px] border-[#101010] bg-white px-[1.2rem] py-[0.78rem] font-black uppercase tracking-[0.04em] text-[#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#101010] max-[640px]:w-full"
          to={actionTarget}
        >
          {actionLabel}
        </Link>
      </div>
    </div>
  )
}

export default HomeHeroHeader

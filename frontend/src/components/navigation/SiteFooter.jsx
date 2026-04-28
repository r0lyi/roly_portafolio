import { useLocation } from 'react-router-dom'
import { portfolioData } from '../../data/portfolio.js'

function SiteFooter() {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'

  if (!isHomePage) {
    return (
      <footer className="border-t-[4px] border-[#101010] bg-[#fffef8] px-4 py-4 text-center sm:px-6">
        <p className="m-0 text-[0.78rem] font-black uppercase leading-[1.5] tracking-[0.08em] text-[#101010]">
          {new Date().getFullYear()} · Estructura lista para escalar por capas y
          conectar con tu backend.
        </p>
      </footer>
    )
  }

  const { profile, contact } = portfolioData
  const footerLinks = profile.socialLinks.map((link) => {
    if (link.label === 'Gmail' && contact.gmailComposeUrl) {
      return {
        ...link,
        href: contact.gmailComposeUrl,
      }
    }

    return link
  })

  return (
    <footer className="border-t-[4px] border-[#101010] bg-[#f2f0e8] text-[#101010]">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 px-6 py-[26px] max-[960px]:flex-col max-[960px]:items-start">
        <p className="m-0 text-[0.95rem] font-black uppercase leading-[1.2] tracking-[-0.03em] max-[640px]:text-[0.88rem]">
          ©{new Date().getFullYear()}_{contact.footerLabel}
        </p>

        <nav
          className="flex flex-wrap items-center justify-end gap-x-[26px] gap-y-[14px] max-[960px]:justify-start max-[640px]:gap-x-[18px] max-[640px]:gap-y-[10px]"
          aria-label="Enlaces del pie de pagina"
        >
          {footerLinks.map((link) => (
            <a
              key={link.label}
              className="text-[0.92rem] font-black uppercase leading-[1.2] tracking-[-0.02em] transition duration-200 hover:-translate-y-px hover:text-[#2b7d3d]"
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default SiteFooter

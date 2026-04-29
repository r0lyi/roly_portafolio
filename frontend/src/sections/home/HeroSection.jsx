import HomeHeroHeader from '../../components/home/HomeHeroHeader.jsx'
import HomeHeroPoster from '../../components/home/HomeHeroPoster.jsx'
import { portfolioData } from '../../data/portfolio.js'
import {
  homeButtonNeutralClass,
  homeButtonPrimaryClass,
} from '../../styles/homeBrutalistClasses.js'
import { scrollToSection } from '../../utils/scrollToSection.js'
import { Download, ArrowDownRight } from 'lucide-react'

function GitHubIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.85 9.75.5.1.68-.22.68-.49v-1.74c-2.79.62-3.38-1.37-3.38-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.64-1.38-2.23-.26-4.58-1.14-4.58-5.09 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 6.84c.85 0 1.71.12 2.51.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.74 0 3.96-2.35 4.82-4.59 5.08.36.32.69.95.69 1.92v2.85c0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  )
}

function LinkedInIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5ZM3 9.5h4v11H3v-11Zm7 0h3.83V11h.05c.53-.97 1.84-2 3.79-2 4.05 0 4.8 2.72 4.8 6.26v5.24h-4v-4.65c0-1.11-.02-2.54-1.5-2.54-1.5 0-1.73 1.2-1.73 2.46v4.73h-4v-11Z"
      />
    </svg>
  )
}

function GmailIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v13.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25Zm2.2.3v12.9h2.66v-7.1L12 14.3l4.14-2.95v7.1h2.66V5.55L12 10.42 5.2 5.55Z"
      />
    </svg>
  )
}

const socialIconMap = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Gmail: GmailIcon,
}

function HeroSection() {
  const { profile } = portfolioData
  const socialLinkClassName = 'grid h-[72px] w-[72px] place-items-center border-[4px] border-[#101010] bg-white text-[#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#18ff48] hover:shadow-[8px_8px_0_#101010] max-[640px]:h-16 max-[640px]:w-16'
  const heroActionClassName =
    'min-w-[204px] px-5 max-[640px]:w-full max-[640px]:min-w-0'

  return (
    <section id="hero" className="grid min-h-svh grid-rows-[auto_1fr] bg-[#f2f0e8]">
      <HomeHeroHeader />

      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-[minmax(0,_1.08fr)_minmax(300px,_0.92fr)] items-center gap-10 px-4 py-[clamp(24px,4vw,40px)] sm:px-6 xl:gap-14 max-[960px]:grid-cols-1 max-[960px]:items-start max-[640px]:gap-8 max-[640px]:py-7">
        <div className="grid content-center gap-5">
          <p className="m-0 w-fit border-[3px] border-[#101010] bg-white px-[0.9rem] py-[0.55rem] text-[0.92rem] font-black uppercase tracking-[0.08em] text-[#101010]">
            {profile.role}
          </p>

          <h1 className="grid gap-1 font-['Manrope'] text-[clamp(3.1rem,7vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.08em] text-[#101010]">
            <span className="flex flex-wrap items-baseline gap-[18px] max-[640px]:gap-[10px]">
              <span>{profile.heroTitleLead}</span>
              <span className="inline-flex items-center border-[4px] border-[#101010] bg-[#18ff48] px-[0.22em] py-[0.08em] shadow-[8px_8px_0_#101010] max-[640px]:shadow-[6px_6px_0_#101010]">
                {profile.heroTitleAccent}
              </span>
            </span>

            {profile.heroTitleLines.map((line) => (
              <span
                key={line}
                className="flex flex-wrap items-baseline gap-[18px] max-[640px]:gap-[10px]"
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="m-0 max-w-[36rem] text-[1.08rem] leading-[1.5] text-[#282828] max-[640px]:text-base max-[640px]:leading-[1.45]">
            {profile.summary}
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              type="button"
              className={`${homeButtonPrimaryClass} ${heroActionClassName}`}
              onClick={() => scrollToSection('projects')}
            >
              <span>Ver proyectos</span>
              <ArrowDownRight className="h-5 w-5" aria-hidden="true" />
            </button>

            {profile.cvDownloadUrl ? (
              <a
                className={`${homeButtonNeutralClass} ${heroActionClassName}`}
                href={profile.cvDownloadUrl}
                download={profile.cvDownloadName}
                aria-label="Descargar CV en PDF"
              >
                <span>Descargar CV</span>
                <Download className="h-5 w-5" aria-hidden="true" />
              </a>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-[12px] sm:gap-[14px]">
            {profile.socialLinks.map((link) => {
              const Icon = socialIconMap[link.label]

              if (!Icon) {
                return null
              }

              return (
                <a
                  key={link.label}
                  className={socialLinkClassName}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon className="h-7 w-7" />
                </a>
              )
            })}
          </div>
        </div>

        <HomeHeroPoster />
      </div>
    </section>
  )
}

export default HeroSection

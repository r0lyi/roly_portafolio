import { portfolioData } from '../../data/portfolio.js'
import { resolveImageAssetUrl } from '../../utils/resolveImageAssetUrl.js'

function SystemStackIcon({ icon }) {
  const iconClassName = 'h-[42px] w-[42px]'

  switch (icon) {
    case 'js':
      return (
        <svg className={iconClassName} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <rect x="8" y="8" width="32" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
          <text x="24" y="29" fill="currentColor" fontSize="14" fontWeight="900" textAnchor="middle">
            JS
          </text>
        </svg>
      )

    case 'react':
      return (
        <svg className={iconClassName} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <circle cx="24" cy="24" r="3.5" fill="currentColor" />
          <ellipse cx="24" cy="24" rx="15" ry="6.5" fill="none" stroke="currentColor" strokeWidth="2.6" />
          <ellipse
            cx="24"
            cy="24"
            rx="15"
            ry="6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            transform="rotate(60 24 24)"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="15"
            ry="6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            transform="rotate(-60 24 24)"
          />
        </svg>
      )

    case 'node':
      return (
        <svg className={iconClassName} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <rect x="8" y="12" width="32" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M16 24h6l-4 4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
          <path d="M25 28h8" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      )

    case 'python':
      return (
        <svg className={iconClassName} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <text x="24" y="29" fill="currentColor" fontSize="20" fontWeight="900" textAnchor="middle">
            {'{}'}
          </text>
        </svg>
      )

    case 'docker':
      return (
        <svg className={iconClassName} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <rect x="11" y="18" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="2.6" />
          <rect x="20.5" y="18" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="2.6" />
          <rect x="30" y="18" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="2.6" />
          <rect x="16" y="27" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="2.6" />
          <rect x="25.5" y="27" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="2.6" />
        </svg>
      )

    case 'postgres':
      return (
        <svg className={iconClassName} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <ellipse cx="24" cy="14" rx="12" ry="5" fill="none" stroke="currentColor" strokeWidth="2.8" />
          <path d="M12 14v14c0 2.8 5.4 5 12 5s12-2.2 12-5V14" fill="none" stroke="currentColor" strokeWidth="2.8" />
          <path d="M12 21c0 2.8 5.4 5 12 5s12-2.2 12-5" fill="none" stroke="currentColor" strokeWidth="2.8" />
        </svg>
      )

    case 'aws':
      return (
        <svg className={iconClassName} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <path
            d="M16 31h16a6 6 0 0 0 1.1-11.9A8.5 8.5 0 0 0 17 20.5 5.5 5.5 0 0 0 16 31Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        </svg>
      )

    case 'grafana':
      return (
        <svg className={iconClassName} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <path d="M12 34V23" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M20 34V18" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M28 34V13" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M36 34V9" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M11 35h26" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      )

    default:
      return null
  }
}

function TechnologyLogo({ item }) {
  const imageUrl = item.imgUrl ?? item.img_url ?? ''

  if (imageUrl) {
    return (
      <img
        className="h-[42px] w-[42px] object-contain"
        src={resolveImageAssetUrl(imageUrl)}
        alt=""
        loading="lazy"
      />
    )
  }

  return <SystemStackIcon icon={item.icon} />
}

function SkillsSection() {
  const { systemStack } = portfolioData

  return (
    <section id="skills" className="border-t-[4px] border-[#101010] bg-[#e7e7e9] py-[84px] max-[640px]:py-14">
      <div className="mx-auto grid w-full max-w-[1180px] gap-[22px] px-6">
        <div className="grid gap-3">
          <p className="m-0 w-fit border-[4px] border-[#101010] bg-[#101010] px-[0.72rem] py-[0.32rem] text-[clamp(2rem,4.9vw,3.4rem)] font-black uppercase leading-none tracking-[-0.06em] text-white shadow-[8px_8px_0_rgba(16,16,16,0.16)] max-[640px]:text-[clamp(1.8rem,10vw,2.8rem)] max-[640px]:shadow-[6px_6px_0_rgba(16,16,16,0.16)]">
            {systemStack.label}
          </p>
          <p className="m-0 text-[1.12rem] font-bold leading-[1.45] text-[#2f2f2f] max-[640px]:text-base">
            {systemStack.description}
          </p>
        </div>

        <div className="grid grid-cols-6 gap-[14px] max-[960px]:grid-cols-4 max-[640px]:grid-cols-2">
          {systemStack.items.map((item) => (
            <article
              key={item.label}
              className="grid min-h-[116px] content-center justify-items-center gap-3 border-[4px] border-[#101010] bg-[#fffef8] px-[10px] py-[14px] text-center shadow-[6px_6px_0_rgba(16,16,16,0.16)] max-[640px]:min-h-[104px]"
            >
              <div className="grid h-11 w-11 place-items-center text-[#161616]">
                <TechnologyLogo item={item} />
              </div>
              <p className="m-0 text-[0.92rem] font-black uppercase leading-[1.1] tracking-[-0.02em] text-[#202020]">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection

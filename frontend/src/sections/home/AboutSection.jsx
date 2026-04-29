import HomeSectionShell from '../../components/home/HomeSectionShell.jsx'
import { portfolioData } from '../../data/portfolio.js'

function calculateAge(birthDate) {
  if (typeof birthDate !== 'string') {
    return ''
  }

  const [year, month, day] = birthDate.split('-').map(Number)

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return ''
  }

  const today = new Date()
  let age = today.getFullYear() - year
  const hasHadBirthdayThisYear =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day)

  if (!hasHadBirthdayThisYear) {
    age -= 1
  }

  return age > 0 ? `${age} años` : ''
}

function AboutSection() {
  const { about, profile } = portfolioData
  const aboutTickets = [
    calculateAge(profile.birthDate),
    ...(Array.isArray(about.tickets) ? about.tickets : []),
  ].filter(Boolean)

  return (
    <HomeSectionShell
      id="about"
      backgroundClassName="bg-[#030303]"
      contentClassName="grid gap-6 md:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.3fr)] md:gap-11"
    >
      <div className="min-w-0">
        <p className="m-0 text-[clamp(2.5rem,5.5vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.06em] text-[#18ff48]">
          {about.label}
        </p>
      </div>

      <div className="min-w-0">
        <h2 className="m-0 max-w-[15ch] font-['Manrope'] text-[clamp(2rem,4.4vw,3.7rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.05em] text-[#f2f2f2] max-[960px]:max-w-none max-[640px]:text-[clamp(1.6rem,8vw,2.4rem)]">
          {about.headline}
        </h2>
        <p className="mt-[34px] max-w-[58ch] text-[1.28rem] font-bold leading-[1.55] text-[#7d7d7d] max-[640px]:mt-6 max-[640px]:text-base max-[640px]:leading-[1.6]">
          {about.body}
        </p>

        <ul className="mt-7 flex flex-wrap gap-[14px] p-0 max-[640px]:mt-[22px] max-[640px]:gap-3" aria-label="Rasgos principales">
          {aboutTickets.map((item) => (
            <li
              key={item}
              className="list-none border-[3px] border-[#f2f2f2] px-4 py-3 text-[0.9rem] font-black uppercase leading-[1.2] tracking-[0.05em] text-[#f2f2f2] max-[640px]:w-full"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </HomeSectionShell>
  )
}

export default AboutSection

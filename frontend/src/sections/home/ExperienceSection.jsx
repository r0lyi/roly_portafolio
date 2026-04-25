import { portfolioData } from '../../data/portfolio.js'

function ExperienceSection() {
  const { experienceLog, experiences } = portfolioData

  return (
    <section id="experience" className="border-t-[4px] border-[#101010] bg-[#f2f0e8] py-[84px] max-[640px]:py-14">
      <div className="mx-auto grid w-full max-w-[1180px] gap-[34px] px-6">
        <div className="grid grid-cols-[auto_minmax(0,_1fr)] items-center gap-[18px] max-[960px]:grid-cols-1 max-[960px]:gap-[14px]">
          <p className="m-0 w-fit border-[4px] border-[#101010] bg-[#101010] px-[0.62rem] py-[0.28rem] text-[clamp(2rem,4.8vw,3.35rem)] font-black uppercase leading-none tracking-[-0.06em] text-white shadow-[8px_8px_0_rgba(16,16,16,0.16)] max-[640px]:text-[clamp(1.8rem,10vw,2.7rem)] max-[640px]:shadow-[6px_6px_0_rgba(16,16,16,0.16)]">
            {experienceLog.label}
          </p>
          <span className="block h-1 bg-[#101010]" aria-hidden="true" />
        </div>

        <div className="grid gap-[18px]">
          {experiences.map((item) => (
            <article
              key={`${item.company}-${item.role}`}
              className="relative grid gap-[26px] border-[4px] border-[#101010] bg-[#fffef8] px-[18px] pb-5 pt-[22px] shadow-[8px_8px_0_rgba(16,16,16,0.16)] max-[640px]:gap-5 max-[640px]:px-[14px] max-[640px]:pb-4 max-[640px]:pt-[18px]"
            >
              {item.featured ? (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-11 w-11 bg-[linear-gradient(135deg,transparent_49%,#d9f6d4_50%)]"
                />
              ) : null}

              <div className="flex items-start justify-between gap-5 max-[960px]:flex-col max-[960px]:items-start">
                <div className="min-w-0">
                  <p
                    className={`m-0 w-fit px-[0.6rem] py-[0.3rem] text-[1.02rem] font-black uppercase leading-none tracking-[-0.04em] text-[#101010] ${
                      item.featured ? 'bg-[#18ff48]' : ''
                    }`}
                  >
                    {item.role}
                  </p>
                  <p className="mt-3 m-0 text-base font-black uppercase tracking-[-0.04em] text-[#1b1b1b] underline decoration-[2px] underline-offset-[0.2em]">
                    {item.company}
                  </p>
                </div>

                <p className="m-0 shrink-0 border-[4px] border-[#101010] bg-[#101010] px-[0.72rem] py-[0.48rem] text-[0.9rem] font-black uppercase leading-none tracking-[-0.03em] text-white max-[640px]:text-[0.82rem]">
                  {item.period}
                </p>
              </div>

              <ul className="m-0 grid gap-3 p-0">
                {item.highlights.map((point) => (
                  <li key={point} className="relative list-none pl-[1.45rem] text-[0.98rem] font-bold leading-[1.55] text-[#343434] max-[640px]:text-[0.92rem]">
                    <span className="absolute left-0 top-0 font-black text-[#18ff48]">{'>>'}</span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection

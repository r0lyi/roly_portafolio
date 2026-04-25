import { portfolioData } from '../../data/portfolio.js'
import HomeSectionStateCard from '../../components/ui/HomeSectionStateCard.jsx'

function ExperiencesLoadingState() {
  return (
    <div className="grid gap-[18px]">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={`experience-skeleton-${index}`}
          className="grid gap-6 border-[4px] border-[#101010] bg-[#fffef8] px-[18px] py-[22px] shadow-[8px_8px_0_rgba(16,16,16,0.14)] md:grid-cols-[220px_minmax(0,1fr)]"
        >
          <div className="grid gap-3">
            <div className="h-8 w-32 animate-pulse bg-[#d8d0bc]" />
            <div className="h-4 w-24 animate-pulse bg-[#ece5d0]" />
          </div>
          <div className="grid gap-4">
            <div className="h-10 w-1/2 animate-pulse bg-[#d8d0bc]" />
            <div className="h-20 animate-pulse bg-[#eee8d7]" />
          </div>
        </div>
      ))}
    </div>
  )
}

function ExperienceSection({ experiencesState }) {
  const { experienceLog } = portfolioData
  const experiences = experiencesState?.data ?? []

  return (
    <section id="experience" className="border-t-[4px] border-[#101010] bg-[#f2f0e8] py-[84px] max-[640px]:py-14">
      <div className="mx-auto grid w-full max-w-[1180px] gap-[34px] px-6">
        <div className="grid grid-cols-[auto_minmax(0,_1fr)] items-center gap-[18px] max-[960px]:grid-cols-1 max-[960px]:gap-[14px]">
          <p className="m-0 w-fit border-[4px] border-[#101010] bg-[#101010] px-[0.62rem] py-[0.28rem] text-[clamp(2rem,4.8vw,3.35rem)] font-black uppercase leading-none tracking-[-0.06em] text-white shadow-[8px_8px_0_rgba(16,16,16,0.16)] max-[640px]:text-[clamp(1.8rem,10vw,2.7rem)] max-[640px]:shadow-[6px_6px_0_rgba(16,16,16,0.16)]">
            {experienceLog.label}
          </p>
          <span className="block h-1 bg-[#101010]" aria-hidden="true" />
        </div>

        {experiencesState?.isLoading ? <ExperiencesLoadingState /> : null}

        {!experiencesState?.isLoading && experiencesState?.error ? (
          <HomeSectionStateCard
            eyebrow="Error de sincronizacion"
            title="No fue posible cargar la experiencia."
            description={experiencesState.error}
            actionLabel="Reintentar"
            onAction={experiencesState.retry}
          />
        ) : null}

        {!experiencesState?.isLoading &&
        !experiencesState?.error &&
        experiencesState?.isEmpty ? (
          <HomeSectionStateCard
            eyebrow="Sin experiencia"
            title="Todavia no hay experiencias publicadas."
            description="La timeline esta conectada al backend y quedara lista para mostrar trayectoria real en cuanto exista contenido."
          />
        ) : null}

        {!experiencesState?.isLoading &&
        !experiencesState?.error &&
        !experiencesState?.isEmpty ? (
          <div className="grid gap-[18px]">
            {experiences.map((item) => (
              <article
                key={item.id}
                className="grid gap-6 border-[4px] border-[#101010] bg-[#fffef8] px-[18px] py-[22px] shadow-[8px_8px_0_rgba(16,16,16,0.16)] md:grid-cols-[220px_minmax(0,1fr)] max-[640px]:gap-5 max-[640px]:px-[14px] max-[640px]:py-[18px]"
              >
                <div className="grid content-start gap-3">
                  <p className="m-0 w-fit border-[4px] border-[#101010] bg-[#101010] px-[0.72rem] py-[0.48rem] text-[0.84rem] font-black uppercase leading-none tracking-[0.02em] text-white">
                    {item.dateLabel}
                  </p>
                  <p className="m-0 text-[0.82rem] font-black uppercase tracking-[0.12em] text-[#5b5b5b]">
                    {item.company}
                  </p>
                </div>

                <div className="grid gap-4">
                  <h3 className="m-0 max-w-[18ch] font-['Manrope'] text-[clamp(1.55rem,3vw,2.25rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.05em] text-[#101010] max-[640px]:max-w-none">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[1rem] font-bold leading-[1.58] text-[#3f3f3f] max-[640px]:text-[0.94rem]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ExperienceSection

import { portfolioData } from '../../data/portfolio.js'
import HomeSectionStateCard from '../../components/ui/HomeSectionStateCard.jsx'
import { resolveImageAssetUrl } from '../../utils/resolveImageAssetUrl.js'

function SkillsLoadingState() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[14px] max-[640px]:grid-cols-2">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={`technology-skeleton-${index}`}
          className="grid min-h-[132px] content-center justify-items-center gap-4 border-[4px] border-[#101010] bg-[#fffef8] px-[12px] py-[16px] shadow-[6px_6px_0_rgba(16,16,16,0.14)]"
        >
          <div className="h-14 w-14 animate-pulse rounded-[18px] bg-[#d8d0bc]" />
          <div className="h-4 w-20 animate-pulse bg-[#ece5d0]" />
        </div>
      ))}
    </div>
  )
}

function TechnologyLogo({ item }) {
  const imageUrl = item.imgUrl ?? ''

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

  return (
    <div className="grid h-[54px] w-[54px] place-items-center rounded-[18px] border-[3px] border-[#101010] bg-[linear-gradient(135deg,#101820_0%,#244b57_100%)] text-[1.05rem] font-black uppercase tracking-[0.04em] text-[#f8fff9]">
      {item.monogram}
    </div>
  )
}

function SkillsSection({ technologiesState }) {
  const { systemStack } = portfolioData
  const technologyGroups = technologiesState?.data ?? []

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

        {technologiesState?.isLoading ? <SkillsLoadingState /> : null}

        {!technologiesState?.isLoading && technologiesState?.error ? (
          <HomeSectionStateCard
            eyebrow="Error de sincronizacion"
            title="No fue posible cargar el stack."
            description={technologiesState.error}
            actionLabel="Reintentar"
            onAction={technologiesState.retry}
          />
        ) : null}

        {!technologiesState?.isLoading &&
        !technologiesState?.error &&
        technologiesState?.isEmpty ? (
          <HomeSectionStateCard
            eyebrow="Sin tecnologias"
            title="Todavia no hay tecnologias publicadas."
            description="La seccion ya escucha el backend y mostrara logos o monogramas en cuanto se registren tecnologias desde el panel."
          />
        ) : null}

        {!technologiesState?.isLoading &&
        !technologiesState?.error &&
        !technologiesState?.isEmpty ? (
          <div className="grid gap-7">
            {technologyGroups.map((group) => (
              <div key={group.groupLabel} className="grid gap-4">
                <div className="flex items-center gap-4 max-[640px]:items-end">
                  <p className="m-0 w-fit border-[3px] border-[#101010] bg-[#fffef8] px-[0.7rem] py-[0.42rem] text-[0.84rem] font-black uppercase tracking-[0.08em] text-[#101010] shadow-[4px_4px_0_rgba(16,16,16,0.12)]">
                    {group.groupLabel}
                  </p>
                  <span className="block h-[3px] flex-1 bg-[#101010]" aria-hidden="true" />
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-[14px] max-[640px]:grid-cols-2">
                  {group.items.map((item) => (
                    <article
                      key={item.id}
                      className="grid min-h-[132px] content-center justify-items-center gap-4 border-[4px] border-[#101010] bg-[#fffef8] px-[12px] py-[16px] text-center shadow-[6px_6px_0_rgba(16,16,16,0.16)] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_rgba(16,16,16,0.2)]"
                    >
                      <TechnologyLogo item={item} />
                      <p className="m-0 text-[0.92rem] font-black uppercase leading-[1.15] tracking-[-0.02em] text-[#202020]">
                        {item.name}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default SkillsSection

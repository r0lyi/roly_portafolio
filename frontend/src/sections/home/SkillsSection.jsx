import HomeTechnologyGroup, {
  HomeTechnologyCard,
} from '../../components/home/HomeTechnologyGroup.jsx'
import HomeSectionStateCard from '../../components/ui/HomeSectionStateCard.jsx'
import { portfolioData } from '../../data/portfolio.js'
import {
  homeSectionBaseClass,
  homeSectionContainerClass,
} from '../../styles/homeBrutalistClasses.js'

function rotateTechnologies(items, shift) {
  if (!Array.isArray(items) || items.length <= 1) {
    return Array.isArray(items) ? items : []
  }

  const normalizedShift = ((shift % items.length) + items.length) % items.length

  if (normalizedShift === 0) {
    return items
  }

  return [
    ...items.slice(normalizedShift),
    ...items.slice(0, normalizedShift),
  ]
}

function SkillsLoadingState() {
  return (
    <div className="mx-auto grid w-full max-w-[1640px] gap-5 overflow-hidden">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:hidden">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={`technology-grid-skeleton-${index}`}
            className="grid min-h-[142px] place-items-center rounded-[26px] bg-[rgba(255,255,255,0.82)] p-5 shadow-[0_18px_40px_rgba(16,16,16,0.08)] ring-1 ring-[rgba(16,16,16,0.05)] sm:min-h-[160px]"
          >
            <div className="h-[70px] w-[70px] animate-pulse rounded-[20px] bg-[#d8d0bc] sm:h-[82px] sm:w-[82px]" />
          </div>
        ))}
      </div>

      <div className="hidden gap-5 lg:grid">
        {Array.from({ length: 2 }, (_, rowIndex) => (
          <div
            key={`technology-skeleton-row-${rowIndex}`}
            className="grid grid-flow-col gap-5 overflow-hidden"
          >
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={`technology-skeleton-${rowIndex}-${index}`}
                className="grid h-[176px] min-w-[176px] place-items-center rounded-[34px] bg-[rgba(255,255,255,0.82)] p-7 shadow-[0_18px_40px_rgba(16,16,16,0.08)] ring-1 ring-[rgba(16,16,16,0.05)] max-[640px]:h-[148px] max-[640px]:min-w-[148px] max-[640px]:rounded-[28px] max-[640px]:p-5"
              >
                <div className="h-[76px] w-[76px] animate-pulse rounded-[24px] bg-[#d8d0bc] md:h-[92px] md:w-[92px]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillsResponsiveGrid({ items }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:hidden">
      {items.map((item) => (
        <HomeTechnologyCard
          key={item.id}
          item={item}
          showLabel
          className="min-h-[142px] gap-3 rounded-[26px] p-4 sm:min-h-[160px] sm:gap-4 sm:p-5"
        />
      ))}
    </div>
  )
}

function SkillsSection({ technologiesState }) {
  const { systemStack } = portfolioData
  const technologies = technologiesState?.data ?? []
  const lowerRowTechnologies = rotateTechnologies(
    technologies,
    Math.max(1, Math.ceil(technologies.length / 2)),
  )

  return (
    <section id="skills" className={`${homeSectionBaseClass} bg-[#e7e7e9]`}>
      <div className={`${homeSectionContainerClass} grid gap-6`}>
        <div className="grid gap-3">
          <p className="m-0 w-fit border-[4px] border-[#101010] bg-[#101010] px-[0.72rem] py-[0.32rem] text-[clamp(2rem,4.9vw,3.4rem)] font-black uppercase leading-none tracking-[-0.06em] text-white shadow-[8px_8px_0_rgba(16,16,16,0.16)] max-[640px]:text-[clamp(1.8rem,10vw,2.8rem)] max-[640px]:shadow-[6px_6px_0_rgba(16,16,16,0.16)]">
            {systemStack.label}
          </p>
          <p className="m-0 text-[1.12rem] font-bold leading-[1.45] text-[#2f2f2f] max-[640px]:text-base">
            {systemStack.description}
          </p>
        </div>

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
            description="La seccion ya escucha el backend y mostrara los logos en cuanto se registren tecnologias desde el panel."
          />
        ) : null}
      </div>

      {technologiesState?.isLoading ? (
        <div className="mt-8 w-full">
          <SkillsLoadingState />
        </div>
      ) : null}

      {!technologiesState?.isLoading &&
      !technologiesState?.error &&
      !technologiesState?.isEmpty ? (
        <div className="mt-8 w-full">
          <div className="mx-auto w-full max-w-[1640px]">
            <SkillsResponsiveGrid items={technologies} />

            <div className="hidden gap-5 overflow-hidden lg:grid">
              <HomeTechnologyGroup
                items={technologies}
                direction="left-to-right"
                duration="44s"
                offset="-12%"
              />
              <HomeTechnologyGroup
                items={lowerRowTechnologies}
                direction="right-to-left"
                duration="40s"
                offset="-34%"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default SkillsSection

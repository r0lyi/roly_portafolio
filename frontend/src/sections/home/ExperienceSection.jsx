import HomeExperienceCard from '../../components/home/HomeExperienceCard.jsx'
import HomeSectionHeading from '../../components/home/HomeSectionHeading.jsx'
import HomeSectionShell from '../../components/home/HomeSectionShell.jsx'
import { portfolioData } from '../../data/portfolio.js'
import HomeSectionStateCard from '../../components/ui/HomeSectionStateCard.jsx'
import {
  homeHeadingDarkBadgeClass,
  homePanelClass,
} from '../../styles/homeBrutalistClasses.js'

function ExperiencesLoadingState() {
  return (
    <div className="grid gap-[18px]">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={`experience-skeleton-${index}`}
          className={`grid gap-5 px-[14px] py-[18px] sm:px-[18px] sm:py-[22px] md:[grid-template-columns:minmax(170px,220px)_minmax(0,1fr)] ${homePanelClass}`}
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
    <HomeSectionShell
      id="experience"
      backgroundClassName="bg-[#f2f0e8]"
      contentClassName="grid gap-6 sm:gap-[34px]"
    >
      <HomeSectionHeading
        label={experienceLog.label}
        labelClassName={homeHeadingDarkBadgeClass}
      />

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
            <HomeExperienceCard key={item.id} experience={item} />
          ))}
        </div>
      ) : null}
    </HomeSectionShell>
  )
}

export default ExperienceSection

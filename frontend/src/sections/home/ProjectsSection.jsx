import HomeProjectCard from '../../components/home/HomeProjectCard.jsx'
import HomeSectionHeading from '../../components/home/HomeSectionHeading.jsx'
import HomeSectionStateCard from '../../components/ui/HomeSectionStateCard.jsx'
import { portfolioData } from '../../data/portfolio.js'
import {
  homeHeadingTextLabelClass,
  homePanelClass,
  homeSectionBaseClass,
  homeSectionContainerClass,
} from '../../styles/homeBrutalistClasses.js'

function ProjectsLoadingState() {
  return (
    <div className="mx-auto grid w-full max-w-[1560px] gap-8 xl:grid-cols-2">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={`project-skeleton-${index}`}
          className={`h-full overflow-hidden ${homePanelClass}`}
        >
          <div className="border-b-[4px] border-[#101010] p-4 sm:p-5 lg:p-6">
            <div className="grid gap-4 lg:gap-5">
              <div className="rounded-[28px] border border-[#d7d0c0] bg-[#f6f2e9] p-3 sm:p-4">
                <div className="aspect-[16/9] animate-pulse rounded-[22px] bg-[linear-gradient(135deg,#ece6d6_0%,#ddd5c2_100%)]" />
              </div>

              <div className="grid grid-flow-col auto-cols-[minmax(96px,1fr)] gap-3 overflow-hidden sm:auto-cols-[minmax(120px,1fr)] lg:auto-cols-[minmax(136px,1fr)]">
                {Array.from({ length: 4 }, (_, thumbIndex) => (
                  <div
                    key={`project-skeleton-thumb-${index}-${thumbIndex}`}
                    className="aspect-[16/10] animate-pulse rounded-[18px] border border-[#d7d0c0] bg-[#ece5d0]"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-4 pb-3 sm:p-5 sm:pb-4 lg:gap-6 lg:p-6">
            <div className="grid gap-3">
              <div className="h-4 w-24 animate-pulse bg-[#d8d0bc]" />
              <div className="h-12 w-2/3 animate-pulse bg-[#d8d0bc]" />
              <div className="h-24 animate-pulse bg-[#eee8d7]" />
            </div>

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }, (_, tagIndex) => (
                <span
                  key={`project-skeleton-tag-${tagIndex}`}
                  className="h-7 w-20 animate-pulse bg-[#ece5d0]"
                />
              ))}
            </div>

            <div className="h-12 animate-pulse bg-[#d8d0bc]" />
          </div>
        </div>
      ))}
    </div>
  )
}

function ProjectsSection({ projectsState }) {
  const { selectedWorks } = portfolioData
  const dynamicProjects = projectsState?.data ?? []

  return (
    <section id="projects" className={`${homeSectionBaseClass} bg-[#f2f0e8]`}>
      <div className={`${homeSectionContainerClass} grid gap-6 sm:gap-[30px]`}>
        <HomeSectionHeading
          label={selectedWorks.label}
          labelClassName={homeHeadingTextLabelClass}
        />

        {!projectsState?.isLoading && projectsState?.error ? (
          <HomeSectionStateCard
            eyebrow="Error de sincronizacion"
            title="No fue posible cargar los proyectos."
            description={projectsState.error}
            actionLabel="Reintentar"
            onAction={projectsState.retry}
          />
        ) : null}

        {!projectsState?.isLoading &&
        !projectsState?.error &&
        projectsState?.isEmpty ? (
          <HomeSectionStateCard
            eyebrow="Sin proyectos"
            title="Todavia no hay proyectos publicados."
            description="La seccion ya esta conectada al backend y mantendra su estructura en cuanto exista contenido real."
          />
        ) : null}
      </div>

      {projectsState?.isLoading ? (
        <div className="mt-8 w-full px-4 sm:px-6">
          <ProjectsLoadingState />
        </div>
      ) : null}

      {!projectsState?.isLoading &&
      !projectsState?.error &&
      !projectsState?.isEmpty ? (
        <div className="mt-8 w-full px-4 sm:px-6">
          <div className="mx-auto grid w-full max-w-[1560px] gap-8 xl:grid-cols-2">
            {dynamicProjects.map((project) => (
              <HomeProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default ProjectsSection

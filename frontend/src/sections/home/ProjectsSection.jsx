import HomeProjectCard from '../../components/home/HomeProjectCard.jsx'
import HomeSectionHeading from '../../components/home/HomeSectionHeading.jsx'
import HomeSectionShell from '../../components/home/HomeSectionShell.jsx'
import HomeSectionStateCard from '../../components/ui/HomeSectionStateCard.jsx'
import { portfolioData } from '../../data/portfolio.js'
import {
  homeHeadingTextLabelClass,
  homePanelClass,
} from '../../styles/homeBrutalistClasses.js'

function ProjectsLoadingState() {
  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={`project-skeleton-${index}`}
          className={`overflow-hidden ${homePanelClass}`}
        >
          <div className="aspect-[16/11] animate-pulse border-b-[4px] border-[#101010] bg-[linear-gradient(135deg,#e6e1d3_0%,#d7d1bf_100%)]" />
          <div className="grid gap-4 p-4">
            <div className="h-4 w-24 animate-pulse bg-[#d8d0bc]" />
            <div className="h-10 w-2/3 animate-pulse bg-[#d8d0bc]" />
            <div className="h-20 animate-pulse bg-[#eee8d7]" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }, (_, tagIndex) => (
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
    <HomeSectionShell
      id="projects"
      backgroundClassName="bg-[#f2f0e8]"
      contentClassName="grid gap-6 sm:gap-[30px]"
    >
      <HomeSectionHeading
        label={selectedWorks.label}
        labelClassName={homeHeadingTextLabelClass}
      />

      {projectsState?.isLoading ? <ProjectsLoadingState /> : null}

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

      {!projectsState?.isLoading &&
      !projectsState?.error &&
      !projectsState?.isEmpty ? (
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {dynamicProjects.map((project) => (
            <HomeProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : null}
    </HomeSectionShell>
  )
}

export default ProjectsSection

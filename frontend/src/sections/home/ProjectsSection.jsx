import { portfolioData } from '../../data/portfolio.js'
import HomeSectionStateCard from '../../components/ui/HomeSectionStateCard.jsx'
import { resolveImageAssetUrl } from '../../utils/resolveImageAssetUrl.js'

function ProjectVisual({ imageUrl, title }) {
  const baseClassName =
    'relative aspect-[16/11] overflow-hidden border-b-[4px] border-[#101010] bg-[#101010]'

  if (imageUrl) {
    return (
      <div className={baseClassName}>
        <img
          className="h-full w-full object-cover"
          src={resolveImageAssetUrl(imageUrl)}
          alt={`Vista previa de ${title}`}
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div
      className={`${baseClassName} [background:radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_24%),linear-gradient(135deg,#101820_0%,#143941_58%,#2e6558_100%)]`}
      aria-hidden="true"
    >
      <span className="absolute inset-0 [background:linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.08)_42%,transparent_100%)]" />
      <div className="absolute inset-x-5 bottom-5 grid gap-2">
        <span className="w-fit border-[2px] border-[rgba(255,255,255,0.28)] px-2 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/80">
          Sin preview
        </span>
        <p className="m-0 max-w-[12ch] font-['Manrope'] text-[clamp(1.4rem,3vw,2rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.05em] text-white">
          {title}
        </p>
      </div>
    </div>
  )
}

function ProjectActions({ links, statusLabel }) {
  if (links.length === 0) {
    return (
      <div className="mt-auto inline-flex w-full items-center justify-center border-[3px] border-[#101010] bg-[#ece7d6] px-4 py-[0.88rem] text-[0.88rem] font-black uppercase tracking-[0.04em] text-[#505050]">
        {statusLabel}
      </div>
    )
  }

  if (links.length === 1) {
    const [link] = links

    return (
      <a
        className={`mt-auto inline-flex w-full items-center justify-center gap-2.5 border-[4px] border-[#101010] px-4 py-[0.82rem] font-black uppercase tracking-[-0.02em] text-[#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#101010] ${
          link.tone === 'primary' ? 'bg-[#18ff48]' : 'bg-white'
        }`}
        href={link.href}
        target="_blank"
        rel="noreferrer"
      >
        <span>{link.label}</span>
        <span aria-hidden="true">↗</span>
      </a>
    )
  }

  return (
    <div className="mt-auto grid gap-3 min-[460px]:grid-cols-2">
      {links.map((link) => (
        <a
          key={`${link.label}-${link.href}`}
          className={`inline-flex w-full items-center justify-center gap-2.5 border-[4px] border-[#101010] px-4 py-[0.82rem] font-black uppercase tracking-[-0.02em] text-[#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#101010] ${
            link.tone === 'primary' ? 'bg-[#18ff48]' : 'bg-white'
          }`}
          href={link.href}
          target="_blank"
          rel="noreferrer"
        >
          <span>{link.label}</span>
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  )
}

function ProjectsLoadingState() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 max-[960px]:grid-cols-2 max-[640px]:grid-cols-1">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={`project-skeleton-${index}`}
          className="overflow-hidden border-[4px] border-[#101010] bg-[#fffef8] shadow-[8px_8px_0_rgba(16,16,16,0.12)]"
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
    <section id="projects" className="border-t-[4px] border-[#101010] bg-[#f2f0e8] py-[84px] max-[640px]:py-14">
      <div className="mx-auto grid w-full max-w-[1180px] gap-[30px] px-6">
        <div className="grid grid-cols-[auto_minmax(0,_1fr)] items-center gap-[18px] max-[960px]:grid-cols-1 max-[960px]:gap-[14px]">
          <p className="m-0 text-[clamp(2rem,4.8vw,3.5rem)] font-black uppercase leading-none tracking-[-0.06em] text-[#101010] max-[640px]:text-[clamp(1.8rem,10vw,2.8rem)]">
            {selectedWorks.label}
          </p>
          <span className="block h-1 bg-[#101010]" aria-hidden="true" />
        </div>

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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-5 max-[960px]:grid-cols-2 max-[640px]:grid-cols-1">
            {dynamicProjects.map((project) => (
              <article
                key={project.id}
                className="grid grid-rows-[auto_1fr] overflow-hidden border-[4px] border-[#101010] bg-[#fffef8] shadow-[8px_8px_0_rgba(16,16,16,0.16)] max-[640px]:shadow-[6px_6px_0_rgba(16,16,16,0.16)]"
              >
                <ProjectVisual imageUrl={project.imageUrl} title={project.title} />

                <div className="grid content-start gap-[14px] p-4 pb-3 max-[640px]:p-[14px] max-[640px]:pb-[12px]">
                  {project.createdAtLabel ? (
                    <p className="m-0 text-[0.72rem] font-black uppercase tracking-[0.16em] text-[#5b5b5b]">
                      Publicado {project.createdAtLabel}
                    </p>
                  ) : null}

                  <h3 className="m-0 font-['Manrope'] text-[clamp(1.55rem,2vw,2rem)] font-black uppercase leading-[0.96] tracking-[-0.05em] text-[#101010]">
                    {project.title}
                  </h3>

                  <p className="m-0 text-[0.98rem] font-bold leading-[1.5] text-[#4f4f4f] max-[640px]:text-[0.92rem]">
                    {project.description}
                  </p>

                  <ul className="m-0 flex flex-wrap gap-2 p-0" aria-label={`Stack de ${project.title}`}>
                    {(project.stack.length > 0 ? project.stack : ['Sin stack']).map((tag) => (
                      <li
                        key={tag}
                        className={`list-none border-[2px] px-[0.5rem] py-[0.28rem] text-[0.68rem] font-black uppercase leading-none ${
                          tag === 'Sin stack'
                            ? 'border-[#a6a6a6] text-[#707070]'
                            : 'border-[#101010] text-[#101010]'
                        }`}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <ProjectActions
                    links={project.links}
                    statusLabel={project.statusLabel}
                  />
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ProjectsSection

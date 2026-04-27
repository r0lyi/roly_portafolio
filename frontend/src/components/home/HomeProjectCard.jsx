import { resolveImageAssetUrl } from '../../utils/resolveImageAssetUrl.js'
import {
  homeButtonMutedBlockClass,
  homeButtonNeutralClass,
  homeButtonPrimaryClass,
  homePanelClass,
} from '../../styles/homeBrutalistClasses.js'

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

function ProjectActionLink({ href, label, tone }) {
  const className =
    tone === 'primary' ? homeButtonPrimaryClass : homeButtonNeutralClass

  return (
    <a
      className={`${className} w-full`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span>{label}</span>
      <span aria-hidden="true">↗</span>
    </a>
  )
}

function ProjectActions({ links, statusLabel }) {
  if (links.length === 0) {
    return <div className={homeButtonMutedBlockClass}>{statusLabel}</div>
  }

  if (links.length === 1) {
    const [link] = links

    return (
      <div className="mt-auto">
        <ProjectActionLink href={link.href} label={link.label} tone={link.tone} />
      </div>
    )
  }

  return (
    <div className="mt-auto grid gap-3 sm:grid-cols-2">
      {links.map((link) => (
        <ProjectActionLink
          key={`${link.label}-${link.href}`}
          href={link.href}
          label={link.label}
          tone={link.tone}
        />
      ))}
    </div>
  )
}

function HomeProjectCard({ project }) {
  return (
    <article className={`grid grid-rows-[auto_1fr] overflow-hidden ${homePanelClass}`}>
      <ProjectVisual imageUrl={project.imageUrl} title={project.title} />

      <div className="grid content-start gap-[14px] p-4 pb-3 sm:p-5 sm:pb-4">
        {project.createdAtLabel ? (
          <p className="m-0 text-[0.72rem] font-black uppercase tracking-[0.16em] text-[#5b5b5b]">
            Publicado {project.createdAtLabel}
          </p>
        ) : null}

        <h3 className="m-0 font-['Manrope'] text-[clamp(1.55rem,2vw,2rem)] font-black uppercase leading-[0.96] tracking-[-0.05em] text-[#101010]">
          {project.title}
        </h3>

        <p className="m-0 text-[0.94rem] font-bold leading-[1.55] text-[#4f4f4f] sm:text-[0.98rem]">
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

        <ProjectActions links={project.links} statusLabel={project.statusLabel} />
      </div>
    </article>
  )
}

export default HomeProjectCard

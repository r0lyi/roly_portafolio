import { useState } from 'react'
import { resolveImageAssetUrl } from '../../utils/resolveImageAssetUrl.js'
import {
  homeButtonMutedBlockClass,
  homeButtonNeutralClass,
  homeButtonPrimaryClass,
  homePanelClass,
} from '../../styles/homeBrutalistClasses.js'

function ProjectVisualEmptyState({ title }) {
  return (
    <div
      className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-[#d7d0c0] bg-[linear-gradient(180deg,#faf7f0_0%,#f2ede0_100%)] p-4 sm:p-5"
      aria-hidden="true"
    >
      <div className="flex h-full items-end rounded-[22px] border border-[rgba(16,16,16,0.06)] bg-white p-6 sm:p-8">
        <div className="grid gap-2">
          <span className="w-fit rounded-full border border-[#d7d0c0] bg-[#f7f3e9] px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#66604f]">
            Sin preview
          </span>
          <p className="m-0 max-w-[14ch] font-['Manrope'] text-[clamp(1.35rem,3vw,2rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.05em] text-[#101010]">
            {title}
          </p>
        </div>
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

function ProjectVisualGallery({ project, activeImageId, onSelectImage, layout }) {
  const activeImage =
    project.images.find((image) => image.id === activeImageId) ?? project.images[0]
  const isFeaturedLayout = layout === 'featured'

  if (!activeImage) {
    return <ProjectVisualEmptyState title={project.title} />
  }

  return (
    <div
      className={`grid gap-4 lg:gap-5 ${
        isFeaturedLayout && project.images.length > 1
          ? 'xl:grid-cols-[108px_minmax(0,1fr)] xl:items-start'
          : ''
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[28px] border border-[#d7d0c0] bg-[#f6f2e9] p-3 sm:p-4 ${
          isFeaturedLayout && project.images.length > 1 ? 'xl:order-2' : ''
        }`}
      >
        <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(16,16,16,0.12)_50%,transparent_100%)]" />
        <div
          className={`relative overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.06)] bg-white ${
            isFeaturedLayout ? 'aspect-[16/10] xl:min-h-[460px]' : 'aspect-[16/9]'
          }`}
        >
          <img
            className="h-full w-full object-contain object-center"
            src={resolveImageAssetUrl(activeImage.imageUrl)}
            alt={`Vista principal de ${project.title}`}
            loading="lazy"
          />
        </div>
      </div>

      {project.images.length > 1 ? (
        <div
          className={`grid gap-3 [scrollbar-width:thin] ${
            isFeaturedLayout
              ? 'order-2 grid-flow-col auto-cols-[minmax(96px,1fr)] overflow-x-auto pb-1 sm:auto-cols-[minmax(120px,1fr)] xl:order-1 xl:max-h-[540px] xl:grid-flow-row xl:auto-cols-auto xl:auto-rows-max xl:overflow-y-auto xl:overflow-x-visible xl:pb-0 xl:pr-2'
              : 'grid-flow-col auto-cols-[minmax(96px,1fr)] overflow-x-auto pb-1 sm:auto-cols-[minmax(120px,1fr)] lg:auto-cols-[minmax(136px,1fr)]'
          }`}
        >
          {project.images.map((image, index) => {
            const isActive = image.id === activeImageId

            return (
              <button
                key={image.id}
                type="button"
                className={`group relative overflow-hidden rounded-[18px] border p-0 text-left transition duration-200 ${
                  isActive
                    ? 'border-[#101010] bg-white shadow-[0_0_0_1px_rgba(16,16,16,0.05)]'
                    : 'border-[#d7d0c0] bg-[#f7f2e8] hover:border-[#101010] hover:-translate-y-0.5'
                } ${isFeaturedLayout ? 'xl:w-full' : ''}`}
                onClick={() => onSelectImage(image.id)}
                aria-pressed={isActive}
                aria-label={`Ver captura ${index + 1} de ${project.title}`}
                title={`Captura ${index + 1}`}
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[17px] bg-[#ede7d8]">
                  <img
                    className={`h-full w-full object-cover transition duration-200 ${
                      isActive ? 'scale-[1.01]' : 'opacity-80 group-hover:opacity-100'
                    }`}
                    src={resolveImageAssetUrl(image.imageUrl)}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <span
                  className={`pointer-events-none absolute inset-0 rounded-[18px] ring-2 ring-inset ${
                    isActive ? 'ring-[#101010]' : 'ring-transparent'
                  }`}
                />
                <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/92 px-2 py-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-[#101010]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function HomeProjectCard({ project, layout = 'default' }) {
  const [activeImageId, setActiveImageId] = useState(project.images[0]?.id ?? null)
  const resolvedActiveImageId = project.images.some(
    (image) => image.id === activeImageId,
  )
    ? activeImageId
    : project.images[0]?.id ?? null
  const isFeaturedLayout = layout === 'featured'

  return (
    <article
      className={`grid h-full gap-0 overflow-hidden ${homePanelClass} ${
        isFeaturedLayout
          ? 'xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] xl:grid-rows-1'
          : 'grid-rows-[auto_1fr]'
      }`}
    >
      <div
        className={`p-4 sm:p-5 lg:p-6 ${
          isFeaturedLayout
            ? 'border-b-[4px] border-[#101010] xl:border-r-[4px] xl:border-b-0'
            : 'border-b-[4px] border-[#101010]'
        }`}
      >
        <ProjectVisualGallery
          project={project}
          activeImageId={resolvedActiveImageId}
          onSelectImage={setActiveImageId}
          layout={layout}
        />
      </div>

      <div
        className={`grid h-full content-start gap-5 p-4 pb-3 sm:p-5 sm:pb-4 lg:gap-6 lg:p-6 ${
          isFeaturedLayout ? 'xl:content-center xl:p-8' : ''
        }`}
      >
        <div className="grid gap-3">
          {project.createdAtLabel ? (
            <p className="m-0 text-[0.72rem] font-black uppercase tracking-[0.16em] text-[#5b5b5b]">
              Publicado {project.createdAtLabel}
            </p>
          ) : null}

          <h3
            className={`m-0 font-['Manrope'] font-black uppercase leading-[0.94] tracking-[-0.06em] text-[#101010] ${
              isFeaturedLayout
                ? 'text-[clamp(2rem,2.9vw,3rem)]'
                : 'text-[clamp(1.75rem,2.7vw,2.5rem)]'
            }`}
          >
            {project.title}
          </h3>

          <p
            className={`m-0 max-w-none font-bold leading-[1.65] text-[#4f4f4f] ${
              isFeaturedLayout ? 'text-[1rem] xl:text-[1.04rem]' : 'text-[0.98rem]'
            }`}
          >
            {project.description}
          </p>
        </div>

        <ul className="m-0 flex flex-wrap gap-2 p-0" aria-label={`Stack de ${project.title}`}>
          {(project.stack.length > 0 ? project.stack : ['Sin stack']).map((tag) => (
            <li
              key={tag}
              className={`list-none border-[2px] px-[0.56rem] py-[0.34rem] text-[0.68rem] font-black uppercase leading-none ${
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

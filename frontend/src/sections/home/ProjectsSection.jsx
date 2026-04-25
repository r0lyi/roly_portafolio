import { portfolioData } from '../../data/portfolio.js'
import { resolveImageAssetUrl } from '../../utils/resolveImageAssetUrl.js'

function ProjectVisual({ variant, imageUrl, title }) {
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

  if (variant === 'portrait') {
    return (
      <div
        className={`${baseClassName} [background:radial-gradient(circle_at_34%_38%,rgba(173,255,202,0.12),transparent_20%),linear-gradient(90deg,#161d16_0%,#050505_100%)]`}
        aria-hidden="true"
      >
        <div className="absolute inset-0">
          <span className="absolute bottom-[34%] left-[26%] aspect-[1/1.18] w-[26%] rounded-[46%_46%_52%_52%/_40%_40%_54%_54%] bg-[linear-gradient(180deg,#e7c7b3_0%,#d5a483_100%)] shadow-[inset_0_-10px_18px_rgba(0,0,0,0.16),0_0_40px_rgba(255,255,255,0.08)] before:absolute before:inset-[-10%_-3%_46%_-3%] before:rounded-[48%_48%_22%_22%] before:bg-[#1a1a1a] before:content-['']" />
          <span className="absolute bottom-[28%] left-[36%] h-[8%] w-[7%] rounded-b-[12px] bg-[#c89271]" />
          <span className="absolute bottom-[-10%] left-[18%] h-[48%] w-[48%] rounded-[42%_42%_0_0] bg-[#24262a] [background-image:linear-gradient(180deg,rgba(255,255,255,0.1),transparent_25%)]" />
        </div>
      </div>
    )
  }

  if (variant === 'vault') {
    return (
      <div
        className={`${baseClassName} [background:radial-gradient(circle_at_50%_4%,rgba(255,255,255,0.9),transparent_12%),linear-gradient(180deg,#14221c_0%,#050505_66%)]`}
        aria-hidden="true"
      >
        <div className="absolute inset-0">
          <span className="absolute left-1/2 top-[2%] aspect-square w-[18%] -translate-x-1/2 rounded-[999px] [background:radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(244,255,249,0.2)_62%,transparent_70%)]" />
          <span className="absolute bottom-[16%] left-1/2 h-[54%] w-[24%] -translate-x-1/2 rounded-[18px_18px_10px_10px] bg-[#050505] [background-image:linear-gradient(180deg,rgba(255,255,255,0.14),transparent_18%),linear-gradient(180deg,#111_0%,#050505_100%)] shadow-[0_0_40px_rgba(182,255,217,0.08),inset_0_0_22px_rgba(255,255,255,0.06)] before:absolute before:bottom-[-2%] before:left-[-18%] before:h-[34%] before:w-[38%] before:rounded-[999px_999px_0_0] before:bg-[#080808] before:content-[''] after:absolute after:bottom-[-2%] after:right-[-18%] after:h-[34%] after:w-[38%] after:rounded-[999px_999px_0_0] after:bg-[#080808] after:content-['']" />
          <span className="absolute bottom-[10%] left-[8%] right-[8%] h-[2px] [background:linear-gradient(90deg,transparent_0%,rgba(196,255,223,0.24)_18%,rgba(196,255,223,0.24)_82%,transparent_100%)]" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${baseClassName} [background:radial-gradient(circle_at_56%_28%,rgba(255,255,255,0.12),transparent_24%),linear-gradient(180deg,#1a1b1f_0%,#0d0d0f_100%)]`}
      aria-hidden="true"
    >
      <div className="absolute inset-0">
        <span className="absolute left-1/2 top-[12%] aspect-square w-[14%] -translate-x-1/2 rounded-[999px] bg-[linear-gradient(180deg,#f0c8ab_0%,#dea280_100%)]" />
        <span className="absolute bottom-0 left-1/2 h-[62%] w-[34%] -translate-x-1/2 rounded-t-[28px] bg-[#a9ccee] [background-image:linear-gradient(180deg,rgba(255,255,255,0.2),transparent_22%)] before:absolute before:bottom-0 before:left-[-16%] before:h-[58%] before:w-[24%] before:rounded-tl-[22px] before:bg-[#9bc2e6] before:content-[''] after:absolute after:bottom-0 after:right-[-16%] after:h-[58%] after:w-[24%] after:rounded-tr-[22px] after:bg-[#9bc2e6] after:content-['']" />
        <span className="absolute left-1/2 top-[28%] -translate-x-1/2 text-[clamp(2.4rem,4.6vw,4rem)] font-black leading-none text-[rgba(80,110,140,0.44)]">
          3
        </span>
      </div>
    </div>
  )
}

function ProjectsSection() {
  const { selectedWorks, projects } = portfolioData

  return (
    <section id="projects" className="border-t-[4px] border-[#101010] bg-[#f2f0e8] py-[84px] max-[640px]:py-14">
      <div className="mx-auto grid w-full max-w-[1180px] gap-[30px] px-6">
        <div className="grid grid-cols-[auto_minmax(0,_1fr)] items-center gap-[18px] max-[960px]:grid-cols-1 max-[960px]:gap-[14px]">
          <p className="m-0 text-[clamp(2rem,4.8vw,3.5rem)] font-black uppercase leading-none tracking-[-0.06em] text-[#101010] max-[640px]:text-[clamp(1.8rem,10vw,2.8rem)]">
            {selectedWorks.label}
          </p>
          <span className="block h-1 bg-[#101010]" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 max-[960px]:grid-cols-2 max-[640px]:grid-cols-1">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="grid grid-rows-[auto_1fr] overflow-hidden border-[4px] border-[#101010] bg-[#fffef8] shadow-[8px_8px_0_rgba(16,16,16,0.16)] max-[640px]:shadow-[6px_6px_0_rgba(16,16,16,0.16)]"
            >
              <ProjectVisual
                variant={project.visual}
                imageUrl={project.imageUrl}
                title={project.title}
              />

              <div className="grid content-start gap-[14px] p-4 pb-3 max-[640px]:p-[14px] max-[640px]:pb-[10px]">
                <h3 className="m-0 font-['Manrope'] text-[clamp(1.45rem,2vw,1.9rem)] font-black uppercase leading-[0.96] tracking-[-0.05em] text-[#101010] max-[640px]:text-[1.65rem]">
                  {project.title}
                </h3>
                <p className="m-0 text-[0.96rem] font-bold leading-[1.45] text-[#515151] max-[640px]:text-[0.9rem]">
                  {project.description}
                </p>

                <ul className="m-0 flex flex-wrap gap-2 p-0" aria-label={`Stack de ${project.title}`}>
                  {project.stack.map((tag) => (
                    <li
                      key={tag}
                      className="list-none border-[2px] border-[#6f6f6f] px-[0.42rem] py-[0.24rem] text-[0.66rem] font-black uppercase leading-none text-[#4a4a4a]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <a
                  className={`mt-auto inline-flex w-full items-center justify-center gap-2.5 border-[4px] border-[#101010] px-4 py-[0.82rem] font-black uppercase tracking-[-0.02em] text-[#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#101010] ${
                    index === 0 ? 'bg-[#18ff48]' : 'bg-white'
                  }`}
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>VIEW REPOSITORY</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection

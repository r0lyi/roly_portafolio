import { homePanelClass } from '../../styles/homeBrutalistClasses.js'

function HomeExperienceCard({ experience }) {
  return (
    <article
      className={`grid gap-5 px-[14px] py-[18px] sm:px-[18px] sm:py-[22px] sm:[grid-template-columns:minmax(160px,220px)_minmax(0,1fr)] ${homePanelClass}`}
    >
      <div className="grid content-start gap-3">
        <p className="m-0 w-fit border-[4px] border-[#101010] bg-[#101010] px-[0.72rem] py-[0.48rem] text-[0.84rem] font-black uppercase leading-none tracking-[0.02em] text-white">
          {experience.dateLabel}
        </p>
        <p className="m-0 text-[0.82rem] font-black uppercase tracking-[0.12em] text-[#5b5b5b]">
          {experience.company}
        </p>
      </div>

      <div className="grid gap-4">
        <h3 className="m-0 max-w-[18ch] font-['Manrope'] text-[clamp(1.55rem,3vw,2.25rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.05em] text-[#101010] max-[640px]:max-w-none">
          {experience.title}
        </h3>
        <p className="m-0 text-[0.94rem] font-bold leading-[1.58] text-[#3f3f3f] sm:text-[1rem]">
          {experience.description}
        </p>
      </div>
    </article>
  )
}

export default HomeExperienceCard

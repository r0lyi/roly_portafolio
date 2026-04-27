import {
  homeButtonInvertedClass,
  homePanelClass,
} from '../../styles/homeBrutalistClasses.js'

function HomeSectionStateCard({
  eyebrow = 'Estado',
  title,
  description,
  actionLabel = 'Reintentar',
  onAction,
}) {
  return (
    <div className={`${homePanelClass} p-5 sm:p-6`}>
      <p className="m-0 text-[0.72rem] font-black uppercase tracking-[0.16em] text-[#5b5b5b]">
        {eyebrow}
      </p>
      <h3 className="mt-3 m-0 max-w-[18ch] font-['Manrope'] text-[clamp(1.4rem,3vw,2rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.05em] text-[#101010] max-[640px]:max-w-none">
        {title}
      </h3>
      <p className="mt-4 mb-0 max-w-[58ch] text-[1rem] font-bold leading-[1.55] text-[#4b4b4b] max-[640px]:text-[0.94rem]">
        {description}
      </p>

      {onAction ? (
        <button
          type="button"
          className={`mt-5 ${homeButtonInvertedClass}`}
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}

export default HomeSectionStateCard

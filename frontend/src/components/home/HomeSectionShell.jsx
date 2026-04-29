import {
  homeSectionBaseClass,
  homeSectionContainerClass,
} from '../../styles/homeBrutalistClasses.js'

function HomeSectionShell({
  id,
  backgroundClassName,
  contentClassName = 'grid gap-6 sm:gap-8',
  children,
}) {
  return (
    <section id={id} className={`${homeSectionBaseClass} ${backgroundClassName}`.trim()}>
      <div className={`${homeSectionContainerClass} ${contentClassName}`}>{children}</div>
    </section>
  )
}

export default HomeSectionShell

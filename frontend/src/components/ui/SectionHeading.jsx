import {
  adminSectionDescriptionClass,
  eyebrowClass,
  sectionHeadingClass,
} from '../../styles/tailwindClasses.js'

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="grid gap-4">
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className={sectionHeadingClass}>{title}</h2>
      <p className={adminSectionDescriptionClass}>{description}</p>
    </div>
  )
}

export default SectionHeading

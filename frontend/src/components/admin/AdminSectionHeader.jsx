import {
  adminSectionActionsClass,
  adminSectionCopyClass,
  adminSectionDescriptionClass,
  adminSectionHeaderClass,
  eyebrowClass,
  sectionHeadingClass,
} from '../../styles/tailwindClasses.js'

function AdminSectionHeader({ eyebrow, title, description, actions }) {
  return (
    <div className={adminSectionHeaderClass}>
      <div className={adminSectionCopyClass}>
        {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
        <h2 className={sectionHeadingClass}>{title}</h2>
        <p className={adminSectionDescriptionClass}>{description}</p>
      </div>

      {actions ? <div className={adminSectionActionsClass}>{actions}</div> : null}
    </div>
  )
}

export default AdminSectionHeader

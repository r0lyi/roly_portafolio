import {
  adminEyebrowClass,
  adminSectionActionsClass,
  adminSectionCopyClass,
  adminSectionDescriptionClass,
  adminSectionHeaderClass,
  adminSectionHeadingClass,
} from '../../styles/tailwindClasses.js'

function AdminSectionHeader({ eyebrow, title, description, actions }) {
  return (
    <div className={adminSectionHeaderClass}>
      <div className={adminSectionCopyClass}>
        {eyebrow ? <p className={adminEyebrowClass}>{eyebrow}</p> : null}
        <h2 className={adminSectionHeadingClass}>{title}</h2>
        <p className={adminSectionDescriptionClass}>{description}</p>
      </div>

      {actions ? <div className={adminSectionActionsClass}>{actions}</div> : null}
    </div>
  )
}

export default AdminSectionHeader

function AdminSectionHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="admin-section-header">
      <div className="admin-section-copy">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {actions ? <div className="admin-section-actions">{actions}</div> : null}
    </div>
  )
}

export default AdminSectionHeader

import { LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

function AdminSidebar({
  sections,
  activeSectionId,
  onSelectSection,
  userEmail,
  onLogout,
}) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-top">
        <p className="eyebrow">Admin console</p>
        <h2>Gestion del portfolio</h2>
        <p className="admin-sidebar-copy">
          Panel conectado al backend para administrar contenido, mensajes y
          cuenta del sistema.
        </p>
      </div>

      <div className="admin-sidebar-user">
        <span className="admin-sidebar-label">Sesion activa</span>
        <strong>{userEmail}</strong>
      </div>

      <nav className="admin-sidebar-nav" aria-label="Secciones del panel admin">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSectionId === section.id

          return (
            <button
              key={section.id}
              type="button"
              className={`admin-nav-button${isActive ? ' admin-nav-button-active' : ''}`}
              onClick={() => onSelectSection(section.id)}
            >
              <span className="admin-nav-icon">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <span className="admin-nav-copy">
                <strong>{section.label}</strong>
                <span>{section.description}</span>
              </span>
            </button>
          )
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <Link to="/" className="secondary-button admin-sidebar-link">
          Ver portfolio
        </Link>

        <button
          type="button"
          className="auth-link auth-link-danger admin-sidebar-link"
          onClick={onLogout}
        >
          <LogOut size={18} strokeWidth={2.2} />
          <span>Cerrar sesion</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar

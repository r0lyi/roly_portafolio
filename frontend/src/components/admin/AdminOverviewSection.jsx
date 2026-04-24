import { RefreshCcw } from 'lucide-react'
import AdminSectionHeader from './AdminSectionHeader.jsx'
import AdminStatusBanner from './AdminStatusBanner.jsx'

const overviewCards = [
  {
    key: 'projects',
    label: 'Proyectos',
    helper: 'Registros principales del portfolio.',
    target: 'projects',
  },
  {
    key: 'projectImages',
    label: 'Imagenes',
    helper: 'Recursos visuales ligados a proyectos.',
    target: 'project-images',
  },
  {
    key: 'technologies',
    label: 'Tecnologias',
    helper: 'Stack disponible para asociar.',
    target: 'technologies',
  },
  {
    key: 'experiences',
    label: 'Experiencias',
    helper: 'Trayectoria profesional editable.',
    target: 'experiences',
  },
  {
    key: 'messages',
    label: 'Mensajes',
    helper: 'Entradas del formulario de contacto.',
    target: 'messages',
  },
  {
    key: 'users',
    label: 'Usuario admin',
    helper: 'Cuenta del sistema protegida por backend.',
    target: 'account',
  },
]

function AdminOverviewSection({
  isLoading,
  stats,
  error,
  onRefresh,
  onSelectSection,
  userEmail,
}) {
  return (
    <section className="admin-module">
      <AdminSectionHeader
        eyebrow="Resumen general"
        title="Estado operativo del panel y de la base de datos."
        description="Desde aqui tienes una vista rapida de cuantas entidades hay cargadas y accesos directos a cada modulo de gestion."
        actions={
          <button type="button" className="secondary-button" onClick={onRefresh}>
            <RefreshCcw size={16} strokeWidth={2.2} />
            <span>Refrescar datos</span>
          </button>
        }
      />

      <AdminStatusBanner type="error" message={error} />

      <div className="admin-metric-grid">
        {overviewCards.map((card) => (
          <article key={card.key} className="admin-metric-card">
            <p className="card-meta">{card.label}</p>
            <h3>{isLoading ? '...' : stats[card.key]}</h3>
            <p>{card.helper}</p>
            <button
              type="button"
              className="admin-link-button"
              onClick={() => onSelectSection(card.target)}
            >
              Abrir modulo
            </button>
          </article>
        ))}
      </div>

      <div className="admin-highlight-grid">
        <article className="content-card admin-highlight-card">
          <p className="card-meta">Sesion autenticada</p>
          <h3>{userEmail}</h3>
          <p>
            El panel trabaja con la autenticacion del backend y reutiliza la
            capa `axios` ya conectada.
          </p>
        </article>

        <article className="content-card admin-highlight-card">
          <p className="card-meta">Cobertura del panel</p>
          <h3>CRUD funcional sobre recursos reales.</h3>
          <p>
            Proyectos, imagenes, tecnologias, experiencias y mensajes ya se
            gestionan consumiendo la API del backend.
          </p>
        </article>

        <article className="content-card admin-highlight-card">
          <p className="card-meta">Cuenta admin</p>
          <h3>Controlada por una politica de un unico usuario.</h3>
          <p>
            La cuenta del sistema se puede editar desde el panel, pero el
            backend sigue restringiendo el numero de administradores.
          </p>
        </article>
      </div>
    </section>
  )
}

export default AdminOverviewSection

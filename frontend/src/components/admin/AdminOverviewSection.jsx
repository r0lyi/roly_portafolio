import { RefreshCcw } from 'lucide-react'
import AdminSectionHeader from './AdminSectionHeader.jsx'
import AdminStatusBanner from './AdminStatusBanner.jsx'
import {
  adminLinkButtonClass,
  adminModuleClass,
  cardBodyClass,
  cardMetaClass,
  contentCardClass,
  secondaryButtonClass,
} from '../../styles/tailwindClasses.js'

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
    <section className={adminModuleClass}>
      <AdminSectionHeader
        eyebrow="Resumen general"
        title="Estado operativo del panel y de la base de datos."
        description="Desde aqui tienes una vista rapida de cuantas entidades hay cargadas y accesos directos a cada modulo de gestion."
        actions={
          <button type="button" className={secondaryButtonClass} onClick={onRefresh}>
            <RefreshCcw size={16} strokeWidth={2.2} />
            <span>Refrescar datos</span>
          </button>
        }
      />

      <AdminStatusBanner type="error" message={error} />

      <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3">
        {overviewCards.map((card) => (
          <article
            key={card.key}
            className="rounded-[32px] border border-[rgba(21,39,48,0.12)] bg-[rgba(255,255,255,0.76)] p-6 backdrop-blur-[16px]"
          >
            <p className={cardMetaClass}>{card.label}</p>
            <h3 className="mt-2 text-[clamp(2rem,5vw,2.8rem)] font-semibold text-[#112029]">
              {isLoading ? '...' : stats[card.key]}
            </h3>
            <p className={cardBodyClass}>{card.helper}</p>
            <button
              type="button"
              className={`mt-3 ${adminLinkButtonClass}`}
              onClick={() => onSelectSection(card.target)}
            >
              Abrir modulo
            </button>
          </article>
        ))}
      </div>

      <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3">
        <article className={contentCardClass}>
          <p className={cardMetaClass}>Sesion autenticada</p>
          <h3 className="mt-[10px] text-[1.18rem] font-semibold text-[#112029]">{userEmail}</h3>
          <p className={cardBodyClass}>
            El panel trabaja con la autenticacion del backend y reutiliza la
            capa `axios` ya conectada.
          </p>
        </article>

        <article className={contentCardClass}>
          <p className={cardMetaClass}>Cobertura del panel</p>
          <h3 className="mt-[10px] text-[1.18rem] font-semibold text-[#112029]">
            CRUD funcional sobre recursos reales.
          </h3>
          <p className={cardBodyClass}>
            Proyectos, imagenes, tecnologias, experiencias y mensajes ya se
            gestionan consumiendo la API del backend.
          </p>
        </article>

        <article className={contentCardClass}>
          <p className={cardMetaClass}>Cuenta admin</p>
          <h3 className="mt-[10px] text-[1.18rem] font-semibold text-[#112029]">
            Controlada por una politica de un unico usuario.
          </h3>
          <p className={cardBodyClass}>
            La cuenta del sistema se puede editar desde el panel, pero el
            backend sigue restringiendo el numero de administradores.
          </p>
        </article>
      </div>
    </section>
  )
}

export default AdminOverviewSection

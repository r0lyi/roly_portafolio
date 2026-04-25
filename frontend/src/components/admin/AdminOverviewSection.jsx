import { RefreshCcw } from 'lucide-react'
import AdminSectionHeader from './AdminSectionHeader.jsx'
import AdminStatusBanner from './AdminStatusBanner.jsx'
import {
  adminLinkButtonClass,
  adminModuleClass,
  adminPanelClass,
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
          <article key={card.key} className={`${adminPanelClass} grid gap-3 bg-[#fffef8]`}>
            <p className="m-0 text-[0.76rem] font-black uppercase tracking-[0.1em] text-[#101010]">
              {card.label}
            </p>
            <h3 className="m-0 font-['Manrope'] text-[clamp(2.4rem,7vw,3.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.06em] text-[#101010]">
              {isLoading ? '...' : stats[card.key]}
            </h3>
            <p className="m-0 text-[0.98rem] font-bold leading-[1.6] text-[#323232]">
              {card.helper}
            </p>
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
        <article className={`${adminPanelClass} grid gap-3 bg-[#fffef8]`}>
          <p className="m-0 text-[0.76rem] font-black uppercase tracking-[0.1em] text-[#101010]">
            Sesion autenticada
          </p>
          <h3 className="m-0 break-all font-['Manrope'] text-[1.35rem] font-extrabold uppercase leading-[1.05] tracking-[-0.04em] text-[#101010]">
            {userEmail}
          </h3>
          <p className="m-0 text-[0.98rem] font-bold leading-[1.6] text-[#323232]">
            El panel trabaja con la autenticacion del backend y reutiliza la
            capa `axios` ya conectada.
          </p>
        </article>

        <article className={`${adminPanelClass} grid gap-3 bg-[#fffef8]`}>
          <p className="m-0 text-[0.76rem] font-black uppercase tracking-[0.1em] text-[#101010]">
            Cobertura del panel
          </p>
          <h3 className="m-0 font-['Manrope'] text-[1.35rem] font-extrabold uppercase leading-[1.05] tracking-[-0.04em] text-[#101010]">
            CRUD funcional sobre recursos reales.
          </h3>
          <p className="m-0 text-[0.98rem] font-bold leading-[1.6] text-[#323232]">
            Proyectos, imagenes, tecnologias, experiencias y mensajes ya se
            gestionan consumiendo la API del backend.
          </p>
        </article>

        <article className={`${adminPanelClass} grid gap-3 bg-[#fffef8]`}>
          <p className="m-0 text-[0.76rem] font-black uppercase tracking-[0.1em] text-[#101010]">
            Cuenta admin
          </p>
          <h3 className="m-0 font-['Manrope'] text-[1.35rem] font-extrabold uppercase leading-[1.05] tracking-[-0.04em] text-[#101010]">
            Controlada por una politica de un unico usuario.
          </h3>
          <p className="m-0 text-[0.98rem] font-bold leading-[1.6] text-[#323232]">
            La cuenta del sistema se puede editar desde el panel, pero el
            backend sigue restringiendo el numero de administradores.
          </p>
        </article>
      </div>
    </section>
  )
}

export default AdminOverviewSection

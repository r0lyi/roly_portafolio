import { LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  dangerButtonClass,
  eyebrowClass,
  secondaryButtonClass,
} from '../../styles/tailwindClasses.js'

function AdminSidebar({
  sections,
  activeSectionId,
  onSelectSection,
  userEmail,
  onLogout,
}) {
  return (
    <aside className="sticky top-6 grid gap-5 rounded-[32px] border border-[rgba(21,39,48,0.12)] bg-[radial-gradient(circle_at_top_right,rgba(39,105,95,0.1),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,249,240,0.7))] p-6 backdrop-blur-[18px] max-[960px]:static">
      <div className="grid gap-3">
        <p className={eyebrowClass}>Admin console</p>
        <h2 className="m-0 max-w-none font-['Fraunces'] text-[clamp(1.9rem,3vw,2.4rem)] leading-[1.02] text-[#112029]">
          Gestion del portfolio
        </h2>
        <p className="m-0 text-[#5f7881]">
          Panel conectado al backend para administrar contenido, mensajes y
          cuenta del sistema.
        </p>
      </div>

      <div className="grid gap-1.5 rounded-[22px] border border-[rgba(21,39,48,0.12)] bg-[rgba(255,255,255,0.72)] px-[18px] py-4">
        <span className="text-[0.82rem] font-extrabold uppercase tracking-[0.08em] text-[#5f7881]">
          Sesion activa
        </span>
        <strong>{userEmail}</strong>
      </div>

      <nav className="grid gap-2.5" aria-label="Secciones del panel admin">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSectionId === section.id

          return (
            <button
              key={section.id}
              type="button"
              className={`flex w-full items-start gap-[14px] rounded-[22px] border px-4 py-[14px] text-left transition duration-200 ${
                isActive
                  ? 'border-transparent bg-[linear-gradient(135deg,#163a45,#214e59)] text-white shadow-[0_16px_34px_rgba(17,32,41,0.18)]'
                  : 'border-transparent bg-transparent text-[#112029] hover:-translate-y-px hover:border-[rgba(17,32,41,0.12)] hover:bg-[rgba(255,255,255,0.68)]'
              }`}
              onClick={() => onSelectSection(section.id)}
            >
              <span
                className={`inline-grid h-[38px] w-[38px] place-items-center rounded-[14px] ${
                  isActive
                    ? 'bg-[rgba(255,255,255,0.16)]'
                    : 'bg-[rgba(17,32,41,0.08)]'
                }`}
              >
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <span className="grid gap-1">
                <strong className="text-[0.98rem]">{section.label}</strong>
                <span className={isActive ? 'text-white/80' : 'text-[#5f7881]'}>
                  {section.description}
                </span>
              </span>
            </button>
          )
        })}
      </nav>

      <div className="grid gap-3">
        <Link to="/" className={`${secondaryButtonClass} w-full justify-center`}>
          Ver portfolio
        </Link>

        <button
          type="button"
          className={`${dangerButtonClass} w-full justify-center`}
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

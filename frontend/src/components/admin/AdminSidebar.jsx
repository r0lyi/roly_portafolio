import { LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  adminEyebrowClass,
  dangerButtonClass,
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
    <aside className="sticky top-6 grid gap-5 border-[4px] border-[#101010] bg-[#fffef8] p-5 shadow-[8px_8px_0_rgba(16,16,16,0.16)] max-[960px]:static">
      <div className="grid gap-3">
        <p className={adminEyebrowClass}>Admin console</p>
        <h2 className="m-0 max-w-none font-['Manrope'] text-[clamp(2rem,4vw,2.9rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.06em] text-[#101010]">
          Gestion brutal del portfolio
        </h2>
        <p className="m-0 text-[1rem] font-bold leading-[1.6] text-[#2f2f2f]">
          Panel conectado al backend para administrar contenido, mensajes y
          cuenta del sistema.
        </p>
      </div>

      <div className="grid gap-1.5 border-[3px] border-[#101010] bg-[#f2f0e8] px-[18px] py-4">
        <span className="text-[0.76rem] font-black uppercase tracking-[0.1em] text-[#101010]">
          Sesion activa
        </span>
        <strong className="break-all text-[1.02rem] text-[#101010]">{userEmail}</strong>
      </div>

      <nav className="grid gap-2.5" aria-label="Secciones del panel admin">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSectionId === section.id

          return (
            <button
              key={section.id}
              type="button"
              className={`flex w-full items-start gap-[14px] border-[3px] px-4 py-[14px] text-left transition duration-200 ${
                isActive
                  ? 'border-[#101010] bg-[#18ff48] text-[#101010] shadow-[6px_6px_0_#101010]'
                  : 'border-[#101010] bg-white text-[#101010] shadow-[4px_4px_0_rgba(16,16,16,0.14)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(16,16,16,0.16)]'
              }`}
              onClick={() => onSelectSection(section.id)}
            >
              <span
                className={`inline-grid h-[38px] w-[38px] place-items-center border-[3px] border-[#101010] ${
                  isActive
                    ? 'bg-white'
                    : 'bg-[#f2f0e8]'
                }`}
              >
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <span className="grid gap-1.5">
                <strong className="text-[0.94rem] font-black uppercase tracking-[0.02em]">
                  {section.label}
                </strong>
                <span className="text-[0.88rem] leading-[1.45] text-[#343434]">
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

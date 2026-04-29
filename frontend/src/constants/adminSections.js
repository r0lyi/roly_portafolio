import {
  Boxes,
  BriefcaseBusiness,
  FolderKanban,
  Images,
  Inbox,
  LayoutDashboard,
  ShieldUser,
} from 'lucide-react'

export const adminSections = [
  {
    id: 'overview',
    label: 'Resumen',
    description: 'Vista global del estado del portfolio.',
    icon: LayoutDashboard,
  },
  {
    id: 'projects',
    label: 'Proyectos',
    description: 'CRUD completo de proyectos y relaciones tecnicas.',
    icon: FolderKanban,
  },
  {
    id: 'project-images',
    label: 'Imagenes',
    description: 'Gestion detallada de la tabla project_image.',
    icon: Images,
  },
  {
    id: 'technologies',
    label: 'Tecnologias',
    description: 'Catalogo tecnico para asociar a proyectos.',
    icon: Boxes,
  },
  {
    id: 'experiences',
    label: 'Experiencias',
    description: 'Historial profesional editable desde el panel.',
    icon: BriefcaseBusiness,
  },
  {
    id: 'messages',
    label: 'Mensajes',
    description: 'Bandeja de contacto con estado de lectura.',
    icon: Inbox,
  },
  {
    id: 'account',
    label: 'Cuenta admin',
    description: 'Gestion del usuario administrador del sistema.',
    icon: ShieldUser,
  },
]

export const defaultAdminSectionId = adminSections[0].id

export function getAdminSectionById(sectionId) {
  return (
    adminSections.find((section) => section.id === sectionId) ??
    adminSections[0]
  )
}

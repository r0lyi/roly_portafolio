const contactEmail = 'rolysilguz10@gmail.com'
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`

export const portfolioData = {
  profile: {
    name: 'Roly',
    brand: 'ROLY_ENGINE',
    birthDate: '2005-01-27',
    role: 'Desarrollador Fullstack',
    heroTitleLead: 'CREANDO',
    heroTitleAccent: 'SISTEMAS',
    heroTitleLines: ['DIGITALES', 'QUE ESCALAN.'],
    summary:
      'Frontend y backend estructurados para escalar, con una interfaz sólida, componentes reutilizables y una arquitectura preparada para integrarse con tecnologías modernas y servicios robustos.',
    location: 'React + Vite / FastAPI',
    availability: 'Disponible para nuevas iteraciones',
    availabilityLabel: 'AVAILABLE_FOR_WORK',
    cvDownloadUrl: '/RolySilvestreGuzmán_DesarrolladorWeb_CV.pdf',
    cvDownloadName: 'RolySilvestreGuzman_DesarrolladorWeb_CV.pdf',
    socialLinks: [
      {
        label: 'GitHub',
        href: 'https://github.com/r0lyi',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/roly-silvestre-5242b0329',
      },
      {
        label: 'Gmail',
        href: gmailComposeUrl,
      },
    ],
  },
  about: {
    label: '¿QUIÉN SOY?',
    headline:
      'SOY DESARROLLADOR QUE DEFINE LA ESTRUCTURA Y EL RENDIMIENTO. MI PROCESO ES TÉCNICO, MI DISEÑO ES CONTUNDENTE Y MI CÓDIGO ES LIMPIO.',
    body:
      'Desde este lado del entorno digital, trabajo uniendo eficiencia backend con impacto frontend. Ya sea planteando una arquitectura escalable o construyendo una interfaz con carácter, priorizo siempre la claridad para quien usa el producto y para quien mantiene el código.',
    tickets: [
      'Aprendizaje rápido',
      'Análisis de datos',
      'Adaptabilidad rápida',
      'Buena comunicación',
      'Comerme el mundo',
      'Muy tranquilo y relajado',
    ],
  },
  experienceLog: {
    label: 'EXPERIENCE_LOG',
  },
  selectedWorks: {
    label: 'SELECTED_WORKS',
  },
  systemStack: {
    label: 'SYSTEM_STACK',
    description: 'Las herramientas con las que construyo, escalo y depuro sistemas.',
  },
  contact: {
    label: 'SECURE_CHANNEL',
    description: 'Escribe para colaboraciones, propuestas o simplemente para hablar de arquitectura.',
    submitLabel: 'SEND_MESSAGE >',
    footerLabel: 'ROLY_PORTFOLIO.SYS',
    email: contactEmail,
    gmailComposeUrl,
  },
}

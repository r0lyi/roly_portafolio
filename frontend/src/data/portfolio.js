export const portfolioData = {
  profile: {
    name: 'Roly',
    brand: 'ROLY_ENGINE',
    role: 'Desarrollador Fullstack',
    headline: 'Creando sistemas digitales que escalan con intención.',
    heroTitleLead: 'CREANDO',
    heroTitleAccent: 'SISTEMAS',
    heroTitleLines: ['DIGITALES', 'QUE ESCALAN.'],
    summary:
      'Frontend y backend organizados para crecer con una UI contundente, componentes reutilizables y una base lista para conectar con FastAPI.',
    location: 'React + Vite / FastAPI',
    availability: 'Disponible para nuevas iteraciones',
    availabilityLabel: 'AVAILABLE_FOR_WORK',
    socialLinks: [
      {
        label: 'GitHub',
        href: 'https://github.com/r0lyi',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/roly-silvestre-5242b0329',
      },
    ],
  },
  about: {
    label: '¿QUIÉN SOY?',
    headline:
      'CREO EN LA ESTRUCTURA, LA HONESTIDAD Y EL RENDIMIENTO. MI PROCESO ES TÉCNICO, MI DISEÑO ES CONTUNDENTE Y MI CÓDIGO ES LIMPIO.',
    body:
      'Desde este lado del entorno digital, trabajo uniendo eficiencia backend con impacto frontend. Ya sea planteando una arquitectura escalable o construyendo una interfaz con carácter, priorizo siempre la claridad para quien usa el producto y para quien mantiene el código.',
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
    items: [
      { label: 'JS/TS', icon: 'js' },
      { label: 'REACT', icon: 'react' },
      { label: 'NODE', icon: 'node' },
      { label: 'PYTHON', icon: 'python' },
      { label: 'DOCKER', icon: 'docker' },
      { label: 'POSTGRES', icon: 'postgres' },
      { label: 'AWS', icon: 'aws' },
      { label: 'GRAFANA', icon: 'grafana' },
    ],
  },
  architecture: [
    {
      title: 'app/',
      subtitle: 'Entrada y router',
      description:
        'Centraliza App y el enrutado para que el proyecto pueda crecer con providers, layouts y nuevas rutas.',
    },
    {
      title: 'pages/ + sections/',
      subtitle: 'Pantallas y bloques',
      description:
        'Las páginas orquestan el contenido y las secciones encapsulan cada bloque visual del portafolio.',
    },
    {
      title: 'components/',
      subtitle: 'Piezas reutilizables',
      description:
        'Aquí viven encabezados, tarjetas y navegación compartida para no repetir UI entre vistas.',
    },
    {
      title: 'services/api/',
      subtitle: 'Conexión con backend',
      description:
        'Las llamadas a proyectos, experiencias y mensajes quedan alineadas con tu API de FastAPI.',
    },
  ],
  projects: [
    {
      title: 'NEO_DASHBOARD',
      description:
        'Plataforma visual modular construida con React y Vite para iterar interfaces de alto rendimiento con una base limpia.',
      stack: ['REACT', 'VITE', 'UI'],
      repositoryUrl: 'https://github.com/tu-usuario/neo-dashboard',
      visual: 'portrait',
    },
    {
      title: 'GRID_VAULT',
      description:
        'Arquitectura de datos desacoplada para mover contenido estático a una capa conectada sin rehacer la experiencia visual.',
      stack: ['API', 'STATE', 'DATA'],
      repositoryUrl: 'https://github.com/tu-usuario/grid-vault',
      visual: 'vault',
    },
    {
      title: 'CORE_SHARD',
      description:
        'Capa de servicios pensada para conectar proyectos, experiencias y mensajería con una API real sin fricción.',
      stack: ['AXIOS', 'API', 'ADMIN'],
      repositoryUrl: 'https://github.com/tu-usuario/core-shard',
      visual: 'system',
    },
  ],
  experiences: [
    {
      role: 'BASE_FRONTEND',
      company: 'ARQUITECTURA_INICIAL',
      period: 'PHASE_1',
      featured: true,
      highlights: [
        'Separé `app`, `layouts`, `pages`, `sections` y `components` para evitar un arranque monolítico.',
        'Organicé una capa de servicios alineada con FastAPI para que el frontend crezca sin reescrituras.',
        'Definí una base visual consistente para iterar diseño sin mezclar estructura y contenido.',
      ],
    },
    {
      role: 'SCALABILITY_CORE',
      company: 'CAPAS_CLARAS',
      period: 'PHASE_2',
      highlights: [
        'Preparé el proyecto para sumar nuevas páginas, navegación y rutas protegidas sin fricción.',
        'Aislé las piezas reutilizables para que cada bloque de la home pueda rediseñarse por separado.',
        'Reduje el acoplamiento entre vistas, datos y utilidades para mantener un flujo de trabajo limpio.',
      ],
    },
    {
      role: 'API_INTEGRATION',
      company: 'FRONTEND_BACKEND',
      period: 'PHASE_3',
      highlights: [
        'Alineé el cliente con `/projects`, `/experiences` y `/contact-messages` para una integración directa.',
        'Dejé el panel admin listo para autenticar, gestionar contenido y evolucionar junto al backend.',
        'Mantengo la base preparada para conectar datos reales sin rehacer la interfaz existente.',
      ],
    },
  ],
  contact: {
    label: 'SECURE_CHANNEL',
    description: 'Escribe para colaboraciones, propuestas o simplemente para hablar de arquitectura.',
    submitLabel: 'SEND_MESSAGE >',
    footerLabel: 'ROLY_PORTFOLIO.SYS',
    email: 'hola@roly.dev',
    note:
      'El siguiente paso natural sería conectar estas secciones con datos reales y montar un formulario usando tu backend.',
  },
}

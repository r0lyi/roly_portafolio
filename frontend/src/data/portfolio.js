export const portfolioData = {
  profile: {
    name: 'Roly',
    role: 'Portafolio Full Stack',
    headline: 'Una base de React lista para crecer sin mezclar responsabilidades.',
    summary:
      'Organicé el frontend para que puedas separar arranque, layout, páginas, secciones, componentes reutilizables y conexión con la API desde el principio.',
    location: 'Frontend con React + Vite',
    availability: 'Preparado para conectar con FastAPI',
    ctaPrimary: {
      label: 'Ver estructura',
      sectionId: 'about',
    },
    ctaSecondary: {
      label: 'Ir a proyectos',
      sectionId: 'projects',
    },
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
      title: 'Home modular',
      description:
        'La landing quedó dividida en secciones independientes para que editar contenido no implique tocar toda la página.',
      stack: ['pages/home', 'sections/home', 'components/ui'],
      status: 'Lista para iterar el diseño.',
    },
    {
      title: 'Capa de datos',
      description:
        'El contenido inicial vive en un archivo de datos para poder reemplazarlo más adelante por la API sin rehacer la UI.',
      stack: ['data/portfolio.js', 'hooks', 'utils'],
      status: 'Lista para migrar a contenido real.',
    },
    {
      title: 'Servicios conectables',
      description:
        'Quedaron preparadas funciones para proyectos, experiencias y formulario de contacto usando Axios.',
      stack: ['services/api/client.js', 'projects.js', 'contactMessages.js'],
      status: 'Listas para consumir el backend.',
    },
  ],
  experiences: [
    {
      role: 'Base del frontend',
      company: 'Arquitectura inicial',
      period: 'Paso 1',
      description:
        'Separar responsabilidades desde el inicio evita que `App.jsx` se convierta en un archivo gigante.',
    },
    {
      role: 'Escalabilidad',
      company: 'Capas claras',
      period: 'Paso 2',
      description:
        'Con esta estructura, sumar nuevas páginas, rutas privadas o panel admin es mucho más directo.',
    },
    {
      role: 'Integración',
      company: 'Frontend + backend',
      period: 'Paso 3',
      description:
        'La carpeta de servicios ya quedó alineada con `/projects`, `/experiences` y `/contact-messages`.',
    },
  ],
  contact: {
    email: 'hola@roly.dev',
    note:
      'El siguiente paso natural sería conectar estas secciones con datos reales y montar un formulario usando tu backend.',
  },
}

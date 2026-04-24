import { useEffect, useState } from 'react'
import { Inbox, LayoutGrid, LogOut, Sparkles, TimerReset } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'
import { getContactMessages } from '../../services/api/contactMessages.js'
import { getExperiences } from '../../services/api/experiences.js'
import { getProjects } from '../../services/api/projects.js'
import { getApiErrorMessage } from '../../utils/getApiErrorMessage.js'

function AdminDashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dashboardState, setDashboardState] = useState({
    isLoading: true,
    error: '',
    stats: {
      projects: 0,
      experiences: 0,
      messages: 0,
    },
  })

  useDocumentTitle('Admin Dashboard | Roly')

  useEffect(() => {
    let isMounted = true

    async function loadDashboard() {
      try {
        const [projects, experiences, messages] = await Promise.all([
          getProjects(),
          getExperiences(),
          getContactMessages(),
        ])

        if (!isMounted) {
          return
        }

        setDashboardState({
          isLoading: false,
          error: '',
          stats: {
            projects: projects.length,
            experiences: experiences.length,
            messages: messages.length,
          },
        })
      } catch (error) {
        if (!isMounted) {
          return
        }

        setDashboardState((currentState) => ({
          ...currentState,
          isLoading: false,
          error: getApiErrorMessage(
            error,
            'No se pudieron cargar los datos del panel de administracion.',
          ),
        }))
      }
    }

    loadDashboard()

    return () => {
      isMounted = false
    }
  }, [])

  function handleLogout() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <section className="page-section admin-page">
      <div className="admin-hero">
        <div className="admin-copy">
          <p className="eyebrow">Panel admin</p>
          <h1>Sesion iniciada correctamente.</h1>
          <p className="hero-summary">
            Esta vista ya esta conectada a la autenticacion del backend usando
            `axios` + `Basic Auth`.
          </p>

          <div className="admin-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate('/')}
            >
              Volver al inicio
            </button>

            <button
              type="button"
              className="auth-link auth-link-danger"
              onClick={handleLogout}
            >
              <LogOut size={18} strokeWidth={2.2} />
              <span>Cerrar sesion</span>
            </button>
          </div>
        </div>

        <div className="content-card admin-profile-card">
          <p className="card-meta">Administrador autenticado</p>
          <h3>{user?.email}</h3>
          <p>
            Tu sesion se valida contra <code>/api/auth/me</code> y se mantiene
            en el navegador mientras dure la pestaña.
          </p>
        </div>
      </div>

      <div className="card-grid dashboard-card-grid">
        <article className="content-card dashboard-stat-card">
          <div className="stat-icon">
            <LayoutGrid size={20} strokeWidth={2.2} />
          </div>
          <p className="card-meta">Proyectos</p>
          <h3>
            {dashboardState.isLoading ? '...' : dashboardState.stats.projects}
          </h3>
          <p>Elementos recuperados desde la API pública del portfolio.</p>
        </article>

        <article className="content-card dashboard-stat-card">
          <div className="stat-icon">
            <TimerReset size={20} strokeWidth={2.2} />
          </div>
          <p className="card-meta">Experiencias</p>
          <h3>
            {dashboardState.isLoading
              ? '...'
              : dashboardState.stats.experiences}
          </h3>
          <p>Datos listos para alimentar la seccion profesional.</p>
        </article>

        <article className="content-card dashboard-stat-card">
          <div className="stat-icon">
            <Inbox size={20} strokeWidth={2.2} />
          </div>
          <p className="card-meta">Mensajes</p>
          <h3>
            {dashboardState.isLoading ? '...' : dashboardState.stats.messages}
          </h3>
          <p>Consulta protegida por autenticacion de administrador.</p>
        </article>
      </div>

      <div className="card-grid dashboard-card-grid">
        <article className="content-card">
          <p className="card-meta">Estado de integracion</p>
          <h3>Frontend y backend ya hablan el mismo idioma.</h3>
          <p>
            El cliente `axios` usa el header `Authorization` de forma
            transparente en las peticiones autenticadas.
          </p>
        </article>

        <article className="content-card">
          <p className="card-meta">Proximo paso sugerido</p>
          <h3>Crear modulos CRUD para el panel.</h3>
          <p>
            La base ya esta lista para que agregues gestion de proyectos,
            experiencias y mensajes desde vistas separadas.
          </p>
        </article>

        <article className="content-card">
          <div className="stat-icon">
            <Sparkles size={20} strokeWidth={2.2} />
          </div>
          <p className="card-meta">Estado del panel</p>
          <h3>{dashboardState.error ? 'Revision pendiente' : 'Operativo'}</h3>
          <p>
            {dashboardState.error ||
              'Las metricas basicas del dashboard se cargaron correctamente.'}
          </p>
        </article>
      </div>
    </section>
  )
}

export default AdminDashboardPage

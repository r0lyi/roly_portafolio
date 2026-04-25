import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AdminAccountManager from '../../components/admin/AdminAccountManager.jsx'
import AdminExperiencesManager from '../../components/admin/AdminExperiencesManager.jsx'
import AdminOverviewSection from '../../components/admin/AdminOverviewSection.jsx'
import AdminProjectImagesManager from '../../components/admin/AdminProjectImagesManager.jsx'
import AdminProjectsManager from '../../components/admin/AdminProjectsManager.jsx'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import AdminTechnologiesManager from '../../components/admin/AdminTechnologiesManager.jsx'
import AdminMessagesManager from '../../components/admin/AdminMessagesManager.jsx'
import {
  adminSections,
  defaultAdminSectionId,
  getAdminSectionById,
} from '../../constants/adminSections.js'
import useAuth from '../../hooks/useAuth.js'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'
import { getContactMessages } from '../../services/api/contactMessages.js'
import { getExperiences } from '../../services/api/experiences.js'
import { getProjects } from '../../services/api/projects.js'
import {
  eyebrowClass,
  heroSummaryClass,
  pageSectionClass,
} from '../../styles/tailwindClasses.js'
import { getTechnologies } from '../../services/api/technologies.js'
import { getUsers } from '../../services/api/users.js'
import { getApiErrorMessage } from '../../utils/getApiErrorMessage.js'

function AdminDashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedSectionId =
    searchParams.get('section') ?? defaultAdminSectionId
  const activeSection = getAdminSectionById(requestedSectionId)
  const [overviewState, setOverviewState] = useState({
    isLoading: true,
    error: '',
    stats: {
      projects: 0,
      projectImages: 0,
      technologies: 0,
      experiences: 0,
      messages: 0,
      users: 0,
    },
  })

  useDocumentTitle('Admin Console | Roly')

  useEffect(() => {
    refreshOverview()
  }, [])

  async function refreshOverview() {
    setOverviewState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: '',
    }))

    try {
      const [projects, technologies, experiences, messages, users] =
        await Promise.all([
          getProjects(),
          getTechnologies(),
          getExperiences(),
          getContactMessages(),
          getUsers(),
        ])

      setOverviewState({
        isLoading: false,
        error: '',
        stats: {
          projects: projects.length,
          projectImages: projects.reduce(
            (total, project) => total + project.images.length,
            0,
          ),
          technologies: technologies.length,
          experiences: experiences.length,
          messages: messages.length,
          users: users.length,
        },
      })
    } catch (error) {
      setOverviewState((currentState) => ({
        ...currentState,
        isLoading: false,
        error: getApiErrorMessage(
          error,
          'No se pudieron cargar las metricas del panel de administracion.',
        ),
      }))
    }
  }

  function handleSelectSection(sectionId) {
    const nextSearchParams = new URLSearchParams(searchParams)
    nextSearchParams.set('section', sectionId)
    setSearchParams(nextSearchParams, { replace: true })
  }

  function handleLogout() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  function renderActiveSection() {
    switch (activeSection.id) {
      case 'projects':
        return <AdminProjectsManager onDataChange={refreshOverview} />
      case 'project-images':
        return <AdminProjectImagesManager onDataChange={refreshOverview} />
      case 'technologies':
        return <AdminTechnologiesManager onDataChange={refreshOverview} />
      case 'experiences':
        return <AdminExperiencesManager onDataChange={refreshOverview} />
      case 'messages':
        return <AdminMessagesManager onDataChange={refreshOverview} />
      case 'account':
        return <AdminAccountManager onDataChange={refreshOverview} />
      case 'overview':
      default:
        return (
          <AdminOverviewSection
            isLoading={overviewState.isLoading}
            stats={overviewState.stats}
            error={overviewState.error}
            onRefresh={refreshOverview}
            onSelectSection={handleSelectSection}
            userEmail={user?.email}
          />
        )
    }
  }

  return (
    <section className={`${pageSectionClass} min-h-[72vh]`}>
      <div className="grid items-start gap-5 [grid-template-columns:320px_minmax(0,1fr)] max-[960px]:grid-cols-1">
        <AdminSidebar
          sections={adminSections}
          activeSectionId={activeSection.id}
          onSelectSection={handleSelectSection}
          userEmail={user?.email}
          onLogout={handleLogout}
        />

        <div className="grid min-w-0 gap-5">
          <div className="rounded-[32px] border border-[rgba(21,39,48,0.12)] bg-[radial-gradient(circle_at_top_left,rgba(197,107,77,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,249,241,0.7))] p-7 backdrop-blur-[16px]">
            <p className={eyebrowClass}>Base de datos y contenido</p>
            <h1 className="m-0 max-w-[11ch] font-['Fraunces'] text-[clamp(2.6rem,5vw,4.4rem)] leading-[1.02] text-[#112029] max-[960px]:max-w-none">
              Panel de administracion completo para el portfolio.
            </h1>
            <p className={`mt-6 ${heroSummaryClass}`}>
              Gestiona las tablas del proyecto desde una interfaz profesional,
              usando directamente la API del backend y manteniendo la sesion del
              administrador protegida.
            </p>
          </div>

          <div key={activeSection.id} className="min-w-0">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboardPage

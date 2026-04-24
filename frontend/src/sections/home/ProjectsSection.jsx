import ContentCard from '../../components/ui/ContentCard.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import { portfolioData } from '../../data/portfolio.js'

function ProjectsSection() {
  return (
    <section id="projects" className="page-section">
      <SectionHeading
        eyebrow="Qué quedó armado"
        title="Una base real, no solo carpetas vacías."
        description="Además de la estructura, dejé ejemplos funcionales para que puedas empezar a sustituir contenido y conectar datos sin rehacer el arranque."
      />

      <div className="card-grid">
        {portfolioData.projects.map((project) => (
          <ContentCard
            key={project.title}
            title={project.title}
            subtitle={project.status}
            description={project.description}
            tags={project.stack}
          />
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection

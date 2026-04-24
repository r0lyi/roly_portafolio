import ContentCard from '../../components/ui/ContentCard.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import { portfolioData } from '../../data/portfolio.js'

function AboutSection() {
  return (
    <section id="about" className="page-section">
      <SectionHeading
        eyebrow="Estructura base"
        title="Carpetas pensadas para mantener orden cuando el proyecto crezca."
        description="Cada carpeta tiene una responsabilidad clara para que el frontend siga legible incluso cuando sumes nuevas vistas, estado global o llamadas al backend."
      />

      <div className="card-grid">
        {portfolioData.architecture.map((item) => (
          <ContentCard
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            description={item.description}
          />
        ))}
      </div>
    </section>
  )
}

export default AboutSection

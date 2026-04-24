import ContentCard from '../../components/ui/ContentCard.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import { portfolioData } from '../../data/portfolio.js'

function ExperienceSection() {
  return (
    <section id="experience" className="page-section">
      <SectionHeading
        eyebrow="Cómo escalar"
        title="Una organización simple que no se te va de las manos."
        description="Estas capas hacen que el proyecto sea más fácil de mantener cuando empieces a sumar funcionalidades."
      />

      <div className="card-grid">
        {portfolioData.experiences.map((item) => (
          <ContentCard
            key={`${item.company}-${item.role}`}
            title={item.role}
            subtitle={`${item.company} · ${item.period}`}
            description={item.description}
          />
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection

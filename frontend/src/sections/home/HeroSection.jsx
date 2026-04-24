import heroImg from '../../assets/hero.png'
import { portfolioData } from '../../data/portfolio.js'
import { scrollToSection } from '../../utils/scrollToSection.js'

function HeroSection() {
  const { profile } = portfolioData

  return (
    <section id="hero" className="page-section hero-section">
      <div className="hero-copy">
        <p className="eyebrow">{profile.role}</p>
        <h1>{profile.headline}</h1>
        <p className="hero-summary">{profile.summary}</p>

        <div className="hero-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => scrollToSection(profile.ctaPrimary.sectionId)}
          >
            {profile.ctaPrimary.label}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => scrollToSection(profile.ctaSecondary.sectionId)}
          >
            {profile.ctaSecondary.label}
          </button>
        </div>

        <ul className="hero-meta" aria-label="Estado del proyecto">
          <li>{profile.name}</li>
          <li>{profile.location}</li>
          <li>{profile.availability}</li>
        </ul>
      </div>

      <div className="hero-visual">
        <div className="hero-image-frame">
          <img src={heroImg} alt={`Ilustración de ${profile.name}`} />
        </div>

        <div className="content-card hero-structure">
          <p className="card-meta">Estructura creada</p>
          <h3>src/</h3>
          <ul className="structure-list">
            <li>app/</li>
            <li>components/</li>
            <li>layouts/</li>
            <li>pages/</li>
            <li>sections/</li>
            <li>services/api/</li>
            <li>styles/</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

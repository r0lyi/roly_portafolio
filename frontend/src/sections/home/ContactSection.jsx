import SectionHeading from '../../components/ui/SectionHeading.jsx'
import { portfolioData } from '../../data/portfolio.js'

function ContactSection() {
  return (
    <section id="contact" className="page-section">
      <SectionHeading
        eyebrow="Siguiente paso"
        title="La estructura ya está lista para empezar a meter contenido real."
        description="Puedes reemplazar los datos de ejemplo por información tuya o conectarlos directamente con la API."
      />

      <div className="contact-panel">
        <p className="contact-copy">{portfolioData.contact.note}</p>
        <a className="contact-link" href={`mailto:${portfolioData.contact.email}`}>
          {portfolioData.contact.email}
        </a>
        <p className="contact-helper">
          Servicios preparados en <code>src/services/api</code>.
        </p>
      </div>
    </section>
  )
}

export default ContactSection

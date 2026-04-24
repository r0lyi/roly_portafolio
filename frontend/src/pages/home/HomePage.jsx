import useDocumentTitle from '../../hooks/useDocumentTitle.js'
import AboutSection from '../../sections/home/AboutSection.jsx'
import ContactSection from '../../sections/home/ContactSection.jsx'
import ExperienceSection from '../../sections/home/ExperienceSection.jsx'
import HeroSection from '../../sections/home/HeroSection.jsx'
import ProjectsSection from '../../sections/home/ProjectsSection.jsx'

function HomePage() {
  useDocumentTitle('Roly | Portafolio')

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  )
}

export default HomePage

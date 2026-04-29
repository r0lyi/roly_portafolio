import useDocumentTitle from '../../hooks/useDocumentTitle.js'
import useHomeContent from '../../hooks/useHomeContent.js'
import AboutSection from '../../sections/home/AboutSection.jsx'
import HomeBackToHeroButton from '../../components/home/HomeBackToHeroButton.jsx'
import ContactSection from '../../sections/home/ContactSection.jsx'
import ExperienceSection from '../../sections/home/ExperienceSection.jsx'
import HeroSection from '../../sections/home/HeroSection.jsx'
import ProjectsSection from '../../sections/home/ProjectsSection.jsx'
import SkillsSection from '../../sections/home/SkillsSection.jsx'

function HomePage() {
  useDocumentTitle('Roly | Portafolio')
  const { projectsState, experiencesState, technologiesState } = useHomeContent()

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection experiencesState={experiencesState} />
      <ProjectsSection projectsState={projectsState} />
      <SkillsSection technologiesState={technologiesState} />
      <ContactSection />
      <HomeBackToHeroButton />
    </>
  )
}

export default HomePage

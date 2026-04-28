import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollToSection } from '../../utils/scrollToSection.js'

function HomeBackToHeroButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function updateVisibility() {
      const nextSection = document.getElementById('about')
      const heroSection = document.getElementById('hero')

      if (nextSection) {
        const nextSectionTop = nextSection.getBoundingClientRect().top
        setIsVisible(nextSectionTop <= window.innerHeight - 96)
        return
      }

      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setIsVisible(heroBottom <= window.innerHeight - 96)
        return
      }

      setIsVisible(window.scrollY > 120)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 18, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.92 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-3 rounded-full border-[3px] border-[#101010] bg-white/92 px-4 py-3 text-[0.78rem] font-black uppercase tracking-[0.06em] text-[#101010] shadow-[8px_8px_0_rgba(16,16,16,0.16)] backdrop-blur-md transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#18ff48] hover:shadow-[10px_10px_0_#101010] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none max-[640px]:bottom-4 max-[640px]:right-4 max-[640px]:h-14 max-[640px]:w-14 max-[640px]:justify-center max-[640px]:rounded-[18px] max-[640px]:px-0"
          onClick={() => scrollToSection('hero')}
          aria-label="Volver al inicio"
          title="Volver al inicio"
        >
          <ArrowUp className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="max-[640px]:hidden">Volver al inicio</span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}

export default HomeBackToHeroButton

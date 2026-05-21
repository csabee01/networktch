import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import MarqueeSection from './components/MarqueeSection'
import Services from './components/Services'
import CameraShowcase from './components/CameraShowcase'
import Stats from './components/Stats'
import About from './components/About'
import TechStack from './components/TechStack'
import Process from './components/Process'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.08 }
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Nav />
      <Hero />
      <MarqueeSection />
      <Services />
      <CameraShowcase />
      <Stats />
      <About />
      <TechStack />
      <Process />
      <Gallery />
      <Contact />
      <Footer />
    </>
  )
}

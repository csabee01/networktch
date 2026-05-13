import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import CameraShowcase from './components/CameraShowcase'
import Stats from './components/Stats'
import About from './components/About'
import TechStack from './components/TechStack'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  useScrollReveal()
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <CameraShowcase />
      <Stats />
      <About />
      <TechStack />
      <Process />
      <Contact />
      <Footer />
    </>
  )
}

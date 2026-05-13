import { useState, useEffect } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav>
        <a href="#" className="nav-logo">
          <img src="/logo.png" alt="NT logó" className="nav-logo-img" />
          NetworkTech
        </a>
        <ul className="nav-links">
          <li><a href="#services">Szolgáltatások</a></li>
          <li><a href="#about">Rólunk</a></li>
          <li><a href="#tech">Technológiák</a></li>
          <li><a href="#process">Folyamat</a></li>
          <li><a href="#contact" className="nav-cta">Kapcsolat</a></li>
        </ul>
        <button
          className={`hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menü"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <a href="#services" onClick={close}>Szolgáltatások</a>
        <div className="mobile-menu-divider" />
        <a href="#about" onClick={close}>Rólunk</a>
        <div className="mobile-menu-divider" />
        <a href="#tech" onClick={close}>Technológiák</a>
        <div className="mobile-menu-divider" />
        <a href="#process" onClick={close}>Folyamat</a>
        <div className="mobile-menu-divider" />
        <a href="#contact" className="mob-cta" onClick={close}>Kapcsolat →</a>
      </div>
    </>
  )
}

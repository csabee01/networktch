import { useState, useEffect, useCallback } from 'react'

const images = [
  'galeria/_montazs.jpg',
  'galeria/alaplap.jpeg',
  'galeria/aszekreny.jpg',
  'galeria/box.jpg',
  'galeria/box2.jpg',
  'galeria/cam.jpg',
  'galeria/cam2.jpg',
  'galeria/fiber.jpg',
  'galeria/kabel.jpg',
  'galeria/kint.jpg',
  'galeria/optika.jpg',
  'galeria/rad.jpg',
  'galeria/rad2.jpg',
  'galeria/tel.jpg',
  'galeria/zfutes.jpg',
]

export default function Gallery() {
  const [active, setActive] = useState(null) // index or null

  const close = useCallback(() => setActive(null), [])

  const prev = useCallback((e) => {
    e.stopPropagation()
    setActive(i => (i - 1 + images.length) % images.length)
  }, [])

  const next = useCallback((e) => {
    e.stopPropagation()
    setActive(i => (i + 1) % images.length)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (active === null) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') setActive(i => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setActive(i => (i + 1) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close])

  return (
    <>
      <section className="gallery-section">
        <div style={{ textAlign: 'center' }}>
          <h2>Galéria</h2>
        </div>
        <div className="gallery-grid">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Galéria ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </section>

      {active !== null && (
        <div
          className="gallery-modal active"
          onClick={(e) => { if (e.target.classList.contains('gallery-modal')) close() }}
        >
          <span className="gallery-close" onClick={close}>&times;</span>
          <button className="gallery-nav prev" onClick={prev}>&#10094;</button>
          <img className="gallery-modal-img" src={images[active]} alt="" />
          <button className="gallery-nav next" onClick={next}>&#10095;</button>
        </div>
      )}
    </>
  )
}

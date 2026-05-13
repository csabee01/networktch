import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursorRing')
    if (!cursor || !ring) return

    const move = e => {
      cursor.style.left = e.clientX - 5 + 'px'
      cursor.style.top  = e.clientY - 5 + 'px'
      ring.style.left   = e.clientX - 18 + 'px'
      ring.style.top    = e.clientY - 18 + 'px'
    }
    document.addEventListener('mousemove', move)

    const grow = () => { cursor.style.transform = 'scale(2)'; ring.style.transform = 'scale(1.4)' }
    const shrink = () => { cursor.style.transform = 'scale(1)'; ring.style.transform = 'scale(1)' }

    const attach = () => {
      document.querySelectorAll('a,button,.bento-card,.tech-card,input,textarea,select')
        .forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })
    }
    attach()

    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
    </>
  )
}

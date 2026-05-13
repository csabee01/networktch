const LINKS = [
  { label: 'Adatkezelési tájékoztató', href: '#' },
  { label: 'Adatvédelmi nyilatkozat',  href: '#' },
  { label: 'Elállási nyilatkozat',      href: '#' },
  { label: 'Facebook', href: 'https://facebook.com/networktechnologieskft', external: true },
]

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <img src="/logo.png" alt="NT logó" className="footer-logo-img" />
        NetworkTech Kft
        <span style={{ color: 'rgba(255,255,255,.25)', fontWeight: 400, fontFamily: "'DM Sans',sans-serif", fontSize: 13, marginLeft: 8 }}>
          — Kecskemét
        </span>
      </div>
      <ul className="footer-links">
        {LINKS.map(({ label, href, external }) => (
          <li key={label}>
            <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div className="footer-copy">© 2025 Network Technologies Kft — Minden jog fenntartva.</div>
    </footer>
  )
}

const links = [
  { href: 'docs/adatkezelesi_tajekoztato.pdf',  label: 'Adatkezelési tájékoztató' },
  { href: 'docs/adatvedelmi_nyilatkozat.pdf',   label: 'Adatvédelmi nyilatkozat'  },
  { href: 'docs/elallasi_nyilatkozat.pdf',       label: 'Elállási nyilatkozat'      },
  { href: 'https://facebook.com/networktechnologieskft', label: 'Facebook', external: true },
]

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <img src="pics/logo.png" alt="NT logó" className="footer-logo-img" />
        Network Technologies Kft
        <span style={{ color: 'rgba(255,255,255,.25)', fontWeight: 400, fontFamily: "'DM Sans',sans-serif", fontSize: '13px' }}>
          — Kecskemét
        </span>
      </div>

      <ul className="footer-links">
        {links.map((l, i) => (
          <li key={i}>
            <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
          </li>
        ))}
      </ul>

      <div className="footer-copy">
        © 2019 Network Technologies Kft — Minden jog fenntartva.
      </div>
    </footer>
  )
}

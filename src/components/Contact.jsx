const contacts = [
  { icon: '📍', title: 'Cím',          info: '6000 Kecskemét, Irinyi u. 17/C (Albacomp Irodaház)' },
  { icon: '📞', title: 'Telefon',      info: '+36 30 587 0123' },
  { icon: '✉️', title: 'E-mail',       info: 'info@networktch.com' },
  { icon: '⏰', title: 'Nyitvatartás', info: 'H–P: 8:00–16:00' },
]

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <div className="reveal">
          <div className="section-label">Kapcsolat</div>
          <h2>Kezdjük el együtt!</h2>
          <p className="section-desc" style={{ marginBottom: 0 }}>
            Vedd fel velünk a kapcsolatot — 24 órán belül visszakeresünk személyre szabott ajánlattal.
          </p>
          <div style={{ marginTop: '32px' }}>
            {contacts.map((c, i) => (
              <div className="contact-item" key={i}>
                <div className="ci-icon">{c.icon}</div>
                <div className="ci-text">
                  <strong>{c.title}</strong>
                  <span>{c.info}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="map-box">
          <iframe
            src="https://www.google.com/maps?q=6000+Kecskemét,+Irinyi+u.+17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Térkép"
          />
        </div>
      </div>
    </section>
  )
}

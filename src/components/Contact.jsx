import { useState } from 'react'

const INFO = [
  { icon: '📍', label: 'Cím',         value: '6000 Kecskemét, Irinyi u. 17/C (Albacomp Irodaház)' },
  { icon: '📞', label: 'Telefon',     value: '+36 70 264 00 96' },
  { icon: '✉️', label: 'E-mail',      value: 'info@networktch.com' },
  { icon: '⏰', label: 'Nyitvatartás',value: 'H–P: 8:00–17:00 · Sürgős esetben: 24/7' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <div className="reveal">
          <div className="section-label">Kapcsolat</div>
          <h2>Kezdjük el együtt!</h2>
          <p className="section-desc" style={{ marginBottom: 0 }}>
            Vedd fel velünk a kapcsolatot — 24 órán belül visszakeresünk személyre szabott ajánlattal.
          </p>
          <div style={{ marginTop: 32 }}>
            {INFO.map(({ icon, label, value }) => (
              <div className="contact-item" key={label}>
                <div className="ci-icon">{icon}</div>
                <div className="ci-text">
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-form reveal">
          <h3>Küldjön üzenetet</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Neve</label>
                <input id="name" type="text" placeholder="Kovács János" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="email@ceg.hu" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefonszám</label>
              <input id="phone" type="tel" placeholder="+36 70 ..." />
            </div>
            <div className="form-group">
              <label htmlFor="service">Szolgáltatás</label>
              <select id="service">
                <option value="">Válasszon...</option>
                {['Hálózatépítés','IT Karbantartás','IP Kamerarendszer','Beléptető rendszer','Tűz & riasztó','Egyéb']
                  .map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="msg">Üzenet</label>
              <textarea id="msg" placeholder="Röviden írja le az igényét..." />
            </div>
            <button
              type="submit"
              className="form-submit"
              style={sent ? { background: 'linear-gradient(135deg,#00e57a,#00b860)' } : undefined}
            >
              {sent ? '✓ Üzenet elküldve!' : 'Üzenet küldése →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

const techs = [
  { icon: '📷', name: 'Hikvision',    cat: 'IP Kamera'    },
  { icon: '🛡️', name: 'Fortinet',     cat: 'Tűzfal / VPN' },
  { icon: '📡', name: 'Ubiquiti',     cat: 'WiFi / LAN'   },
  { icon: '📹', name: 'Dahua',        cat: 'CCTV'         },
  { icon: '🔧', name: 'MikroTik',     cat: 'Router / Switch' },
  { icon: '☁️', name: 'Microsoft 365', cat: 'Cloud'        },
]

export default function TechStack() {
  return (
    <section id="tech" className="tech-section">
      <div style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Technológiák</div>
        <h2>Ismert márkák, bevált megoldások</h2>
        <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '440px' }}>
          Csak megbízható, ipari minőségű eszközökkel és szoftverekkel dolgozunk.
        </p>
      </div>
      <div className="tech-grid reveal">
        {techs.map((t, i) => (
          <div className="tech-card" key={i}>
            <div className="tech-icon">{t.icon}</div>
            <div className="tech-name">{t.name}</div>
            <div className="tech-cat">{t.cat}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

const TECHS = [
  { icon: '🔵', name: 'Cisco',        cat: 'Hálózat' },
  { icon: '📷', name: 'Hikvision',    cat: 'IP Kamera' },
  { icon: '🛡️', name: 'Fortinet',     cat: 'Tűzfal / VPN' },
  { icon: '📡', name: 'Ubiquiti',     cat: 'WiFi / LAN' },
  { icon: '📹', name: 'Dahua',        cat: 'CCTV' },
  { icon: '🔧', name: 'MikroTik',     cat: 'Router / Switch' },
  { icon: '🔒', name: 'Axis',         cat: 'Beléptető' },
  { icon: '☁️', name: 'Microsoft 365',cat: 'Cloud' },
]

export default function TechStack() {
  return (
    <section id="tech" className="tech-section">
      <div style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Technológiák</div>
        <h2>Ismert márkák, bevált megoldások</h2>
        <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center', maxWidth: 440 }}>
          Csak megbízható, ipari minőségű eszközökkel és szoftverekkel dolgozunk.
        </p>
      </div>
      <div className="tech-grid reveal">
        {TECHS.map(({ icon, name, cat }) => (
          <div className="tech-card" key={name}>
            <div className="tech-icon">{icon}</div>
            <div className="tech-name">{name}</div>
            <div className="tech-cat">{cat}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

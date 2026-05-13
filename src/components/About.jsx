const FEATURES = [
  { icon: '⚡', title: 'Gyors reagálás',          desc: 'Hibák esetén gyorsan és hatékonyan avatkozunk közbe, minimalizálva az állásidőt.' },
  { icon: '🎯', title: 'Testreszabott megoldások', desc: 'Nem általános csomagokat adunk, hanem a te igényeidre szabott rendszereket tervezünk.' },
  { icon: '🤝', title: 'Hosszú távú partnerség',  desc: 'Ügyfeleink többsége évek óta bíz bennünk — ez a legjobb referencia.' },
]

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <div className="reveal">
          <div className="about-terminal">
            <div className="term-hdr">
              <div className="thd" style={{ background: '#ff5f57' }} />
              <div className="thd" style={{ background: '#ffc82d' }} />
              <div className="thd" style={{ background: '#28c840' }} />
              <span className="thd-title">networktch@kecskemét ~ $</span>
            </div>
            <div className="term-body">
              <div className="tl"><span className="tp">$</span><span className="tc"> whoami</span></div>
              <div className="to tg">NetworkTech Kft — IT &amp; Biztonságtechnika</div>
              <div className="tl"><span className="tp">$</span><span className="tc"> cat about.txt</span></div>
              <div className="to">Alapítva: 2009 | Tapasztalat: 15+ év</div>
              <div className="to">Szakterület: Hálózat, Kamera, Beléptető, Tűz</div>
              <div className="tl"><span className="tp">$</span><span className="tc"> uptime --clients</span></div>
              <div className="to tg">200+ aktív ügyfél | 97% elégedettség</div>
              <div className="tl"><span className="tp">$</span><span className="tc"> ping response.avg</span></div>
              <div className="to" style={{ color: '#ffd700' }}>PONG — ~2h átlagos reagálási idő</div>
              <div className="tl"><span className="tp">$</span><span className="tc"> systemctl status NetworkTech</span></div>
              <div className="to tg">● Aktív — minden rendszer OK</div>
              <div className="tl"><span className="tp">$</span><span className="tcursor" /></div>
            </div>
          </div>
        </div>

        <div className="reveal">
          <div className="section-label">Rólunk</div>
          <h2>Több mint 15 év az IT és biztonság terén</h2>
          <p className="section-desc">
            Célunk, hogy ügyfeleink zökkenőmentesen tudjanak a mindennapi feladataikra koncentrálni —
            az informatika nehézségei ne hátráltassák őket.
          </p>
          <ul className="feature-list">
            {FEATURES.map(({ icon, title, desc }) => (
              <li key={title}>
                <div className="icon">{icon}</div>
                <div><strong>{title}</strong>{desc}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

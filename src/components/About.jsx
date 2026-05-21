const features = [
  { icon: '⚡', title: 'Gyors reagálás', desc: 'Hibák esetén gyorsan és hatékonyan avatkozunk közbe, minimalizálva az állásidőt.' },
  { icon: '🎯', title: 'Testreszabott megoldások', desc: 'Nem általános csomagokat adunk, hanem a te igényeidre szabott rendszereket tervezünk.' },
  { icon: '🤝', title: 'Hosszú távú partnerség', desc: 'Ügyfeleink többsége évek óta bízik bennünk — ez a legjobb referencia.' },
]

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <div className="reveal">
          <div className="section-label">Rólunk</div>
          <h2>Több mint 15 év az IT és biztonságtechnika terén</h2>
          <p className="section-desc">
            Célunk, hogy ügyfeleink zökkenőmentesen tudjanak a mindennapi feladataikra
            koncentrálni — az informatika nehézségei ne hátráltassák őket.
          </p>
          <ul className="feature-list">
            {features.map((f, i) => (
              <li key={i}>
                <div className="icon">{f.icon}</div>
                <div>
                  <strong>{f.title}</strong>
                  {f.desc}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

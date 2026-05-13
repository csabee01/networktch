export default function Services() {
  return (
    <section id="services">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <div className="section-label">Amit kínálunk</div>
          <h2>Komplex IT &<br />biztonsági megoldások</h2>
        </div>
        <p className="section-desc" style={{ maxWidth: 380 }}>
          Mindent egy helyen — hálózattervezéstől kamerarendszer-telepítésig, tapasztalt csapattal.
        </p>
      </div>

      <div className="bento-grid reveal">
        {/* Hálózatépítés — large dark with network image */}
        <div className="bento-card c3 dark net-img-card">
          <img src="/network.jpg" alt="Hálózat" />
          <div className="net-img-card-overlay">
            <div className="bento-icon">🌐</div>
            <h3>Hálózatépítés</h3>
            <p>Strukturált adathálózat kiépítése irodai és ipari környezetben, aktív és passzív elemek telepítésével.</p>
            <div className="bento-tag">Részletek</div>
          </div>
        </div>

        {/* IT Karbantartás */}
        <div className="bento-card c3">
          <div className="bento-icon">🖥️</div>
          <h3>IT Karbantartás</h3>
          <p>Rendszeres szerverüzemeltetés, munkaállomás-kezelés és helpdesk szolgáltatás.</p>
          <div className="bento-term">
            <div className="tl"><span className="tp">$</span><span className="tc"> systemctl status network</span></div>
            <div className="to tg">● network — aktív (running)</div>
            <div className="tl"><span className="tp">$</span><span className="tc"> uptime</span></div>
            <div className="to" style={{ color: 'rgba(255,255,255,.28)' }}>99.8% — 15 days, 4:22</div>
            <div className="tl"><span className="tp">$</span><span className="tcursor" /></div>
          </div>
          <div className="bento-tag">Részletek</div>
        </div>

        {/* IP Kamera */}
        <div className="bento-card c2">
          <div className="bento-icon">📹</div>
          <h3>IP Kamerarendszer</h3>
          <p>HD és 4K IP kamerák, rögzítő-rendszer, táv-monitorozás.</p>
          <div className="cam-preview">
            {['📹','📷','🎥','📸'].map((e, i) => (
              <div className="cam-thumb" key={i}>{e}</div>
            ))}
          </div>
          <div className="bento-tag">Részletek</div>
        </div>

        {/* VPN & Cloud */}
        <div className="bento-card c2 dark">
          <div className="bento-icon">☁️</div>
          <h3>VPN & Cloud</h3>
          <p>Biztonságos távoli hozzáférés, felhőalapú infrastruktúra tervezése és migrálása.</p>
          <div className="bento-tag">Részletek</div>
        </div>

        {/* Beléptető */}
        <div className="bento-card c2">
          <div className="bento-icon">🔐</div>
          <h3>Beléptető rendszer</h3>
          <p>Kártyás és biometrikus beléptetők, munkaidő-nyilvántartás.</p>
          <div className="bento-tag">Részletek</div>
        </div>

        {/* Tűz */}
        <div className="bento-card c2 dark">
          <div className="bento-icon">🚨</div>
          <h3>Tűz & riasztó</h3>
          <p>Tűzjelzők, betörésjelzők, hang- és fény-szirénák tervezése és üzembe helyezése.</p>
          <div className="bento-tag">Részletek</div>
        </div>
      </div>
    </section>
  )
}

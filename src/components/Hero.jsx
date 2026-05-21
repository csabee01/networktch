export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-badge">
          <span className="badge-dot" />
          15+ év tapasztalat — Kecskemét
        </div>
        <h1>
          Megbízható<br />
          <span className="grad-text">IT megoldások</span><br />
          vállalkozásodnak
        </h1>
        <p className="hero-desc">
          Informatikai hálózatépítéstől a biztonságtechnikáig — komplex megoldásokat
          nyújtunk, hogy Te az üzletedre koncentrálhass.
        </p>
        <div className="hero-actions">
          <a href="#services" className="btn-secondary">
            Szolgáltatásaink&nbsp;
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>

        <div className="about-terminal hero-terminal">
          <div className="term-hdr">
            <div className="thd" style={{ background: '#ff5f57' }} />
            <div className="thd" style={{ background: '#ffc82d' }} />
            <div className="thd" style={{ background: '#28c840' }} />
            <span className="thd-title">networktch@kecskemét ~ $</span>
          </div>
          <div className="term-body">
            <div className="tl"><span className="tp">$</span><span className="tc"> whoami</span></div>
            <div className="to tg">Network Technologies Kft — IT &amp; Biztonságtechnika</div>

            <div className="tl"><span className="tp">$</span><span className="tc"> cat about.txt</span></div>
            <div className="to tg">Szakterület: Informatika, Biztonságtechnika</div>
            <div className="to tg">Email: info@networktch.com</div>
            <div className="to tg">Tel.: +36 30/587 0123</div>
            <div className="to tg">Iroda: 6000 Kecskemét, Irinyi u. 17/C</div>

            <div className="tl"><span className="tp">$</span><span className="tc"> uptime</span></div>
            <div className="to tg">15+ év</div>

            <div className="tl"><span className="tp">$</span><span className="tc"> ping response.avg</span></div>
            <div className="to" style={{ color: '#f5c542' }}>PONG — ~2h átlagos reagálási idő</div>

            <div className="tl"><span className="tp">$</span><span className="tc"> systemctl status NetworkTech</span></div>
            <div className="to" style={{ color: '#f5c542' }}>● Aktív — minden rendszer OK</div>

            <div className="tl"><span className="tp">$</span><span className="tcursor" /></div>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-image">
          <img src="pics/logo.png" alt="IT rendszer" />
        </div>
      </div>
    </section>
  )
}

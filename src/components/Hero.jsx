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
          Informatikai hálózatépítéstől a biztonságtechnikáig — komplex megoldásokat nyújtunk,
          hogy Te az üzletedre koncentrálhass.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Ajánlatot kérek
            <ArrowIcon />
          </a>
          <a href="#services" className="btn-secondary">
            Szolgáltatásaink
            <PlusIcon />
          </a>
        </div>
        <div className="hero-stats">
          <div><span className="stat-num">15<span>+</span></span><span className="stat-label">Év tapasztalat</span></div>
          <div><span className="stat-num">200<span>+</span></span><span className="stat-label">Elégedett ügyfél</span></div>
          <div><span className="stat-num">24<span>/7</span></span><span className="stat-label">Elérhetőség</span></div>
        </div>
      </div>

      <div className="hero-right">
        <HeroMockup />
      </div>
    </section>
  )
}

function HeroMockup() {
  return (
    <div className="hero-mockup">
      <div className="float-badge tl">
        <span className="fb-icon">✅</span>
        <div><div className="fb-text">Rendszer aktív</div><div className="fb-sub">99.8% uptime</div></div>
      </div>
      <div className="float-badge br">
        <span className="fb-icon">🔒</span>
        <div><div className="fb-text">Védett hálózat</div><div className="fb-sub">0 incidens ma</div></div>
      </div>
      <div className="mockup-window">
        <div className="mockup-topbar">
          <div className="tb-dot" style={{ background: '#ff5f57' }} />
          <div className="tb-dot" style={{ background: '#ffc82d' }} />
          <div className="tb-dot" style={{ background: '#28c840' }} />
          <span className="tb-title">NetworkTech — Vezérlőpult v2.4</span>
        </div>
        <div className="mockup-body">
          <div className="mock-card">
            <div className="mock-label">Uptime</div>
            <div className="mock-val">99.8<span style={{ fontSize: 13, color: 'rgba(255,255,255,.35)' }}>%</span></div>
            <div className="mock-status"><span className="mock-dot" />Hálózat aktív</div>
          </div>
          <div className="mock-card">
            <div className="mock-label">Riasztások</div>
            <div className="mock-val" style={{ color: '#00e57a' }}>0</div>
            <div className="mock-sub" style={{ marginTop: 8 }}>Nincs aktív incidens</div>
          </div>
          <div className="mock-card" style={{ gridColumn: 'span 2' }}>
            <div className="mock-label">IP Kamera — Live Feed</div>
            <div className="mock-cam-grid">
              <div className="mock-cam">📹</div>
              <div className="mock-cam">📷</div>
            </div>
          </div>
          <div className="mock-card" style={{ gridColumn: 'span 2' }}>
            <div className="mock-label">Hálózati terhelés</div>
            <div style={{ marginTop: 10 }}>
              {[['WAN', 72], ['LAN', 45], ['VPN', 31]].map(([lbl, pct]) => (
                <div className="mock-bar-row" key={lbl}>
                  <span className="mock-bar-lbl">{lbl}</span>
                  <div className="mock-bar-track"><div className="mock-bar-fill" style={{ width: `${pct}%` }} /></div>
                  <span className="mock-bar-pct">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

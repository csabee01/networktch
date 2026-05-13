export default function CameraShowcase() {
  return (
    <div className="cam-showcase">
      <img src="/camera.png" alt="IP Kamera rendszer" className="cam-showcase-img" />
      <div className="cam-showcase-overlay">
        <div className="cam-showcase-content">
          <div className="cam-live-badge">
            <span className="cam-live-dot" />
            LIVE MONITORING
          </div>
          <h2>Profi megfigyelés,<br /><span className="grad-text">bárhonnan elérhető</span></h2>
          <p className="section-desc">
            HD és 4K felbontású IP kamerarendszerek telepítése — táv-monitorozással,
            mozgásérzékelővel és felhőalapú rögzítéssel.
          </p>
          <a href="#contact" className="btn-primary">
            Kamerarendszer ajánlat
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

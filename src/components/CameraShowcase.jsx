export default function CameraShowcase() {
  return (
    <div className="cam-showcase">
      <img src="pics/camera.png" alt="IP Kamera rendszer" className="cam-showcase-img" />
      <div className="cam-showcase-overlay">
        <div className="cam-showcase-content">
          <div className="cam-live-badge">
            <span className="cam-live-dot" />
            LIVE MONITORING
          </div>
          <h2>
            Profi megfigyelés,<br />
            <span className="grad-text">bárhonnan elérhető</span>
          </h2>
          <p className="section-desc">HD és 4K felbontású IP kamerarendszerek telepítése</p>
          <p className="section-desc">
            A fejlett területvédelmi funkciók – mint a precíz vonalátlépés-érzékelés, a rendszámolvasás
            és a célorientált objektumfelismerés (ember/gépjármű) – garantálják, hogy a rendszer csak
            indokolt esetben indítson riasztást, minimalizálva a téves jelzések számát.
          </p>
        </div>
      </div>
    </div>
  )
}

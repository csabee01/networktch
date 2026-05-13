const STEPS = [
  { num: '01', title: 'Igényfelmérés', desc: 'Megismerjük az üzleti céljaidat és a jelenlegi infrastruktúrát.' },
  { num: '02', title: 'Tervezés',      desc: 'Részletes megoldási terv és árajánlat, amit közösen megvitattunk.' },
  { num: '03', title: 'Telepítés',     desc: 'Szakszerű kivitelezés, minimális zavarással a munkamenetedben.' },
  { num: '04', title: 'Támogatás',     desc: 'Folyamatos üzemeltetési támogatás és karbantartás a beüzemelés után.' },
]

export default function Process() {
  return (
    <section id="process" className="process-section">
      <div style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Hogyan dolgozunk</div>
        <h2>Egyszerű, átlátható folyamat</h2>
        <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center' }}>
          Négy lépésben a teljesen üzemkész rendszerig — meglepetés nélkül.
        </p>
      </div>
      <div className="process-steps reveal">
        {STEPS.map(({ num, title, desc }) => (
          <div className="step" key={num}>
            <div className="step-num">{num}</div>
            <h4>{title}</h4>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

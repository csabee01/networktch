const services = [
  {
    icon: '🌐',
    title: 'Hálózatépítés',
    img: 'pics/network.jpg',
    wide: false,
    blocks: [
      { bold: 'Hálózati infrastruktúra – Tervezéstől a minősítésig', text: 'A modern működés alapja a stabil és gyors adatátviteli hálózat. Teljes körű szolgáltatást nyújtunk irodák, ipari létesítmények és lakókörnyezetek számára a tervezéstől a kivitelezésig.' },
      { bold: 'Vezetékes és vezeték nélküli hálózatok', text: 'Cat6–Cat7 alapú strukturált kábelezést, valamint nagy lefedettségű, zökkenőmentes roamingot biztosító Wi-Fi rendszereket építünk.' },
      { bold: 'Optikai megoldások', text: 'Nagy sebességű, zavarvédett optikai hálózatokat alakítunk ki épületek között és nagy távolságokra.' },
      { bold: 'Mérés és minősítés', text: 'Minden rendszert Fluke műszerekkel tesztelünk, biztosítva a szabványoknak való megfelelést és a hosszú távú teljesítményt. A mérésekről részletes jegyzőkönyvet adunk.' },
    ],
  },
  {
    icon: '🖥️',
    title: 'IT Karbantartás',
    img: 'pics/maintenance.png',
    wide: false,
    blocks: [
      { bold: 'IT üzemeltetés és Helpdesk', text: 'A stabil IT-rendszerek alapvetőek a hatékony működéshez. Proaktív üzemeltetési szolgáltatásainkkal megelőzzük a leállásokat, optimalizáljuk az erőforrásokat, és gyors támogatást biztosítunk.' },
      { bold: 'Szerverüzemeltetés és infrastruktúra', text: 'Fizikai és virtuális szerverek, Windows alapú rendszerek, NAS és virtualizáció kezelése, tervezése és karbantartása. Folyamatos monitorozással előzzük meg a hibákat.' },
      { bold: 'Adatvédelem és mentés', text: 'Többszintű, titkosított mentési megoldásokat alkalmazunk, rendszeres teszteléssel a maximális adatbiztonság érdekében.' },
      { bold: 'Munkaállomás-üzemeltetés', text: 'PC-k és laptopok karbantartása, frissítések kezelése, központi vírusvédelem és tűzfal biztosítása, valamint új eszközök beüzemelése és menedzsmentje.' },
    ],
  },
  {
    icon: '📹',
    title: 'IP Kamerarendszer',
    img: 'pics/cam.png',
    wide: false,
    blocks: [
      { bold: 'Nagyvállalati IP-kamerarendszerek tervezése és kivitelezése', text: 'A modern vagyonvédelem alapja a nagy felbontású, skálázható IP-kamerarendszer. Nagy tapasztalattal tervezünk, telepítünk és üzemeltetünk akár 200+ kamerás, stabil rendszereket.' },
      { bold: 'Technológia és funkciók', text: 'Dahua és Hikvision eszközökkel dolgozunk, biztosítva a megbízhatóságot és kiberbiztonságot. AI-alapú analitika (pl. behatolás- és rendszámfelismerés), arcfelismerés, valamint fejlett éjjellátó technológiák támogatják a pontos megfigyelést.' },
      { bold: 'Központi kezelés', text: 'VMS rendszerekkel (pl. Axxon One, HikCentral) több száz kamera kezelhető egy felületen, átláthatóan és hatékonyan.' },
      { bold: 'Stabilitás és adatvédelem', text: 'Megbízható hálózati háttérrel, redundáns tárolással és GDPR-kompatibilis beállításokkal garantáljuk a folyamatos működést és az adatok biztonságát.' },
    ],
  },
  {
    icon: '☁️',
    title: 'VPN & Cloud',
    img: 'pics/vpn.png',
    wide: false,
    blocks: [
      { bold: 'Biztonságos távoli munkavégzés (Client-to-Site VPN)', text: 'A távoli munkavégzés során kiemelten fontos a biztonságos hozzáférés. Titkosított VPN megoldásokat (pl. WireGuard, OpenVPN) és többfaktoros azonosítást alkalmazunk a céges rendszerek védelmére.' },
      { bold: 'Telephelyek összekapcsolása', text: 'Site-to-Site VPN kapcsolatokkal egységes, biztonságos hálózatot hozunk létre több telephely között, stabil és költséghatékony adatkapcsolattal.' },
      { bold: 'Felhő és hibrid megoldások', text: 'Privát és hibrid infrastruktúrákat tervezünk, ötvözve a helyi rendszerek stabilitását a felhő rugalmasságával, központi menedzsmenttel és biztonságos működéssel.' },
    ],
  },
  {
    icon: '🚨',
    title: 'Riasztó',
    img: 'pics/alert.jpg',
    wide: true,
    blocks: [
      { bold: 'Komplex épület- és területvédelem', text: 'A hatékony vagyonvédelem egymásra épülő, többrétegű rendszereken alapul, amelyek a teljes területet lefedik.' },
      { bold: 'Többlépcsős védelem', text: 'Kültéri érzékelőkkel már a kerítésnél észleljük a behatolást, héjvédelemmel biztosítjuk a nyílászárókat, míg a belső térben intelligens mozgásérzékelők felügyelik a kritikus zónákat.' },
      { bold: 'Integráció és automatizálás', text: 'Rendszereink automatizált vezérlésekkel és helyi integrációval működnek, együttműködve épületautomatizálási megoldásokkal, felhőhasználat nélkül.' },
      { bold: 'Szabványok', text: 'Megoldásaink megfelelnek a MABISZ és nemzetközi biztonsági előírásoknak.' },
    ],
  },
]

function ServiceCard({ service }) {
  return (
    <div className={`bento-card dark net-img-card${service.wide ? ' alarm-full' : ''}`}>
      <img src={service.img} alt="" />
      <div className="bento-icon">{service.icon}</div>
      <h3>{service.title}</h3>
      {service.blocks.map((b, i) => (
        <span key={i}>
          <p className="felkover">{b.bold}</p>
          <p>{b.text}</p>
        </span>
      ))}
    </div>
  )
}

export default function Services() {
  return (
    <section id="services">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: 0 }}>
        <div>
          <div className="section-label">Amit kínálunk</div>
          <h2>Komplex IT &amp;<br />biztonsági megoldások</h2>
        </div>
        <p className="section-desc" style={{ maxWidth: '380px' }}>
          Mindent egy helyen — hálózattervezéstől kamerarendszer-telepítésig.
        </p>
      </div>

      <div className="bento-grid reveal">
        {services.map((s, i) => <ServiceCard key={i} service={s} />)}
      </div>
    </section>
  )
}

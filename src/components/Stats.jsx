const STATS = [
  { big: '15', sup: '+',    label: 'Év tapasztalat az IT szektorban' },
  { big: '200', sup: '+',   label: 'Elégedett ügyfél Kecskemét régióban' },
  { big: '24', sup: '/7',   label: 'Sürgős ügyeleti elérhetőség', supSmall: true },
  { big: '99', sup: '.8%',  label: 'Hálózati megbízhatóság', supSmall: true },
]

export default function Stats() {
  return (
    <div className="stats-dark reveal">
      <div className="stats-inner">
        {STATS.map(({ big, sup, label, supSmall }) => (
          <div className="stat-block" key={label}>
            <span className="stat-big">
              {big}
              <span style={supSmall ? { fontSize: 36 } : undefined}>{sup}</span>
            </span>
            <div className="stat-bar" />
            <span className="stat-blabel">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

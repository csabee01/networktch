const stats = [
  { value: '15', suffix: '+', label: 'Év tapasztalat az IT szektorban' },
  { value: '1000', suffix: '+', label: 'Aktív kamera' },
  { value: '100', suffix: '%', suffixSmall: true, label: 'Testreszabott tervezés' },
]

export default function Stats() {
  return (
    <div className="stats-dark reveal">
      <div className="stats-inner">
        {stats.map((s, i) => (
          <div className="stat-block" key={i}>
            <span className="stat-big">
              {s.value}
              <span style={s.suffixSmall ? { fontSize: '36px' } : {}}>
                {s.suffix}
              </span>
            </span>
            <div className="stat-bar" />
            <span className="stat-blabel">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const brands = [
  'Novus','Hikvision','Fortinet','Ubiquiti',
  'Dahua','MikroTik','Honeywell','Microsoft','VMware',
]

export default function MarqueeSection() {
  const doubled = [...brands, ...brands]
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((b, i) => (
          <div className="marquee-item" key={i}>
            <span />{b}
          </div>
        ))}
      </div>
    </div>
  )
}

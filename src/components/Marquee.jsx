const BRANDS = ['Cisco','Hikvision','Fortinet','Ubiquiti','Dahua','MikroTik','Axis','Honeywell','Microsoft','VMware']

export default function Marquee() {
  const doubled = [...BRANDS, ...BRANDS]
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((b, i) => (
          <div className="marquee-item" key={i}>
            <span />
            {b}
          </div>
        ))}
      </div>
    </div>
  )
}

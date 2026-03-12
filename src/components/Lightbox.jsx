import { X } from 'lucide-react'

export default function Lightbox({ pin, onClose }) {
  if (!pin) return null

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close btn-ghost" onClick={onClose}>
          <X size={24} />
        </button>
        <img src={pin.imageUrl} alt={pin.title} />
        <div className="lightbox-info">
          <h3>{pin.title}</h3>
          {pin.note && <p>{pin.note}</p>}
          {pin.room && <p style={{ marginTop: 4, opacity: 0.5 }}>{pin.room}</p>}
        </div>
      </div>
    </div>
  )
}

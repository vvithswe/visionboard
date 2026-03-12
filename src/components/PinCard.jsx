import { Trash2, Edit3, ImageOff } from 'lucide-react'
import { useState } from 'react'

export default function PinCard({ pin, onDelete, onEdit, onClick }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="pin-card">
      <div className="pin-card-actions">
        <button onClick={(e) => { e.stopPropagation(); onEdit(pin) }} title="Edit">
          <Edit3 size={14} />
        </button>
        <button
          className="delete-btn"
          onClick={(e) => { e.stopPropagation(); onDelete(pin.id) }}
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div onClick={() => onClick(pin)} style={{ cursor: 'pointer' }}>
        {imgError ? (
          <div
            className="pin-card-image"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-surface-alt)',
            }}
          >
            <ImageOff size={32} color="var(--color-border)" />
          </div>
        ) : (
          <img
            className="pin-card-image"
            src={pin.imageUrl}
            alt={pin.title}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="pin-card-body">
        <div className="pin-card-title">{pin.title}</div>
        {pin.note && <div className="pin-card-note">{pin.note}</div>}
        {pin.room && <span className="pin-card-room">{pin.room}</span>}
      </div>
    </div>
  )
}

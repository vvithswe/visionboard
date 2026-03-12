import { useNavigate } from 'react-router-dom'
import { Trash2, ImageOff } from 'lucide-react'

export default function BoardCard({ board, onDelete }) {
  const navigate = useNavigate()
  const previewPins = board.pins.slice(0, 4)
  const pinCount = board.pins.length

  return (
    <div className="card board-card" onClick={() => navigate(`/board/${board.id}`)}>
      <div className="board-card-actions">
        <button
          className="pin-card-actions"
          style={{
            opacity: 1,
            position: 'static',
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text)',
            boxShadow: 'var(--shadow-sm)',
          }}
          onClick={(e) => {
            e.stopPropagation()
            onDelete(board.id)
          }}
          title="Delete board"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="board-card-preview">
        {[0, 1, 2, 3].map(i => {
          const pin = previewPins[i]
          if (pin) {
            return (
              <img
                key={i}
                src={pin.imageUrl}
                alt={pin.title}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.insertAdjacentHTML(
                    'beforeend',
                    '<div class="preview-placeholder" style="display:flex;align-items:center;justify-content:center"></div>'
                  )
                }}
              />
            )
          }
          return <div key={i} className="preview-placeholder"><ImageOff size={20} /></div>
        })}
      </div>
      <div className="board-card-body">
        <div className="board-card-title">{board.name}</div>
        <div className="board-card-meta">
          {pinCount} {pinCount === 1 ? 'pin' : 'pins'}
          {board.description && ` · ${board.description}`}
        </div>
      </div>
    </div>
  )
}

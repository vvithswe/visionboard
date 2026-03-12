import { useState } from 'react'
import { ROOM_CATEGORIES } from '../utils/rooms'

export default function AddPinModal({ onClose, onSubmit, editPin = null }) {
  const [title, setTitle] = useState(editPin?.title || '')
  const [imageUrl, setImageUrl] = useState(editPin?.imageUrl || '')
  const [note, setNote] = useState(editPin?.note || '')
  const [room, setRoom] = useState(editPin?.room || '')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !imageUrl.trim()) return
    onSubmit({
      title: title.trim(),
      imageUrl: imageUrl.trim(),
      note: note.trim(),
      room,
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{editPin ? 'Edit Pin' : 'Add Inspiration'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pin-title">Title</label>
            <input
              id="pin-title"
              type="text"
              placeholder="e.g., Marble kitchen island"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="pin-image">Image URL</label>
            <input
              id="pin-image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
          </div>
          {imageUrl && (
            <div className="form-group">
              <img
                src={imageUrl}
                alt="Preview"
                style={{
                  width: '100%',
                  maxHeight: 200,
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-surface-alt)',
                }}
                onError={e => { e.target.style.display = 'none' }}
              />
            </div>
          )}
          <div className="form-group">
            <label>Room / Category</label>
            <div className="room-tags">
              {ROOM_CATEGORIES.map(r => (
                <button
                  key={r}
                  type="button"
                  className={`room-tag ${room === r ? 'active' : ''}`}
                  onClick={() => setRoom(room === r ? '' : r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="pin-note">Notes (optional)</label>
            <textarea
              id="pin-note"
              placeholder="Color palette, materials, price notes..."
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!title.trim() || !imageUrl.trim()}
            >
              {editPin ? 'Save Changes' : 'Add Pin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

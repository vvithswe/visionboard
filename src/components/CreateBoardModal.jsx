import { useState } from 'react'

export default function CreateBoardModal({ onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit(name.trim(), description.trim())
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Create New Board</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="board-name">Board Name</label>
            <input
              id="board-name"
              type="text"
              placeholder="e.g., Modern Farmhouse, Cozy Cabin"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="board-desc">Description (optional)</label>
            <textarea
              id="board-desc"
              placeholder="Describe your dream home vision..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={!name.trim()}>
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

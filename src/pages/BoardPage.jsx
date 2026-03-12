import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, ArrowLeft, ImagePlus } from 'lucide-react'
import { useBoardContext } from '../context/BoardContext.jsx'
import { ROOM_CATEGORIES } from '../utils/rooms.js'
import PinCard from '../components/PinCard.jsx'
import AddPinModal from '../components/AddPinModal.jsx'
import Lightbox from '../components/Lightbox.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'

export default function BoardPage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { getBoard, addPin, updatePin, deletePin } = useBoardContext()
  const board = getBoard(boardId)

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPin, setEditingPin] = useState(null)
  const [lightboxPin, setLightboxPin] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [filterRoom, setFilterRoom] = useState('')

  const filteredPins = useMemo(() => {
    if (!board) return []
    if (!filterRoom) return board.pins
    return board.pins.filter(p => p.room === filterRoom)
  }, [board, filterRoom])

  const activeRooms = useMemo(() => {
    if (!board) return []
    const rooms = new Set(board.pins.map(p => p.room).filter(Boolean))
    return ROOM_CATEGORIES.filter(r => rooms.has(r))
  }, [board])

  if (!board) {
    return (
      <div className="empty-state">
        <h3>Board not found</h3>
        <p>This board may have been deleted.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    )
  }

  function handleAddPin(pinData) {
    addPin(boardId, pinData)
  }

  function handleEditPin(pinData) {
    updatePin(boardId, editingPin.id, pinData)
    setEditingPin(null)
  }

  function handleDeletePin() {
    deletePin(boardId, deleteTarget)
    setDeleteTarget(null)
  }

  return (
    <>
      <div className="board-header">
        <div>
          <button
            className="btn btn-ghost"
            onClick={() => navigate('/')}
            style={{ marginBottom: 8, marginLeft: -8 }}
          >
            <ArrowLeft size={18} />
            All Boards
          </button>
          <h1>{board.name}</h1>
          {board.description && <p>{board.description}</p>}
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} />
          Add Pin
        </button>
      </div>

      {activeRooms.length > 0 && (
        <div className="board-toolbar">
          <div className="board-toolbar-left">
            <button
              className={`room-tag ${filterRoom === '' ? 'active' : ''}`}
              onClick={() => setFilterRoom('')}
            >
              All ({board.pins.length})
            </button>
            {activeRooms.map(room => (
              <button
                key={room}
                className={`room-tag ${filterRoom === room ? 'active' : ''}`}
                onClick={() => setFilterRoom(filterRoom === room ? '' : room)}
              >
                {room} ({board.pins.filter(p => p.room === room).length})
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredPins.length === 0 ? (
        <div className="empty-state">
          <ImagePlus size={48} />
          <h3>{filterRoom ? `No ${filterRoom} pins yet` : 'No pins yet'}</h3>
          <p>
            {filterRoom
              ? 'Add some inspiration for this room!'
              : 'Start adding images and inspiration for your dream home.'}
          </p>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            Add First Pin
          </button>
        </div>
      ) : (
        <div className="pin-grid">
          {filteredPins.map(pin => (
            <PinCard
              key={pin.id}
              pin={pin}
              onDelete={(id) => setDeleteTarget(id)}
              onEdit={(p) => setEditingPin(p)}
              onClick={(p) => setLightboxPin(p)}
            />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddPinModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddPin}
        />
      )}

      {editingPin && (
        <AddPinModal
          editPin={editingPin}
          onClose={() => setEditingPin(null)}
          onSubmit={handleEditPin}
        />
      )}

      {lightboxPin && (
        <Lightbox pin={lightboxPin} onClose={() => setLightboxPin(null)} />
      )}

      {deleteTarget && (
        <ConfirmDialog
          message="This pin will be permanently deleted."
          onConfirm={handleDeletePin}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}

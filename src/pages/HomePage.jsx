import { useState } from 'react'
import { Plus, Home } from 'lucide-react'
import { useBoardContext } from '../context/BoardContext.jsx'
import BoardCard from '../components/BoardCard.jsx'
import CreateBoardModal from '../components/CreateBoardModal.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'

export default function HomePage() {
  const { boards, createBoard, deleteBoard } = useBoardContext()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  function handleCreate(name, description) {
    createBoard(name, description)
  }

  function handleDelete(id) {
    setDeleteTarget(id)
  }

  function confirmDelete() {
    deleteBoard(deleteTarget)
    setDeleteTarget(null)
  }

  return (
    <>
      <div className="page-title-section">
        <h1>My Vision Boards</h1>
        <p>Curate your dream home, one room at a time</p>
      </div>

      {boards.length === 0 ? (
        <div className="empty-state">
          <Home size={48} />
          <h3>Start Your Dream Home Journey</h3>
          <p>Create your first vision board to begin collecting inspiration for your perfect home.</p>
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={18} />
            Create First Board
          </button>
        </div>
      ) : (
        <>
          <div style={{ paddingTop: 16 }}>
            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
              <Plus size={18} />
              New Board
            </button>
          </div>
          <div className="boards-grid">
            {boards.map(board => (
              <BoardCard key={board.id} board={board} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}

      {showCreateModal && (
        <CreateBoardModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreate}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          message="This will permanently delete this board and all its pins."
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}

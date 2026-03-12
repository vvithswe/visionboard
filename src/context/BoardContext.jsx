import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { loadBoards, saveBoards } from '../utils/storage'

const BoardContext = createContext(null)

export function useBoardContext() {
  const context = useContext(BoardContext)
  if (!context) throw new Error('useBoardContext must be used within BoardProvider')
  return context
}

export function BoardProvider({ children }) {
  const [boards, setBoards] = useState(() => loadBoards())

  useEffect(() => {
    saveBoards(boards)
  }, [boards])

  const createBoard = useCallback((name, description = '') => {
    const board = {
      id: uuidv4(),
      name,
      description,
      pins: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setBoards(prev => [board, ...prev])
    return board.id
  }, [])

  const updateBoard = useCallback((id, updates) => {
    setBoards(prev =>
      prev.map(b =>
        b.id === id
          ? { ...b, ...updates, updatedAt: new Date().toISOString() }
          : b
      )
    )
  }, [])

  const deleteBoard = useCallback((id) => {
    setBoards(prev => prev.filter(b => b.id !== id))
  }, [])

  const addPin = useCallback((boardId, pin) => {
    const newPin = {
      id: uuidv4(),
      ...pin,
      createdAt: new Date().toISOString(),
    }
    setBoards(prev =>
      prev.map(b =>
        b.id === boardId
          ? { ...b, pins: [newPin, ...b.pins], updatedAt: new Date().toISOString() }
          : b
      )
    )
  }, [])

  const updatePin = useCallback((boardId, pinId, updates) => {
    setBoards(prev =>
      prev.map(b =>
        b.id === boardId
          ? {
              ...b,
              pins: b.pins.map(p => (p.id === pinId ? { ...p, ...updates } : p)),
              updatedAt: new Date().toISOString(),
            }
          : b
      )
    )
  }, [])

  const deletePin = useCallback((boardId, pinId) => {
    setBoards(prev =>
      prev.map(b =>
        b.id === boardId
          ? {
              ...b,
              pins: b.pins.filter(p => p.id !== pinId),
              updatedAt: new Date().toISOString(),
            }
          : b
      )
    )
  }, [])

  const getBoard = useCallback((id) => {
    return boards.find(b => b.id === id) || null
  }, [boards])

  return (
    <BoardContext.Provider
      value={{
        boards,
        createBoard,
        updateBoard,
        deleteBoard,
        addPin,
        updatePin,
        deletePin,
        getBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

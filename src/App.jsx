import { Routes, Route, Link } from 'react-router-dom'
import { Home as HomeIcon } from 'lucide-react'
import HomePage from './pages/HomePage.jsx'
import BoardPage from './pages/BoardPage.jsx'

function App() {
  return (
    <>
      <header className="app-header">
        <div className="header-inner">
          <Link to="/" className="app-logo">
            <HomeIcon size={24} />
            Dream Home
          </Link>
        </div>
      </header>
      <main className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App

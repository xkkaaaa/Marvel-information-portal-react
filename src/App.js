import AppHeader from './components/appHeader/AppHeader'
import ComicsPage from './pages/ComicsPage'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/comics" element={<ComicsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

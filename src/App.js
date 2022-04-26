import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppHeader from './components/appHeader'
import ComicsPage from './pages/ComicsPage'
import HomePage from './pages/HomePage'
import Error404 from './pages/Error404'
import SingleComicPage from './pages/SingleComicPage'
import SingleCharacterPage from './pages/SingleCharacterPage'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:comicId" element={<SingleComicPage />} />
            <Route path="/characters/:characterId" element={<SingleCharacterPage />} />
            <Route path="*" element={  <Error404 />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

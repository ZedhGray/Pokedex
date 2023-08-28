import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import ProtectedRoutes from './pages/ProtectedRoutes'
import PokedexName from './components/Pokedex/PokedexName'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:name" element={<PokedexName />} />
        </Route>

        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  )
}

export default App

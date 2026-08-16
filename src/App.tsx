import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { GamePage } from './pages/GamePage'
import { LandingPage } from './pages/LandingPage'

/**
 * App routes: `/` = landing page (placeholder for now), `/game` = the 3D
 * world. The scene chunk stays code-split inside GamePage, so `/` never
 * loads three.js. Unknown paths redirect home.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

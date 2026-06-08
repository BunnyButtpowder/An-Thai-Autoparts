import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="gioi-thieu" element={<AboutPage />} />
    </Routes>
  )
}

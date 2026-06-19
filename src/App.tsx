import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NewsPage from './pages/NewsPage'

export default function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="gioi-thieu" element={<AboutPage />} />
      <Route path="tin-tuc" element={<NewsPage />} />
      <Route path="lien-he" element={<ContactPage />} />
    </Routes>
  )
}

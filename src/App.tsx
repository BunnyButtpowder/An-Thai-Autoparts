import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import HomePageV2 from './pages/HomePageV2'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NewsPage from './pages/NewsPage'
import RecruitmentPage from './pages/RecruitmentPage'
import RecruitmentDetailPage from './pages/RecruitmentDetailPage'

export default function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="trang-chu-v2" element={<HomePageV2 />} />
      <Route path="gioi-thieu" element={<AboutPage />} />
      <Route path="tin-tuc" element={<NewsPage />} />
      <Route path="lien-he" element={<ContactPage />} />
      <Route path="tuyen-dung" element={<RecruitmentPage />} />
      <Route path="tuyen-dung/:id" element={<RecruitmentDetailPage />} />
    </Routes>
  )
}

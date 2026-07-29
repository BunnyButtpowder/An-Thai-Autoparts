import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductPage from './pages/ProductPage'
import ContactPage from './pages/ContactPage'
import NewsPage from './pages/NewsPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import RecruitmentPage from './pages/RecruitmentPage'
import RecruitmentDetailPage from './pages/RecruitmentDetailPage'
import ManufacturePage from './pages/ManufacturePage'
import ImportDistributionPage from './pages/ImportDistributionPage'
import VehicleInspectionPage from './pages/VehicleInspectionPage'
import CommercialServicesPage from './pages/CommercialServicesPage'
import RepairOverhaulPage from './pages/RepairOverhaulPage'

export default function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="gioi-thieu" element={<AboutPage />} />
      <Route path="san-pham" element={<ProductPage />} />
      <Route path="san-xuat-phu-tung" element={<ManufacturePage />} />
      <Route path="nhap-khau-phan-phoi" element={<ImportDistributionPage />} />
      <Route path="dang-kiem-xe" element={<VehicleInspectionPage />} />
      <Route path="dich-vu-thuong-mai" element={<CommercialServicesPage />} />
      <Route path="sua-chua-dai-tu" element={<RepairOverhaulPage />} />
      <Route path="tin-tuc" element={<NewsPage />} />
      <Route path="tin-tuc/:slug" element={<ArticleDetailPage />} />
      <Route path="lien-he" element={<ContactPage />} />
      <Route path="tuyen-dung" element={<RecruitmentPage />} />
      <Route path="tuyen-dung/:id" element={<RecruitmentDetailPage />} />
    </Routes>
  )
}

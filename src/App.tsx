import { Navigate, Route, Routes } from 'react-router-dom'
import {
  AboutPage,
  HowItWorksPage,
  LabsPage,
  NotFoundPage,
  PilotPage,
  PrivacyPage,
  TermsPage,
} from './pages/CompanyPages'
import { HomePage } from './pages/HomePage'
import { PartnerForgePage, Scope2PlanPage } from './pages/ProductDetailPages'
import { ProductsPage } from './pages/ProductsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/scope2plan" element={<Scope2PlanPage />} />
      <Route path="/products/partnerforge" element={<PartnerForgePage />} />
      <Route path="/scope2plan" element={<Navigate to="/products/scope2plan" replace />} />
      <Route
        path="/partnerforge"
        element={<Navigate to="/products/partnerforge" replace />}
      />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/labs" element={<LabsPage />} />
      <Route path="/pilot" element={<PilotPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

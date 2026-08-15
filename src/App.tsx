import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { LegacyHashRedirect } from './components/LegacyHashRedirect'
import { HomePage } from './pages/HomePage'

const ProductsPage = lazy(() =>
  import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })),
)
const Scope2PlanPage = lazy(() =>
  import('./pages/ProductDetailPages').then((m) => ({
    default: m.Scope2PlanPage,
  })),
)
const PartnerForgePage = lazy(() =>
  import('./pages/ProductDetailPages').then((m) => ({
    default: m.PartnerForgePage,
  })),
)
const HowItWorksPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.HowItWorksPage })),
)
const AboutPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.AboutPage })),
)
const CompanyPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.CompanyPage })),
)
const LabsPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.LabsPage })),
)
const PilotPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.PilotPage })),
)
const PrivacyPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.PrivacyPage })),
)
const TermsPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.TermsPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.NotFoundPage })),
)
const DesignSystemPage = lazy(() =>
  import('./pages/DesignSystemPage').then((m) => ({
    default: m.DesignSystemPage,
  })),
)

function RouteFallback() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-section)' }}>
      <p role="status">Loading page…</p>
    </div>
  )
}

function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, search])

  return null
}

export default function App() {
  return (
    <>
      <LegacyHashRedirect />
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/scope2plan" element={<Scope2PlanPage />} />
          <Route path="/products/partnerforge" element={<PartnerForgePage />} />
          <Route
            path="/scope2plan"
            element={<Navigate to="/products/scope2plan" replace />}
          />
          <Route
            path="/partnerforge"
            element={<Navigate to="/products/partnerforge" replace />}
          />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/labs" element={<LabsPage />} />
          <Route path="/pilot" element={<PilotPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

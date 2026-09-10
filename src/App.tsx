import { lazy, Suspense, useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { LegacyHashRedirect } from './components/LegacyHashRedirect'
import { HomePage } from './pages/HomePage'
import { loadProducts, loadProductDetails, loadSolvoBid, loadCompany } from './lib/page-loaders'

const ProductsPage = lazy(() =>
  loadProducts().then((m) => ({ default: m.ProductsPage })),
)
const SolvoBidPage = lazy(() => loadSolvoBid().then((m) => ({ default: m.SolvoBidPage })))
const Scope2PlanPage = lazy(() =>
  loadProductDetails().then((m) => ({
    default: m.Scope2PlanPage,
  })),
)
const PartnerForgePage = lazy(() =>
  loadProductDetails().then((m) => ({
    default: m.PartnerForgePage,
  })),
)
const WhoGetsTheCallPage = lazy(() =>
  loadProductDetails().then((m) => ({
    default: m.WhoGetsTheCallPage,
  })),
)
const HowItWorksPage = lazy(() =>
  loadCompany().then((m) => ({ default: m.HowItWorksPage })),
)
const AboutPage = lazy(() =>
  loadCompany().then((m) => ({ default: m.AboutPage })),
)
const LabsPage = lazy(() =>
  loadCompany().then((m) => ({ default: m.LabsPage })),
)
const PilotPage = lazy(() =>
  loadCompany().then((m) => ({ default: m.PilotPage })),
)
const PrivacyPage = lazy(() =>
  loadCompany().then((m) => ({ default: m.PrivacyPage })),
)
const TermsPage = lazy(() =>
  loadCompany().then((m) => ({ default: m.TermsPage })),
)
const NotFoundPage = lazy(() =>
  loadCompany().then((m) => ({ default: m.NotFoundPage })),
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
  const { pathname, search, hash } = useLocation()

  useLayoutEffect(() => {
    // Run after the destination has mounted, not while its chunk is loading.
    // Page changes must not inherit the smooth scroll used for in-page anchors.
    let target: HTMLElement | null = null
    try { target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null } catch { /* malformed URL fragment */ }
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, search, hash])

  return null
}

export default function App() {
  return (
    <>
      <LegacyHashRedirect />
      <Suspense fallback={<RouteFallback />}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/solvoplan" element={<Scope2PlanPage />} />
        <Route path="/products/solvofind" element={<PartnerForgePage />} />
        <Route path="/products/solvobid" element={<SolvoBidPage />} />
        <Route path="/products/scope2plan" element={<Scope2PlanPage />} />
          <Route path="/products/partnerforge" element={<PartnerForgePage />} />
          <Route
            path="/marketplace/who-gets-the-call"
            element={<WhoGetsTheCallPage />}
          />
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

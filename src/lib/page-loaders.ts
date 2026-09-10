// Shared by lazy routes and link intent so preloading uses the same chunks.
export const loadProducts = () => import('../pages/ProductsPage')
export const loadProductDetails = () => import('../pages/ProductDetailPages')
export const loadSolvoBid = () => import('../pages/SolvoBidPage')
export const loadCompany = () => import('../pages/CompanyPages')

export function prefetchRoute(href: string) {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  if (connection?.saveData || connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') return
  const path = href.split(/[?#]/)[0]
  const loader = path === '/products' ? loadProducts
    : path === '/products/solvobid' ? loadSolvoBid
    : ['/products/solvoplan', '/products/solvofind', '/products/scope2plan', '/products/partnerforge', '/marketplace/who-gets-the-call'].includes(path) ? loadProductDetails
    : ['/pilot', '/about', '/how-it-works', '/labs', '/privacy', '/terms'].includes(path) ? loadCompany
    : undefined
  // A speculative request must never interfere with the actual navigation.
  if (loader) void loader().catch(() => {})
}

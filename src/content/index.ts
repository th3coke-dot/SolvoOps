export {
  company,
} from './company'
export {
  primaryNavigation,
  secondaryNavigation,
  legacyHomeNavigation,
  footerNavigation,
  type NavItem,
} from './navigation'
export {
  products,
  primaryProducts,
  labsProducts,
  getProductById,
  homepageDemoProducts,
  type ProductConfig,
  type ProductTier,
} from './products'
export {
  productStatusById,
  productStatusLabels,
  getStatusLabel,
  type ProductStatus,
} from './product-status'
export { useCases } from './use-cases'
export { homepageContent } from './homepage'
export {
  siteMetadata,
  pagesMetadata,
  metadataForProduct,
  type PageMetadata,
} from './site-metadata'

/** Feature flags for staged redesign rollout. */
export const featureFlags = {
  /**
   * When true, placeholder IA pages may surface redesign primary nav.
   * Homepage keeps legacy nav until PR 4/5 regardless.
   * Enable in preview with VITE_SHOW_IA_NAV=true.
   */
  showIaNav: import.meta.env.VITE_SHOW_IA_NAV === 'true',
} as const

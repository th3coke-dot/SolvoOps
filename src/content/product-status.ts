/** Central product availability labels — do not hard-code in page components. */
export type ProductStatus =
  | 'available'
  | 'private-preview'
  | 'pilot'
  | 'in-development'
  | 'planned'
  | 'live'
  | 'live-marketplace'

export const productStatusLabels: Record<ProductStatus, string> = {
  available: 'Available',
  'private-preview': 'Private preview',
  pilot: 'Pilot',
  'in-development': 'In development',
  planned: 'Planned',
  live: 'Live',
  'live-marketplace': 'Live marketplace',
}

/**
 * Product availability statuses — owner-confirmed for production launch (2026-08-06).
 * Keep page components reading from this map; do not hard-code labels in UI.
 */
export const productStatusById = {
  'scope2plan-generate': 'available',
  'scope2plan-control': 'in-development',
  scope2plan: 'pilot',
  partnerforge: 'private-preview',
  bizdayz: 'available',
  autoname: 'available',
  'who-gets-the-call': 'live-marketplace',
} as const satisfies Record<string, ProductStatus>

export type ProductId = keyof typeof productStatusById

export function getStatusLabel(status: ProductStatus): string {
  return productStatusLabels[status]
}

/** Central product availability labels — do not hard-code in page components. */
export type ProductStatus =
  | 'available'
  | 'private-preview'
  | 'pilot'
  | 'in-development'
  | 'planned'

export const productStatusLabels: Record<ProductStatus, string> = {
  available: 'Available',
  'private-preview': 'Private preview',
  pilot: 'Pilot',
  'in-development': 'In development',
  planned: 'Planned',
}

/**
 * Draft statuses from PR 1 audit. Treat as provisional until product-owner
 * confirmation (see docs/redesign/content-inventory.md).
 */
export const productStatusById = {
  'scope2plan-generate': 'available',
  'scope2plan-control': 'in-development',
  scope2plan: 'pilot',
  partnerforge: 'private-preview',
  bizdayz: 'available',
  autoname: 'available',
} as const satisfies Record<string, ProductStatus>

export type ProductId = keyof typeof productStatusById

export function getStatusLabel(status: ProductStatus): string {
  return productStatusLabels[status]
}

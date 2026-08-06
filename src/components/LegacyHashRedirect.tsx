import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const legacyHashRoutes: Record<string, string> = {
  '#top': '/',
  '#work': '/products',
  '#approach': '/how-it-works',
  '#contact': '/pilot',
}

/**
 * Maps production-era homepage hash links to redesign routes.
 * Only runs when the visitor is on `/` with a recognised hash.
 */
export function LegacyHashRedirect() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname !== '/') return
    const target = legacyHashRoutes[location.hash]
    if (!target) return
    navigate(target, { replace: true })
  }, [location.hash, location.pathname, navigate])

  return null
}

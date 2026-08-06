/** True for Vercel preview / development — production builds stay indexable. */
export function shouldNoIndex(): boolean {
  const vercelEnv =
    import.meta.env.VITE_VERCEL_ENV ||
    import.meta.env.VERCEL_ENV ||
    import.meta.env.MODE
  if (import.meta.env.DEV) return true
  return vercelEnv === 'preview' || vercelEnv === 'development'
}

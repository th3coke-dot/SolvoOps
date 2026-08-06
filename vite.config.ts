/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Expose Vercel env to the client for preview noindex behaviour.
  envPrefix: ['VITE_', 'VERCEL_'],
  define: {
    'import.meta.env.VITE_VERCEL_ENV': JSON.stringify(
      process.env.VERCEL_ENV ?? process.env.VITE_VERCEL_ENV ?? '',
    ),
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
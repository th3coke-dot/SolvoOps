import { createJiti } from 'jiti'
import type { Plugin } from 'vite'
import { fileURLToPath } from 'node:url'

const jiti = createJiti(fileURLToPath(import.meta.url))

function loadHomePrerenderHtml(): string {
  const { getHomePrerenderHtml } = jiti('./src/prerender/homeSnapshot.ts') as {
    getHomePrerenderHtml: () => string
  }
  return getHomePrerenderHtml()
}

export function homePrerenderPlugin(): Plugin {
  let cachedHtml: string | undefined

  return {
    name: 'solvoops-home-prerender',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        cachedHtml ??= loadHomePrerenderHtml()
        return html.replace(
          '<div id="root"></div>',
          `<div id="root">${cachedHtml}</div>`,
        )
      },
    },
  }
}

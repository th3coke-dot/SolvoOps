import { useEffect } from 'react'
import { siteMetadata, type PageMetadata } from '../content'
import { shouldNoIndex } from '../lib/seo'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  )
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

type DocumentMetaProps = {
  metadata: PageMetadata
}

export function DocumentMeta({ metadata }: DocumentMetaProps) {
  useEffect(() => {
    document.title = metadata.title
    upsertMeta('name', 'description', metadata.description)
    upsertCanonical(`${siteMetadata.siteUrl}${metadata.path === '/' ? '' : metadata.path}`)

    const noIndex = metadata.noIndex || shouldNoIndex()
    upsertMeta(
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow',
    )
  }, [metadata])

  return null
}

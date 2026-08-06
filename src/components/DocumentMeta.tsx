import { useEffect } from 'react'
import { siteMetadata, type PageMetadata } from '../content'
import { shouldNoIndex } from '../lib/seo'
import { StructuredData } from './StructuredData'

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
    const path = metadata.path === '/' ? '' : metadata.path
    const canonical = `${siteMetadata.siteUrl}${path}`
    const ogImage = `${siteMetadata.siteUrl}${siteMetadata.ogImagePath}`

    document.title = metadata.title
    upsertMeta('name', 'description', metadata.description)
    upsertCanonical(canonical)

    const noIndex = metadata.noIndex || shouldNoIndex()
    upsertMeta(
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow',
    )

    upsertMeta('property', 'og:type', metadata.path === '/' ? 'website' : 'article')
    upsertMeta('property', 'og:site_name', siteMetadata.siteName)
    upsertMeta('property', 'og:locale', siteMetadata.ogLocale)
    upsertMeta('property', 'og:title', metadata.title)
    upsertMeta('property', 'og:description', metadata.description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:image:alt', `${siteMetadata.siteName} — operational intelligence`)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', metadata.title)
    upsertMeta('name', 'twitter:description', metadata.description)
    upsertMeta('name', 'twitter:image', ogImage)
  }, [metadata])

  return <StructuredData metadata={metadata} />
}

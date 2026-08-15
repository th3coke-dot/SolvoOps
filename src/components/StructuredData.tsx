import { useEffect } from 'react'
import { company } from '../content/company'
import { primaryProducts } from '../content/products'
import { siteMetadata, type PageMetadata } from '../content'

type JsonLdProps = {
  metadata: PageMetadata
}

function upsertJsonLd(id: string, data: Record<string, unknown> | unknown[]) {
  let script = document.getElementById(id) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

export function StructuredData({ metadata }: JsonLdProps) {
  useEffect(() => {
    const organization = {
      '@type': 'Organization',
      '@id': `${company.siteUrl}/#organization`,
      name: company.name,
      legalName: company.operator.legalName,
      url: company.siteUrl,
      email: company.contactEmail,
      description: siteMetadata.defaultDescription,
      logo: `${company.siteUrl}/favicon.svg`,
      identifier: {
        '@type': 'PropertyValue',
        name: 'Organisation number',
        value: company.operator.organizationNumber,
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: company.operator.countryCode,
      },
    }

    const website = {
      '@type': 'WebSite',
      '@id': `${company.siteUrl}/#website`,
      url: company.siteUrl,
      name: company.name,
      description: siteMetadata.defaultDescription,
      publisher: { '@id': `${company.siteUrl}/#organization` },
      inLanguage: siteMetadata.locale,
    }

    const softwareApps = primaryProducts.map((product) => ({
      '@type': 'SoftwareApplication',
      name: product.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: product.description,
      url: `${company.siteUrl}${product.route}`,
    }))

    const webpage = {
      '@type': 'WebPage',
      '@id': `${company.siteUrl}${metadata.path === '/' ? '' : metadata.path}#webpage`,
      url: `${company.siteUrl}${metadata.path === '/' ? '' : metadata.path}`,
      name: metadata.title,
      description: metadata.description,
      isPartOf: { '@id': `${company.siteUrl}/#website` },
      about: { '@id': `${company.siteUrl}/#organization` },
    }

    upsertJsonLd('solvoops-jsonld', {
      '@context': 'https://schema.org',
      '@graph': [organization, website, webpage, ...softwareApps],
    })
  }, [metadata])

  return null
}

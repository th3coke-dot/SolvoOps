import { Link } from 'react-router-dom'
import { DocumentMeta } from '../components/DocumentMeta'
import { PlaceholderLayout } from '../components/PlaceholderLayout'
import { company, getProductById, pagesMetadata } from '../content'

function CapabilityLists({
  available,
  pilot,
  planned,
}: {
  available: string[]
  pilot: string[]
  planned: string[]
}) {
  return (
    <>
      {available.length > 0 && (
        <>
          <p>
            <strong>Available capabilities</strong>
          </p>
          <ul>
            {available.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
      {pilot.length > 0 && (
        <>
          <p>
            <strong>Pilot capabilities</strong>
          </p>
          <ul>
            {pilot.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
      {planned.length > 0 && (
        <>
          <p>
            <strong>Planned capabilities</strong>
          </p>
          <ul>
            {planned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export function Scope2PlanPage() {
  const product = getProductById('scope2plan')
  if (!product) return null

  return (
    <>
      <DocumentMeta metadata={pagesMetadata.scope2plan} />
      <PlaceholderLayout eyebrow={product.category} title={product.name}>
        <p>
          <span className="ia-status">{product.statusLabel}</span>
        </p>
        <p>{product.headline}</p>
        <p>{product.description}</p>
        <p>
          <strong>Scope2Plan Generate</strong> creates the initial project
          package from source material.
        </p>
        <p>
          <strong>Scope2Plan Control</strong> is labelled separately — see
          planned capabilities below until availability is confirmed.
        </p>
        <CapabilityLists
          available={product.availableCapabilities}
          pilot={product.pilotCapabilities}
          planned={product.plannedCapabilities}
        />
        <p>{company.connectedWorkflowNote}</p>
        <p>
          <Link to={product.pilotUrl}>Discuss a Scope2Plan pilot</Link>
          {product.productUrl ? (
            <>
              {' · '}
              <a href={product.productUrl} rel="noreferrer" target="_blank">
                View Scope2Plan
              </a>
            </>
          ) : null}
        </p>
        <p>
          <Link to="/products">All products</Link>
        </p>
      </PlaceholderLayout>
    </>
  )
}

export function PartnerForgePage() {
  const product = getProductById('partnerforge')
  if (!product) return null

  return (
    <>
      <DocumentMeta metadata={pagesMetadata.partnerforge} />
      <PlaceholderLayout eyebrow={product.category} title={product.name}>
        <p>
          <span className="ia-status">{product.statusLabel}</span>
        </p>
        <p>{product.headline}</p>
        <p>{product.description}</p>
        <CapabilityLists
          available={product.availableCapabilities}
          pilot={product.pilotCapabilities}
          planned={product.plannedCapabilities}
        />
        <p>
          CRM projection remains planned — do not treat PartnerForge as a live
          CRM replacement or integration unless separately confirmed.
        </p>
        <p>
          <Link to={product.pilotUrl}>Discuss a PartnerForge pilot</Link>
          {product.productUrl ? (
            <>
              {' · '}
              <a href={product.productUrl} rel="noreferrer" target="_blank">
                View PartnerForge
              </a>
            </>
          ) : null}
        </p>
        <p>
          <Link to="/products">All products</Link>
        </p>
      </PlaceholderLayout>
    </>
  )
}

import { Link, useSearchParams } from 'react-router-dom'
import { DocumentMeta } from '../components/DocumentMeta'
import { PlaceholderLayout } from '../components/PlaceholderLayout'
import { company, labsProducts, pagesMetadata, useCases } from '../content'

export function HowItWorksPage() {
  return (
    <>
      <DocumentMeta metadata={pagesMetadata.howItWorks} />
      <PlaceholderLayout
        eyebrow="How it works"
        title="Turn operational knowledge into repeatable systems"
      >
        <p>
          SolvoOps products are built around workflows that are important,
          repetitive and too dependent on fragmented information or individual
          experience.
        </p>
        <ol>
          <li>Understand the workflow</li>
          <li>Structure the information</li>
          <li>Apply focused intelligence</li>
          <li>Keep humans in control</li>
          <li>Connect with existing systems</li>
          <li>Measure the result</li>
        </ol>
        <p>{company.connectedWorkflowNote}</p>
        <p>
          <Link to="/products">Explore products</Link>
        </p>
      </PlaceholderLayout>
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <DocumentMeta metadata={pagesMetadata.about} />
      <PlaceholderLayout eyebrow="About" title="Built from real operational problems">
        <p>
          SolvoOps develops focused software products that turn
          knowledge-dependent delivery workflows into structured, repeatable
          systems.
        </p>
        <p>
          <strong>Mission:</strong> {company.mission}
        </p>
        <p>
          Founder biography is intentionally omitted until approved factual copy
          is provided (redesign package accuracy rules).
        </p>
        <p>
          <strong>Brand pillars (content model):</strong>
        </p>
        <ul>
          {company.pillars.map((pillar) => (
            <li key={pillar.id}>
              <strong>{pillar.title}</strong> — {pillar.body}
            </li>
          ))}
        </ul>
      </PlaceholderLayout>
    </>
  )
}

export function LabsPage() {
  return (
    <>
      <DocumentMeta metadata={pagesMetadata.labs} />
      <PlaceholderLayout eyebrow="SolvoOps Labs" title="Experiments and smaller tools">
        <p>
          Smaller tools and experiments used to explore new workflows,
          technologies and product ideas. Labs remains secondary to Scope2Plan
          and PartnerForge.
        </p>
        <ul>
          {labsProducts.map((product) => (
            <li key={product.id}>
              {product.productUrl ? (
                <a href={product.productUrl} rel="noreferrer" target="_blank">
                  {product.name}
                </a>
              ) : (
                product.name
              )}
              {' — '}
              {product.description}
              <div>
                <span className="ia-status">{product.statusLabel}</span>
              </div>
            </li>
          ))}
        </ul>
        <p>
          <Link to="/products">Primary products</Link>
        </p>
      </PlaceholderLayout>
    </>
  )
}

export function PilotPage() {
  const [params] = useSearchParams()
  const product = params.get('product')

  return (
    <>
      <DocumentMeta metadata={pagesMetadata.pilot} />
      <PlaceholderLayout eyebrow="Pilot" title="Test SolvoOps against a real workflow">
        <p>
          We work with organisations that want to test Scope2Plan or PartnerForge
          against a defined operational challenge.
        </p>
        {product ? (
          <p>
            Product of interest from link: <strong>{product}</strong>
          </p>
        ) : null}
        <p>
          <strong>Do not submit confidential customer information</strong> through
          marketing channels. A structured pilot form ships in PR 9; until then
          use email.
        </p>
        <p>
          <a href={`mailto:${company.contactEmail}`}>Email {company.contactEmail}</a>
        </p>
        <p>
          Example audiences and use cases are defined in the content model (
          {useCases.groups.length} delivery contexts).
        </p>
      </PlaceholderLayout>
    </>
  )
}

export function PrivacyPage() {
  return (
    <>
      <DocumentMeta metadata={pagesMetadata.privacy} />
      <PlaceholderLayout eyebrow="Legal" title="Privacy">
        <p>
          Placeholder privacy page for information architecture. Full policy copy
          will be added with legal review before production release.
        </p>
        <p>
          Contact: <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>
        </p>
      </PlaceholderLayout>
    </>
  )
}

export function TermsPage() {
  return (
    <>
      <DocumentMeta metadata={pagesMetadata.terms} />
      <PlaceholderLayout eyebrow="Legal" title="Terms">
        <p>
          Placeholder terms page for information architecture. Full terms will be
          added with legal review before production release.
        </p>
        <p>
          Contact: <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>
        </p>
      </PlaceholderLayout>
    </>
  )
}

export function NotFoundPage() {
  return (
    <>
      <DocumentMeta metadata={pagesMetadata.notFound} />
      <PlaceholderLayout eyebrow="404" title="Page not found">
        <p>The page you requested is not available.</p>
        <p>
          <Link to="/">Back to home</Link>
          {' · '}
          <Link to="/products">Products</Link>
        </p>
      </PlaceholderLayout>
    </>
  )
}

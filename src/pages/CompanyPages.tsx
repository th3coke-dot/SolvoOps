import { Link, useSearchParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import {
  CtaPanel,
  FeatureCard,
  LinkButton,
  ProductCard,
  ProductStatusBadge,
  WorkflowSteps,
} from '../components/ui'
import {
  company,
  getProductById,
  labsProducts,
  pagesMetadata,
  primaryProducts,
  useCases,
} from '../content'

export function ProductsPage() {
  return (
    <AppShell
      metadata={pagesMetadata.products}
      eyebrow="Products"
      title="Focused products for critical delivery workflows"
      copy="Each SolvoOps product solves a specific operational bottleneck while remaining compatible with the systems organisations already use."
    >
      <p>
        <strong>Primary commercial products</strong> — Labs tools are listed on{' '}
        <Link to="/labs">SolvoOps Labs</Link>.
      </p>
      <div>
        {primaryProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            ctaLabel="Explore"
            preferInternalRoute
          />
        ))}
      </div>
      <p style={{ marginTop: 'var(--space-6)' }}>{company.connectedWorkflowNote}</p>
    </AppShell>
  )
}

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
    <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
      {available.length > 0 && (
        <div>
          <h2 className="ds-feature-card__title">Available capabilities</h2>
          <ul>
            {available.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {pilot.length > 0 && (
        <div>
          <h2 className="ds-feature-card__title">Pilot capabilities</h2>
          <ul>
            {pilot.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {planned.length > 0 && (
        <div>
          <h2 className="ds-feature-card__title">Planned capabilities</h2>
          <ul>
            {planned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export function Scope2PlanPage() {
  const product = getProductById('scope2plan')
  if (!product) return null

  return (
    <AppShell
      metadata={pagesMetadata.scope2plan}
      eyebrow={product.category}
      title={product.name}
      copy={
        <>
          <ProductStatusBadge status={product.status} />
          <p style={{ marginTop: 'var(--space-3)' }}>{product.headline}</p>
          <p>{product.description}</p>
        </>
      }
    >
      <div
        style={{
          display: 'grid',
          gap: 'var(--space-5)',
          marginBottom: 'var(--space-8)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
        }}
      >
        <FeatureCard title="Scope2Plan Generate">
          Creates the initial project package from the source material.
        </FeatureCard>
        <FeatureCard title="Scope2Plan Control">
          Maintains alignment as requirements change — listed under planned
          capabilities until availability is confirmed.
        </FeatureCard>
      </div>
      <CapabilityLists
        available={product.availableCapabilities}
        pilot={product.pilotCapabilities}
        planned={product.plannedCapabilities}
      />
      <CtaPanel
        label="Next step"
        title="Discuss a Scope2Plan pilot"
        copy={company.connectedWorkflowNote}
        titleId="scope2plan-cta"
        actions={
          <>
            <LinkButton to={product.pilotUrl} variant="primary">
              Discuss a Scope2Plan pilot
            </LinkButton>
            {product.productUrl ? (
              <LinkButton to={product.productUrl} variant="secondary">
                View Scope2Plan
              </LinkButton>
            ) : null}
          </>
        }
      />
    </AppShell>
  )
}

export function PartnerForgePage() {
  const product = getProductById('partnerforge')
  if (!product) return null

  return (
    <AppShell
      metadata={pagesMetadata.partnerforge}
      eyebrow={product.category}
      title={product.name}
      copy={
        <>
          <ProductStatusBadge status={product.status} />
          <p style={{ marginTop: 'var(--space-3)' }}>{product.headline}</p>
          <p>{product.description}</p>
        </>
      }
    >
      <CapabilityLists
        available={product.availableCapabilities}
        pilot={product.pilotCapabilities}
        planned={product.plannedCapabilities}
      />
      <p style={{ marginTop: 'var(--space-6)' }}>
        CRM projection remains planned — PartnerForge is not presented as a live
        CRM replacement unless separately confirmed.
      </p>
      <CtaPanel
        label="Next step"
        title="Discuss a PartnerForge pilot"
        titleId="partnerforge-cta"
        actions={
          <>
            <LinkButton to={product.pilotUrl} variant="primary">
              Discuss a PartnerForge pilot
            </LinkButton>
            {product.productUrl ? (
              <LinkButton to={product.productUrl} variant="secondary">
                View PartnerForge
              </LinkButton>
            ) : null}
          </>
        }
      />
    </AppShell>
  )
}

export function HowItWorksPage() {
  return (
    <AppShell
      metadata={pagesMetadata.howItWorks}
      eyebrow="How it works"
      title="Turn operational knowledge into repeatable systems"
      copy="SolvoOps products are built around workflows that are important, repetitive and too dependent on fragmented information or individual experience."
    >
      <WorkflowSteps
        steps={[
          {
            title: 'Understand the workflow',
            body: 'Identify where time, quality or control is lost.',
          },
          {
            title: 'Structure the information',
            body: 'Convert documents, searches and decisions into usable operational data.',
          },
          {
            title: 'Apply focused intelligence',
            body: 'Use deterministic logic, AI and evidence where each provides the most value.',
          },
          {
            title: 'Keep humans in control',
            body: 'Important recommendations and changes remain reviewable and traceable.',
          },
          {
            title: 'Connect with existing systems',
            body: 'Fit the product into the delivery environment without forcing a full platform replacement.',
          },
          {
            title: 'Measure the result',
            body: 'Evaluate time saved, quality, reduced rework and operational control.',
          },
        ]}
      />
      <p style={{ marginTop: 'var(--space-6)' }}>
        <LinkButton to="/products" variant="secondary">
          Explore products
        </LinkButton>
      </p>
    </AppShell>
  )
}

export function AboutPage() {
  return (
    <AppShell
      metadata={pagesMetadata.about}
      eyebrow="About"
      title="Built from real operational problems"
      copy="SolvoOps develops focused software products that turn knowledge-dependent delivery workflows into structured, repeatable systems."
    >
      <p>
        <strong>Mission:</strong> {company.mission}
      </p>
      <p>
        Founder biography is intentionally omitted until approved factual copy is
        provided.
      </p>
      <div
        style={{
          display: 'grid',
          gap: 'var(--space-5)',
          marginTop: 'var(--space-7)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
        }}
      >
        {company.pillars.map((pillar) => (
          <FeatureCard key={pillar.id} title={pillar.title}>
            {pillar.body}
          </FeatureCard>
        ))}
      </div>
    </AppShell>
  )
}

export function LabsPage() {
  return (
    <AppShell
      metadata={pagesMetadata.labs}
      eyebrow="SolvoOps Labs"
      title="Experiments and smaller tools"
      copy="Smaller tools and experiments used to explore new workflows, technologies and product ideas. Labs remains secondary to Scope2Plan and PartnerForge."
    >
      <div>
        {labsProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            ctaLabel="Open"
            preferInternalRoute={false}
          />
        ))}
      </div>
    </AppShell>
  )
}

export function PilotPage() {
  const [params] = useSearchParams()
  const product = params.get('product')

  return (
    <AppShell
      metadata={pagesMetadata.pilot}
      eyebrow="Pilot"
      title="Test SolvoOps against a real workflow"
      copy="We work with organisations that want to test Scope2Plan or PartnerForge against a defined operational challenge."
    >
      {product ? (
        <p>
          Product of interest from link: <strong>{product}</strong>
        </p>
      ) : null}
      <p>
        <strong>Do not submit confidential customer information</strong> through
        marketing channels. A structured pilot form ships in PR 9; until then use
        email.
      </p>
      <p>
        Content model includes {useCases.groups.length} delivery contexts for
        later audience sections.
      </p>
      <CtaPanel
        title="Start a conversation"
        titleId="pilot-cta"
        actions={
          <LinkButton to={`mailto:${company.contactEmail}`} variant="ink">
            Email {company.contactEmail}
          </LinkButton>
        }
      />
    </AppShell>
  )
}

export function PrivacyPage() {
  return (
    <AppShell
      metadata={pagesMetadata.privacy}
      eyebrow="Legal"
      title="Privacy"
      copy="Placeholder privacy page. Full policy copy will be added with legal review before production release."
    >
      <p>
        Contact:{' '}
        <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>
      </p>
    </AppShell>
  )
}

export function TermsPage() {
  return (
    <AppShell
      metadata={pagesMetadata.terms}
      eyebrow="Legal"
      title="Terms"
      copy="Placeholder terms page. Full terms will be added with legal review before production release."
    >
      <p>
        Contact:{' '}
        <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>
      </p>
    </AppShell>
  )
}

export function NotFoundPage() {
  return (
    <AppShell
      metadata={pagesMetadata.notFound}
      eyebrow="404"
      title="Page not found"
      copy="The page you requested is not available."
    >
      <p style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <LinkButton to="/" variant="secondary">
          Back to home
        </LinkButton>
        <LinkButton to="/products" variant="primary">
          Products
        </LinkButton>
      </p>
    </AppShell>
  )
}

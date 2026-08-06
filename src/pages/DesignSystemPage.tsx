import { AppShell } from '../components/AppShell'
import {
  Badge,
  Button,
  CtaPanel,
  FeatureCard,
  LinkButton,
  ProductCard,
  ProductStatusBadge,
  SectionHeader,
  WorkflowSteps,
} from '../components/ui'
import { company, primaryProducts } from '../content'
import { contrastNotes } from '../styles/tokens'
import type { PageMetadata } from '../content'

const metadata: PageMetadata = {
  path: '/design-system',
  title: `Design system | ${company.name}`,
  description: 'Internal preview of SolvoOps redesign design-system foundations.',
  noIndex: true,
}

export function DesignSystemPage() {
  return (
    <AppShell
      metadata={metadata}
      eyebrow="Internal"
      title="Design system foundations"
      copy="Reusable tokens and components for the SolvoOps redesign. Not linked from primary navigation. Favicon and brand mark are unchanged."
    >
      <section style={{ display: 'grid', gap: 'var(--space-8)' }}>
        <div>
          <SectionHeader
            label="Colour"
            title="Brand palette and product accents"
            copy="Existing pine ink and amber signal are preserved. Product accents distinguish Scope2Plan and PartnerForge without replacing the logo."
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))',
              gap: 'var(--space-3)',
              marginTop: 'var(--space-5)',
            }}
          >
            {[
              ['Ink', 'var(--color-ink)'],
              ['Signal', 'var(--color-signal)'],
              ['Mist', 'var(--color-mist)'],
              ['Scope2Plan', 'var(--color-accent-scope2plan)'],
              ['PartnerForge', 'var(--color-accent-partnerforge)'],
            ].map(([label, color]) => (
              <div key={label}>
                <div
                  style={{
                    height: '3.5rem',
                    borderRadius: 'var(--radius-md)',
                    background: color,
                    border: '1px solid var(--color-border)',
                  }}
                />
                <p style={{ margin: '0.4rem 0 0', fontSize: 'var(--text-sm)' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
          <ul style={{ marginTop: 'var(--space-4)' }}>
            {contrastNotes.map((note) => (
              <li key={note.pair}>
                <strong>{note.pair}</strong> — {note.usage} ({note.target})
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeader label="Actions" title="Buttons" />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-3)',
              marginTop: 'var(--space-4)',
            }}
          >
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ink">Ink</Button>
            <LinkButton to="/pilot" variant="primary" size="sm">
              Link button
            </LinkButton>
          </div>
        </div>

        <div>
          <SectionHeader label="Status" title="Badges" />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-2)',
              marginTop: 'var(--space-4)',
            }}
          >
            <Badge soft accent="scope2plan">
              Category
            </Badge>
            <ProductStatusBadge status="available" />
            <ProductStatusBadge status="pilot" />
            <ProductStatusBadge status="private-preview" />
            <ProductStatusBadge status="in-development" />
            <ProductStatusBadge status="planned" />
          </div>
        </div>

        <div>
          <SectionHeader label="Products" title="Product cards" />
          <div style={{ marginTop: 'var(--space-4)' }}>
            {primaryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader label="Pattern" title="Feature + workflow + CTA" />
          <div
            style={{
              display: 'grid',
              gap: 'var(--space-5)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
              marginTop: 'var(--space-4)',
            }}
          >
            <FeatureCard title="Domain-focused">
              Each product is designed around a clearly defined operational problem.
            </FeatureCard>
            <FeatureCard title="Explainable">
              Important outputs should be supported by structured data and evidence.
            </FeatureCard>
          </div>
          <div style={{ marginTop: 'var(--space-6)' }}>
            <WorkflowSteps
              steps={[
                { title: 'Scope', body: 'Understand the work to be delivered.' },
                { title: 'Plan', body: 'Structure the delivery package.' },
                { title: 'Source', body: 'Identify who can deliver.' },
                { title: 'Control', body: 'Keep the project aligned as it changes.' },
              ]}
            />
          </div>
          <CtaPanel
            label="Pilot"
            title="Bring us an operational bottleneck"
            titleId="ds-cta"
            actions={
              <>
                <LinkButton to="/pilot" variant="primary">
                  Discuss a pilot
                </LinkButton>
                <LinkButton to="/products" variant="secondary">
                  Explore products
                </LinkButton>
              </>
            }
          />
        </div>
      </section>
    </AppShell>
  )
}

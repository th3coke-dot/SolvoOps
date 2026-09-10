import { CinematicPage } from '../components/CinematicPage'
import { FeatureCard, LinkButton, SectionHeader, WorkflowSteps } from '../components/ui'
import { pagesMetadata, whoGetsTheCallPage } from '../content'
import { trackEvent } from '../lib/analytics'

export function WhoGetsTheCallPage() {
  const page = whoGetsTheCallPage
  return <CinematicPage metadata={pagesMetadata.whoGetsTheCall} label="SolvoOps marketplace · Live"
    title={<>Who Gets<br /><em>the Call?</em></>} intro={page.intro}
    actions={<>
      <LinkButton to={page.primaryCta.href} variant="primary" onClick={() => trackEvent('who-gets-the-call', { placement: 'marketplace-detail', action: 'claim-a-lane' })}>{page.primaryCta.label}</LinkButton>
      <LinkButton to={page.secondaryCta.href} variant="secondary" onClick={() => trackEvent('who-gets-the-call', { placement: 'marketplace-detail', action: 'explore-map' })}>{page.secondaryCta.label}</LinkButton>
    </>}>
    <section className="container product-section" aria-labelledby="wgtc-lanes">
      <SectionHeader label="Paid sponsorship" title="Four ways to get the job done" id="wgtc-lanes" copy="Choose a country and a commercial lane. Your company’s website appears in that position on the public map." />
      <div className="product-capability-grid">{page.lanes.map(lane => <FeatureCard key={lane.name} title={lane.name}>{lane.category}</FeatureCard>)}</div>
    </section>
    <section className="container product-section" aria-labelledby="wgtc-how">
      <SectionHeader label="Claim a position" title="From website to map" id="wgtc-how" />
      <WorkflowSteps labelledBy="wgtc-how" steps={[
        { title: 'Choose your position', body: 'Pick a country and an available commercial lane.' },
        { title: 'Add your website', body: 'Submit the company website and complete a one-time sponsorship purchase. No account required.' },
        { title: 'Appear on the map', body: 'The position is published when payment is verified.' },
      ]} />
    </section>
    <section className="container product-section company-story" aria-labelledby="wgtc-providers">
      <SectionHeader label="The provider directory" title="Discovery beyond sponsorship" id="wgtc-providers" />
      <div className="company-story__body"><p>Companies can apply to the organic Providers directory without buying a map position. Paid sponsorship never changes provider ordering.</p><p>{page.ownership}</p><LinkButton to={page.secondaryCta.href} variant="secondary">Visit Who Gets the Call?</LinkButton></div>
    </section>
  </CinematicPage>
}

import { AppShell } from '../components/AppShell'
import { CinematicNav } from '../components/CinematicNav'
import { ProductHero, ProductActions } from '../components/ProductHero'
import { CtaPanel, FeatureCard, SectionHeader, WorkflowSteps } from '../components/ui'
import { pagesMetadata } from '../content'
import './ProductPage.css'
import './HomePage.css'
import './CinematicProductPage.css'

const actions = { name: 'SolvoBid', toolHref: 'https://solvobid.com', pilotHref: '/pilot?product=solvobid' }

export function SolvoBidPage() {
  return <AppShell metadata={pagesMetadata.solvobid} showPageHeader={false} showShellNav={false}
    shellTone="cinematic" mainClassName="solvo-cinematic product-page product-page--cinematic">
    <CinematicNav />
    <ProductHero {...actions} kind="bid" title="Understand the tender." accent="Prepare your response."
      description="Turn a tender pack into clear requirements. Keep each requirement beside the evidence that answers it, so your team can review the response with confidence." />
    <section className="container product-section" aria-labelledby="bid-workflow">
      <SectionHeader label="How it works" title="From tender pack to an informed response" id="bid-workflow"
        copy="Read the pack once. Bring the requirements, supporting evidence and review state into one workflow." />
      <WorkflowSteps labelledBy="bid-workflow" steps={[
        { title: 'Understand the requirements', body: 'Extract requirements from the tender pack and make the obligations easier to review.' },
        { title: 'Connect the evidence', body: 'Attach the evidence that answers each requirement and keep it alongside the work.' },
        { title: 'Review before responding', body: 'Track review state so the team can see what is supported and what still needs attention.' },
      ]} />
    </section>
    <section className="container product-section" aria-labelledby="bid-evidence">
      <SectionHeader label="Clarity before commitment" title="Keep the response grounded in evidence" id="bid-evidence"
        copy="Make the next review conversation about the requirements and the material that supports your response." />
      <div className="product-capability-grid">
        <FeatureCard title="Requirements in view">Give the team a structured view of what the tender is asking for.</FeatureCard>
        <FeatureCard title="Evidence beside the requirement">Keep supporting material connected to the question it answers.</FeatureCard>
        <FeatureCard title="A visible review state">See where the response is supported and where further review is needed.</FeatureCard>
      </div>
    </section>
    <section className="container product-section" aria-labelledby="bid-pilot">
      <CtaPanel title="Bring clarity to your next tender." titleId="bid-pilot"
        copy="Open SolvoBid, or discuss a pilot around your tender review workflow."
        actions={<ProductActions {...actions} />} />
    </section>
  </AppShell>
}

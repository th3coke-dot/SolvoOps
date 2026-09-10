import { useSearchParams } from 'react-router-dom'
import { CinematicPage } from '../components/CinematicPage'
import { PilotForm } from '../components/PilotForm'
import { FeatureCard, LinkButton, ProductCard, SectionHeader, WorkflowSteps } from '../components/ui'
import { EditorialHeading } from '../components/ui/EditorialHeading'
import { company, labsProducts, pagesMetadata } from '../content'
import { legalDraftNotice, privacyPageContent, termsPageContent } from '../content/legal'
import { pilotPageContent } from '../content/pilot'

export function HowItWorksPage() {
  return <CinematicPage metadata={pagesMetadata.howItWorks} label="How it works"
    title={<>Start with the work.<br /><em>Keep control.</em></>}
    intro="Bring the scope, tender or sourcing requirement. Turn it into a plan your team can review and act on."
    actions={<LinkButton to="/pilot" variant="primary">Discuss a pilot</LinkButton>}>
    <section className="container product-section" aria-labelledby="hiw-process">
      <SectionHeader label="The process" title="From information to action" id="hiw-process" />
      <WorkflowSteps labelledBy="hiw-process" steps={[
        { title: 'Define the work', body: 'Start with a real requirement and agree what a useful result looks like.' },
        { title: 'Make it usable', body: 'Extract the requirements, build the delivery plan or shortlist the partners.' },
        { title: 'Review and decide', body: 'Check the evidence and assumptions. Your team approves the decisions.' },
        { title: 'Put it to work', body: 'Use the outputs in your delivery workflow. Measure time saved and rework avoided.' },
      ]} />
    </section>
    <section className="container product-section" aria-labelledby="hiw-tools">
      <SectionHeader label="Choose your starting point" title="Three tools. One delivery journey." id="hiw-tools" />
      <div className="company-link-grid">
        <LinkButton to="/products/solvobid" variant="secondary">Understand the bid · SolvoBid</LinkButton>
        <LinkButton to="/products/solvoplan" variant="secondary">Plan the work · SolvoPlan</LinkButton>
        <LinkButton to="/products/solvofind" variant="secondary">Find partners · SolvoFind</LinkButton>
      </div>
    </section>
  </CinematicPage>
}

export function AboutPage() {
  return <CinematicPage metadata={pagesMetadata.about} label="About SolvoOps"
    title={<>Built from experience.<br /><em>Made for delivery.</em></>}
    intro="SolvoOps builds tools for the work between winning a project and delivering it: understanding the scope, planning the work and finding the right partners.">
    <section className="container product-section company-story" aria-labelledby="founder-title">
      <SectionHeader label="Our story" title="From operations to software" id="founder-title" />
      <div className="company-story__body">
        <p>Our founder’s background spans military service and international IT delivery, from technical leadership on deployments to enterprise infrastructure and transformation projects.</p>
        <p>Across those environments, the same problems kept returning: knowledge held in people’s heads, plans rebuilt from scratch and records falling behind the work. SolvoOps began as an independent, self-funded effort to solve them.</p>
        <blockquote>“Work smarter, not harder.”</blockquote>
      </div>
    </section>
    <section className="container product-section" aria-labelledby="principles-title">
      <SectionHeader label="Our approach" title="Useful automation. Human judgement." id="principles-title" />
      <div className="product-capability-grid">
        <FeatureCard title="Start with real work">Build around delivery tasks that cost teams time and create rework.</FeatureCard>
        <FeatureCard title="Keep decisions reviewable">Make evidence and assumptions visible so people can check the result.</FeatureCard>
        <FeatureCard title="Fit the workflow">Help teams work with their existing delivery tools and processes.</FeatureCard>
      </div>
      <div className="company-section-actions"><LinkButton to="/products" variant="primary">Explore our products</LinkButton><LinkButton to="/pilot" variant="secondary">Talk to us</LinkButton></div>
    </section>
  </CinematicPage>
}

export function LabsPage() {
  return <CinematicPage metadata={pagesMetadata.labs} label="SolvoOps Labs"
    title={<>Small tools.<br /><em>Practical possibilities.</em></>}
    intro="Experiments that make everyday work easier, from planning workdays to finding a name.">
    <section className="container product-section" aria-labelledby="labs-tools">
      <SectionHeader label="Explore" title="Tools from the lab" id="labs-tools" />
      <div className="company-tool-grid">{labsProducts.map(product => <ProductCard key={product.id} product={product} ctaLabel="Open" preferInternalRoute={false} />)}</div>
    </section>
  </CinematicPage>
}

export function PilotPage() {
  const [params] = useSearchParams()
  const product = params.get('product')
  return <CinematicPage metadata={pagesMetadata.pilot} label="Discuss a pilot" className="company-page--pilot"
    title={<>Bring a real challenge.<br /><em>Test what changes.</em></>}
    intro="Tell us where delivery gets stuck. We’ll discuss a focused pilot and how to judge the result."
    actions={<LinkButton to="#pilot-form-heading" variant="primary">Start a conversation</LinkButton>}>
    <section className="container product-section company-pilot-grid" aria-labelledby="pilot-form-heading">
      <aside>
        <SectionHeader label="A focused test" title="Start with one workflow" id="pilot-options" />
        <div className="company-pilot-options">{pilotPageContent.options.map(option => <article key={option.id}><h3>{option.title}</h3><p>{option.body}</p></article>)}</div>
      </aside>
      <div>
        <SectionHeader label="Get in touch" title="Let’s talk about your workflow" id="pilot-form-heading" />
        <PilotForm key={product} initialProduct={product} />
      </div>
    </section>
  </CinematicPage>
}

function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const content = kind === 'privacy' ? privacyPageContent : termsPageContent
  return <CinematicPage metadata={pagesMetadata[kind]} label={content.label} title={content.title} intro={content.lede} quiet className="company-page--legal">
    <div className="container legal-layout">
      <nav className="legal-index" aria-label="On this page"><p>On this page</p>{content.sections.map((section, index) => <a href={`#legal-${index}`} key={section.title}>{section.title}</a>)}</nav>
      <article className="legal-document" aria-label={`${content.label} details`}>
        <p className="legal-notice" role="note">{legalDraftNotice}</p>
        {content.sections.map((section, index) => <section id={`legal-${index}`} key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}
        <LinkButton to={`mailto:${company.contactEmail}`} variant="secondary">Email {company.contactEmail}</LinkButton>
      </article>
    </div>
  </CinematicPage>
}
export function PrivacyPage() { return <LegalPage kind="privacy" /> }
export function TermsPage() { return <LegalPage kind="terms" /> }

export function NotFoundPage() {
  return <CinematicPage metadata={pagesMetadata.notFound} label="404" title={<EditorialHeading text="Let’s get you back on track." accent="back on track." />}
    intro="We couldn’t find that page. Choose where to go next."
    actions={<><LinkButton to="/" variant="primary">Back to home</LinkButton><LinkButton to="/products" variant="secondary">Explore products</LinkButton></>} />
}

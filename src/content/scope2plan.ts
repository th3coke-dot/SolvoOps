export const scope2planPage = {
  label: 'Scope2Plan',
  headline: 'From SOW to controlled delivery',
  lede: 'Scope2Plan is two connected modules: Generate turns Statements of Work into delivery-ready project packages, and Control keeps that structured project model aligned as scopes, decisions and obligations change.',
  modulesNote:
    'Generate is the live planning workspace. Control extends the same project model through delivery governance and change.',
  primaryCta: {
    label: 'Discuss a Scope2Plan pilot',
    href: '/pilot?product=scope2plan',
  },
  secondaryCta: {
    label: 'Open Scope2Plan Generate',
    href: 'https://www.scope2plan.com',
  },
  modules: [
    {
      id: 'generate',
      name: 'Scope2Plan Generate',
      status: 'pilot' as const,
      title: 'Create the delivery package from the SOW',
      summary:
        'Paste or upload a Statement of Work and produce a project plan, runbook/SOP and transition pack shaped for real delivery — grounded in ITIL 4 and PMP-aligned structure.',
    },
    {
      id: 'control',
      name: 'Scope2Plan Control',
      status: 'in-development' as const,
      title: 'Keep the project model alive as work changes',
      summary:
        'Control maintains versions, compares scope revisions, assesses change impact and regenerates affected plans, registers and obligations from the same structured model.',
    },
  ],
  generate: {
    title: 'Create the project package',
    body: 'Upload or paste the SOW, extract a structured project model in memory, review the interpretation, then generate the planning and governance artefacts you need for kick-off — typically a project plan, runbook/SOP and transition pack.',
    value:
      'Generate reduces repetitive project-initiation work while improving consistency, completeness and methodology alignment. Privacy by design: uploaded files and generated documents are processed in memory for the working session rather than kept as a persistent archive.',
    flow: [
      {
        title: 'Upload or paste the SOW',
        body: 'PDF, Word or plain text. Extracted for the working session.',
      },
      {
        title: 'Build the structured project model',
        body: 'Scope, deliverables, roles, milestones, risks and transition intent become usable operational data.',
      },
      {
        title: 'Generate delivery artefacts',
        body: 'Create the project plan, runbook/SOP and transition pack aligned to ITIL 4 and PMP structure.',
      },
      {
        title: 'Review and export',
        body: 'Preview on screen, then download PDF or DOCX for steering and delivery use.',
      },
    ],
    outputs: [
      'Project delivery plan (WBS, RACI, milestones, risks)',
      'Project management / governance pack',
      'RAID and action registers',
      'Communication and milestone plan',
      'Assumptions and dependencies',
      'Transition / handover plan',
      'Operational runbook / SOP',
      'Methodology-aligned project package',
    ],
  },
  control: {
    title: 'Keep the project aligned as it changes',
    body: 'Control is the governance layer for the same structured project model. As customer scopes, decisions and obligations evolve, Control helps teams compare versions, understand impact and keep plans, registers and evidence consistent.',
    note: 'Control is in active development. Capabilities below are labelled honestly and are not presented as fully available in production today.',
    flow: [
      {
        title: 'Establish the baseline',
        body: 'Lock the agreed Generate package as the starting point for delivery.',
      },
      {
        title: 'Capture scope revisions',
        body: 'Bring in new scope versions, decisions and change requests against the live model.',
      },
      {
        title: 'Assess impact',
        body: 'See what changed semantically and which plans, risks, responsibilities and obligations are affected.',
      },
      {
        title: 'Regenerate and govern',
        body: 'Update affected artefacts, keep evidence linked, and maintain a controlled delivery trail.',
      },
    ],
  },
  methodology: {
    title: 'Adapt the output to how your organisation delivers',
    body: 'Scope2Plan is designed to support recognised project-management approaches and organisation-specific delivery methods. Profiles are aligned to these approaches — not certified or endorsed by methodology owners.',
    profiles: [
      'Scope2Plan Standard',
      'PMP-aligned',
      'PRINCE2-aligned',
      'ITIL transition',
      'Agile delivery',
      'Organisation-defined methodologies',
    ],
  },
  finalCta: {
    title: 'Turn your next project scope into a structured delivery package.',
    href: '/pilot?product=scope2plan',
    label: 'Discuss a Scope2Plan pilot',
  },
} as const

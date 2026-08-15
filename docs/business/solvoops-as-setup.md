# SolvoOps AS — new business setup

Internal operating playbook for forming **SolvoOps AS** and cutting the brand over from **Pedersen IT Consulting**.

This is not legal, tax or accounting advice. Confirm current rules on official sources before you file.

**Linear project:** [SolvoOps AS](https://linear.app/solvoops/project/solvoops-as-2dbd1243b047)

## Current state (2026-08-15)

| Item | Value |
|------|--------|
| Brand | SolvoOps |
| Operator today | Pedersen IT Consulting |
| Organisation number | 924 547 405 |
| Form | Enkeltpersonforetak |
| Register | [Brønnøysund lookup](https://virksomhet.brreg.no/nb/oppslag/enheter/924547405) |
| Planned entity | SolvoOps AS — **not yet registered** |
| Site contact | hello@solvoops.com |
| Legal pages | Interim Privacy / Terms, pending counsel review |

The marketing site already treats the ENK as the operator (`src/content/company.ts`). Do not publish SolvoOps AS as registered until Foretaksregisteret has issued an organisation number.

## Why form an AS

The ENK can keep operating while the AS is formed. A dedicated AS is the usual next step when the brand has products, customer conversations and assets that should sit in a limited company rather than a sole proprietorship.

Typical reasons:

- Limited liability for the software business
- A clean invoicing and contracting entity for pilots
- A place to hold domains, IP and product environments
- A clearer split between personal consulting and the SolvoOps product company

## Official sources

- [Altinn — starte og registrere aksjeselskap](https://info.altinn.no/starte-og-drive/starte/registrering/starte-registrere-aksjeselskap-as/)
- [Brønnøysund — starte selskapet](https://www.brreg.no/aksjeselskap/slik-starter-du-aksjeselskap/starte-selskapet/)
- [Brønnøysund — aksjekapital](https://www.brreg.no/aksjeselskap/aksjekapital/)

Minimum share capital for an ordinary Norwegian AS is **NOK 30,000**, fully paid before registration. Formation costs may be covered from that capital. Cash contributions can be confirmed by a bank, auditor, lawyer or authorised accountant. Non-cash contributions need an auditor.

## Formation sequence

Work these in order. Matching Linear issues are in the SolvoOps AS project.

1. **Name** — Confirm SolvoOps AS is available in Enhetsregisteret and is not confusingly similar to an existing entity. `solvoops.com` is already in use. ([CUR-5](https://linear.app/solvoops/issue/CUR-5/confirm-solvoops-as-name-availability))
2. **Documents** — Draft stiftelsesdokument and vedtekter. Lock name, share capital, shares, board (at least one member), whether there is a daglig leder, business purpose, and auditor / fravalg of revision. Have counsel review before signing. ([CUR-6](https://linear.app/solvoops/issue/CUR-6/draft-stiftelsesdokument-and-vedtekter))
3. **Capital** — Open an aksjekapitalkonto, pay in at least NOK 30,000, and get a confirmation for the filing. ([CUR-7](https://linear.app/solvoops/issue/CUR-7/pay-in-share-capital-and-get-bank-confirmation))
4. **File** — Send Samordnet registermelding in Altinn with the three attachments: stiftelsesdokument, vedtekter, capital confirmation. ([CUR-8](https://linear.app/solvoops/issue/CUR-8/file-samordnet-registermelding-in-altinn))
5. **Operate** — After registration, open an operating account, keep ENK and AS money separate, and set up accounting / MVA / invoicing with an accountant. ([CUR-9](https://linear.app/solvoops/issue/CUR-9/set-up-as-accounting-mva-and-invoicing))
6. **Website** — Cut `src/content/company.ts` and legal pages over to the new org.nr. ([CUR-10](https://linear.app/solvoops/issue/CUR-10/cut-over-website-legal-entity-after-registration))
7. **Counsel** — Replace interim Privacy and Terms. ([CUR-11](https://linear.app/solvoops/issue/CUR-11/counsel-review-of-privacy-and-terms))
8. **Assets** — Move domains, hosting, email, contracts and IP that should sit in the AS. ([CUR-12](https://linear.app/solvoops/issue/CUR-12/transfer-domains-contracts-and-commercial-assets))

## Website cutover checklist

When the AS exists, update these in one change:

- [ ] `company.operator.legalName` → `SolvoOps AS`
- [ ] `company.operator.organizationNumber` and `organizationNumberLabel`
- [ ] `company.operator.form` / `formLabel` → aksjeselskap
- [ ] `company.operator.registryLookupUrl` → the new Brønnøysund record
- [ ] `company.plannedEntity.status` → `registered`
- [ ] Privacy and Terms operator sentences (they read from `company.operator`)
- [ ] Footer operator line
- [ ] JSON-LD `legalName` and identifier in `StructuredData`
- [ ] `/company` facts (they read from the same content model)
- [ ] Content test that currently pins Pedersen IT Consulting

Do not invent an organisation number. Use the number issued at registration.

## What stays public vs internal

The public `/company` page states the **current** operator only. It does not announce SolvoOps AS until the entity is registered.

This playbook, the Linear project and `plannedEntity` in the content model are the internal record of the intended cutover.

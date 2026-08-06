# PR 9 — Pilot form / request flow

## Delivered
- Structured `/pilot` form: name, work email, organisation, product, delivery context, challenge description
- Client-side validation with associated error messages and focus management
- Honeypot field (`website`) hidden from assistive tech; bot fills are silently discarded
- Mailto submission to `hello@solvoops.com` — **no new database**, no file uploads
- Confidentiality notice discouraging confidential customer data
- Analytics helper fires `pilot_form_submit` with product/context only (never message body)
- Mailto fallback always available

## Out of scope
- Server-side inbox automation / CRM write
- Rate limiting beyond honeypot (needs edge function later if abuse appears)
- Full privacy policy legal copy

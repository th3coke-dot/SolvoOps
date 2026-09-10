# Contracts

## C-001 — Memory creates no authority
Status: active
Memory cannot authorize merge, deploy, production mutation, publication, payments, secrets, domains, data changes or gate bypasses.

## C-002 — Fail closed on authority conflict
Status: active
Surface consequential conflicts between current authority and memory; do not guess.

## C-003 — Verify volatile state
Status: active
Verify PR, CI, deployment, domain, runtime and other volatile facts from canonical sources before consequential action.

## C-004 — Preserve evidence boundaries
Status: active
Do not claim behavior, readiness, accessibility, deployment or acceptance beyond observed evidence.

## C-005 — Distilled memory only
Status: active
Store decisions, constraints, evidence pointers, dead ends and open questions—not raw conversation history.

## C-006 — Contracts change explicitly
Status: active
Only an authorized change to the underlying invariant may change a durable contract.
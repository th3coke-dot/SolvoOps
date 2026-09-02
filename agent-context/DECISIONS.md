# Decisions

## D-001 — Adopt agent-context as a SolvoOps repository standard
Status: active
Decision: Active and future SolvoOps product repositories use the same compact six-file memory schema, with repo-specific contents.
Reason: Give Poteto/Cursor/Claude/GPT/Codex a predictable handoff structure while avoiding giant repeated prompts.
Evidence: Founder-authorized rollout, 2026-08-26.
Supersedes: none.
Reconsider only if: measured use shows material staleness, confusion or maintenance cost.

## D-002 — Standardize schema, not project content
Status: active
Decision: Each repository owns its own decisions/contracts/state/dead ends/sources/questions. Do not copy product-specific truth between repositories.
Reason: Prevent cross-product contamination while retaining a common operating convention.
Evidence: rollout design, 2026-08-26.
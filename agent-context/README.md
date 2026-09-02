# Agent Context Memory

SolvoOps standard durable memory for coding/review agents. It reduces repeated context and agent drift; it is not an authority system.

## Authority order
1. Explicit current founder instruction.
2. Current task/acceptance/gate contract.
3. `CONTRACTS.md`.
4. `DECISIONS.md`.
5. `STATE.md`.
6. Repository implementation/tests.
7. Historical material.

If higher-level sources conflict, stop and surface the conflict. Memory never grants merge, deploy, production, publication, payment, secret, domain or other consequential permissions.

## Files
`DECISIONS.md`, `CONTRACTS.md`, `DEAD-ENDS.md`, `STATE.md`, `SOURCES.md`, `OPEN-QUESTIONS.md`.

## Usage
At substantial task start read this file, Contracts and State, then retrieve only relevant deeper memory. Verify volatile facts live. At task end update only memory whose truth changed. Store conclusions and pointers, not transcripts. Mark superseded decisions rather than erasing them.

This schema is the standard to use in active and future SolvoOps product repositories.
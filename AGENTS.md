# AGENTS.md

## Scope
These instructions apply to the entire repository.

## Project status
This repository currently contains only the initial Arcflight Foundry module scaffold.

## Guardrails
- Keep scaffolding minimal until explicitly asked to add systems or gameplay logic.
- Prefer small, focused commits.
- Update `README.md` when structure changes.
- Change no more than 5 files per Codex task.
- Prefer minimal scaffolding over speculative architecture.

## Shared terminology
- flags store state
- tags describe state
- selectors target math
- modifiers change math
- predicates decide applicability
- slugs identify effect sources

## Terminology spec authority
- Follow `docs/flag-terminology.md` for all future Arcflight state and math naming.
- Flags store state.
- Selectors target math.
- Modifiers change math.
- Any future roll-affecting work must use consistent selector/slug/predicate language.

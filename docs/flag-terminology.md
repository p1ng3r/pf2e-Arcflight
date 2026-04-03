# Arcflight Terminology Specification (Flags, Tags, and Math Language)

This document is the canonical terminology guide for Arcflight state and math naming. Use these terms consistently across future upgrades, bonuses, and ship effects.

## Canonical Definitions

### Flag
A **flag** stores persistent state. Flags represent tracked conditions, configuration, or effect state that must be kept over time.

**Rule:** Use namespaced flag paths under `flags.arcflight.*`.

### Tag
A **tag** describes state. Tags classify or label entities/effects but do not carry numeric bonuses.

**Rule:** Tags are descriptors, not math payloads.

### Trait
A **trait** is player-facing rules language when needed. Traits are not synonyms for flags or tags.

**Rule:** Use traits for clear rules communication, not internal state storage.

### Selector
A **selector** is the official term for what a bonus or penalty targets.

**Rule:** Selectors target math and should be stable, explicit names.

### Modifier
A **modifier** is a structured math payload.

**Rule:** Modifiers change math and should not be represented as ad-hoc values in unrelated state fields.

### Predicate
A **predicate** decides whether a modifier applies.

**Rule:** Predicates define applicability conditions for modifiers.

### Slug
A **slug** uniquely identifies an effect source.

**Rule:** Slugs identify effect sources consistently across systems.

### Source
A **source** is the origin of an effect (feature, condition, upgrade, crew action, etc.), typically identified by a slug.

**Rule:** Every roll-affecting source should have a stable slug.

## Project Rules (Normative)

- Flags store persistent state.
- Tags describe state but do not carry numeric bonuses.
- Selectors are the official term for what a bonus or penalty targets.
- Modifiers are structured math payloads.
- Predicates decide whether a modifier applies.
- Slugs uniquely identify effect sources.
- Traits are player-facing rules language when needed, not a synonym for flags or tags.

## Naming Conventions

- Use lowercase kebab-case for selectors and slugs.
- Use namespaced flag paths under `flags.arcflight.*`.
- Prefer explicit, domain-readable names over abbreviations.

## Good Naming Examples

- `flags.arcflight.ship`
- `flags.arcflight.conditions`
- `flags.arcflight.crew.captain`
- `flags.arcflight.upgrades.engine-overclock`
- `engine.overclocked`
- `weapon.broadside`
- `arcflight-weapon-attack`
- `captain-fire-solution`

## Anti-Patterns

- **Tags containing numbers** (for example, `engine.overclocked:+2`).
- **Unstructured bonus values buried in flags** (for example, storing loose numeric bonus fields in `flags.arcflight.*` instead of using modifiers).
- **Mixing trait/tag/flag language interchangeably** in docs, data, or implementation notes.

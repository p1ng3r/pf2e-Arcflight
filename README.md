# Arcflight Foundry Module

Initial scaffold for the Arcflight Foundry VTT module.

## Structure

- `module.json` — Foundry module manifest.
- `scripts/main.js` — module entry script and Arcflight API exposure.
- `scripts/config/constants.js` — Arcflight constants and flag keys.
- `scripts/state/ship-state.js` — ship actor marker/state helpers.
- `AGENTS.md` — repository agent instructions.

## Terminology guide

For Arcflight rules/state language, use `docs/flag-terminology.md` as the canonical terminology specification for flags, tags, traits, selectors, modifiers, predicates, slugs, and sources.

## Console examples

```js
const actor = game.actors.getName("Courier Sloop Test Ship");
await game.arcflight.initializeShipActor(actor);
game.arcflight.isShipActor(actor);
game.arcflight.getShipState(actor);
```

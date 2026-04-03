# Arcflight Foundry Module

Initial scaffold for the Arcflight Foundry VTT module.

## Structure

- `module.json` — Foundry module manifest.
- `scripts/main.js` — module entry script.
- `scripts/config/constants.js` — module constants.
- `scripts/state/ship-state.js` — ship state and ship actor integration helpers.
- `AGENTS.md` — repository agent instructions.

## Ship state shell

Arcflight currently stores persistent ship state on Actor flags at `flags.arcflight.ship`.

The current build provides a ship-state shell and API helpers on `game.arcflight`.

Example Foundry console usage:

```js
const actor = game.actors.getName("Courier Sloop Test Ship");
await game.arcflight.initializeShipActor(actor);
game.arcflight.isShipActor(actor);
game.arcflight.getShipState(actor);
```

## Terminology guide

For Arcflight rules/state language, use `docs/flag-terminology.md` as the canonical terminology specification for flags, tags, traits, selectors, modifiers, predicates, slugs, and sources.

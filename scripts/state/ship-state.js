import { ARCFLIGHT_FLAG_SCOPE, ARCFLIGHT_SHIP_FLAG_KEY } from "../config/constants.js";

export function createDefaultShipState() {
  return {
    schemaVersion: 1,
    identity: {
      name: "",
      hullId: "",
      level: 1
    },
    hull: {
      maxHp: 0,
      currentHp: 0,
      brokenThreshold: 0
    },
    resources: {
      ap: 0,
      fuel: 0,
      strain: 0,
      supplies: 0
    },
    crew: {
      stations: {}
    },
    voyage: {
      daysTraveled: 0,
      currentRoute: null
    },
    combat: {
      round: 0,
      active: false
    },
    tags: []
  };
}

export function getShipState(actor) {
  if (!actor) return null;

  return actor.getFlag(ARCFLIGHT_FLAG_SCOPE, ARCFLIGHT_SHIP_FLAG_KEY) ?? null;
}

export async function ensureShipState(actor) {
  if (!actor) return null;

  const existingState = getShipState(actor);
  if (existingState) return existingState;

  const defaultState = createDefaultShipState();
  await actor.setFlag(ARCFLIGHT_FLAG_SCOPE, ARCFLIGHT_SHIP_FLAG_KEY, defaultState);
  return getShipState(actor);
}

export async function setShipState(actor, state) {
  if (!actor) return null;

  await actor.setFlag(ARCFLIGHT_FLAG_SCOPE, ARCFLIGHT_SHIP_FLAG_KEY, state);
  return getShipState(actor);
}

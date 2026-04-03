import {
  ARCFLIGHT_FLAG_SCOPE,
  ARCFLIGHT_SHIP_FLAG_KEY,
  ARCFLIGHT_SHIP_MARKER_FLAG_KEY
} from "../config/constants.js";

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

function applyTopLevelBuckets(baseState, patch) {
  if (!patch || typeof patch !== "object") return baseState;

  const isPlainObject = (value) =>
    value !== null && typeof value === "object" && !Array.isArray(value);

  const nextState = { ...baseState };
  for (const [key, value] of Object.entries(patch)) {
    if (!Object.hasOwn(baseState, key)) continue;

    const baseBucket = baseState[key];
    if (isPlainObject(baseBucket) && isPlainObject(value)) {
      // Preserve default keys while allowing one-level bucket overrides.
      nextState[key] = { ...baseBucket, ...value };
      continue;
    }

    nextState[key] = value;
  }

  return nextState;
}

export function getShipState(actor) {
  if (!actor) return null;

  return actor.getFlag(ARCFLIGHT_FLAG_SCOPE, ARCFLIGHT_SHIP_FLAG_KEY) ?? null;
}

export async function ensureShipState(actor) {
  if (!actor) return null;

  const defaultState = createDefaultShipState();
  const existingState = getShipState(actor);
  if (existingState) {
    const normalizedState = applyTopLevelBuckets(defaultState, existingState);
    await actor.setFlag(ARCFLIGHT_FLAG_SCOPE, ARCFLIGHT_SHIP_FLAG_KEY, normalizedState);
    return getShipState(actor);
  }

  await actor.setFlag(ARCFLIGHT_FLAG_SCOPE, ARCFLIGHT_SHIP_FLAG_KEY, defaultState);
  return getShipState(actor);
}

export async function setShipState(actor, state) {
  if (!actor) return null;

  await actor.setFlag(ARCFLIGHT_FLAG_SCOPE, ARCFLIGHT_SHIP_FLAG_KEY, state);
  return getShipState(actor);
}

export function isShipActor(actor) {
  if (!actor) return false;

  return actor.getFlag(ARCFLIGHT_FLAG_SCOPE, ARCFLIGHT_SHIP_MARKER_FLAG_KEY) === true;
}

export async function initializeShipActor(actor, overrides = {}) {
  if (!actor) return null;

  await actor.setFlag(ARCFLIGHT_FLAG_SCOPE, ARCFLIGHT_SHIP_MARKER_FLAG_KEY, true);

  const ensuredState = await ensureShipState(actor);
  const nextState = applyTopLevelBuckets(ensuredState ?? createDefaultShipState(), overrides);

  if (!nextState.identity?.name) {
    nextState.identity = {
      ...(nextState.identity ?? {}),
      name: actor.name ?? ""
    };
  }

  await setShipState(actor, nextState);
  return getShipState(actor);
}

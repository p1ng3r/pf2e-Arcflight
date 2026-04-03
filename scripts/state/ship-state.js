import { ARCFLIGHT_SHIP_MARKER_FLAG_KEY, MODULE_ID } from "../config/constants.js";

const DEFAULT_SHIP_STATE = {
  identity: {
    name: ""
  }
};

export function getShipState(actor) {
  if (!actor) return null;
  return actor.getFlag(MODULE_ID, "ship") ?? null;
}

export function isShipActor(actor) {
  if (!actor) return false;
  return actor.getFlag(MODULE_ID, ARCFLIGHT_SHIP_MARKER_FLAG_KEY) === true;
}

export async function initializeShipActor(actor, overrides = {}) {
  if (!actor) return null;

  const existingState = getShipState(actor) ?? {};
  const shipState = {
    ...DEFAULT_SHIP_STATE,
    identity: {
      ...DEFAULT_SHIP_STATE.identity,
      ...(existingState.identity ?? {})
    }
  };

  if (!shipState.identity.name?.trim()) {
    shipState.identity.name = actor.name ?? "";
  }

  for (const [bucket, value] of Object.entries(overrides)) {
    if (!(bucket in shipState)) continue;

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      shipState[bucket] &&
      typeof shipState[bucket] === "object" &&
      !Array.isArray(shipState[bucket])
    ) {
      shipState[bucket] = {
        ...shipState[bucket],
        ...value
      };
      continue;
    }

    shipState[bucket] = value;
  }

  await actor.update({
    [`flags.${MODULE_ID}.${ARCFLIGHT_SHIP_MARKER_FLAG_KEY}`]: true,
    [`flags.${MODULE_ID}.ship`]: shipState
  });

  return getShipState(actor);
}

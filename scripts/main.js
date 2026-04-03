import { ARCFLIGHT_MODULE_ID } from "./config/constants.js";
import {
  createDefaultShipState,
  getShipState,
  ensureShipState,
  setShipState,
  isShipActor,
  initializeShipActor
} from "./state/ship-state.js";

Hooks.once("init", () => {
  console.log("[Arcflight] init");
});

Hooks.once("setup", () => {
  game.arcflight = {
    moduleId: ARCFLIGHT_MODULE_ID,
    getVersion: () => game.modules.get(ARCFLIGHT_MODULE_ID)?.version ?? "unknown",
    isActive: () => game.modules.get(ARCFLIGHT_MODULE_ID)?.active ?? false,
    debugSummary: () => ({
      moduleId: ARCFLIGHT_MODULE_ID,
      version: game.modules.get(ARCFLIGHT_MODULE_ID)?.version ?? "unknown",
      active: game.modules.get(ARCFLIGHT_MODULE_ID)?.active ?? false,
      systemId: game.system?.id ?? "unknown"
    }),
    createDefaultShipState,
    getShipState,
    ensureShipState,
    setShipState,
    isShipActor,
    initializeShipActor
  };
});

Hooks.once("ready", () => {
  console.log("[Arcflight] ready", game.arcflight?.debugSummary?.());
});

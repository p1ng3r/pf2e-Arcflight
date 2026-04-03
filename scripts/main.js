import { MODULE_ID } from "./config/constants.js";
import { getShipState, initializeShipActor, isShipActor } from "./state/ship-state.js";

Hooks.once("init", () => {
  console.log("[Arcflight] Module initialized");
});

Hooks.once("setup", () => {
  game.arcflight = {
    moduleId: MODULE_ID,
    getVersion: () => game.modules.get(MODULE_ID)?.version ?? "unknown",
    isActive: () => game.modules.get(MODULE_ID)?.active ?? false,
    isShipActor,
    initializeShipActor,
    getShipState,
    debugSummary: () => ({
      moduleId: MODULE_ID,
      version: game.modules.get(MODULE_ID)?.version ?? "unknown",
      active: game.modules.get(MODULE_ID)?.active ?? false
    })
  };
});

Hooks.once("ready", () => {
  console.log("[Arcflight]", game.arcflight?.debugSummary?.());
});

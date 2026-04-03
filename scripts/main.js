const MODULE_ID = "arcflight";

Hooks.once("init", () => {
  console.log("[Arcflight] Module initialized");
});

Hooks.once("setup", () => {
  game.arcflight = {
    moduleId: MODULE_ID,
    getVersion: () => game.modules.get(MODULE_ID)?.version ?? "unknown",
    isActive: () => game.modules.get(MODULE_ID)?.active ?? false,
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

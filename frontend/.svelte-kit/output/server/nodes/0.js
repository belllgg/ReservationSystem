

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CpxPOeYV.js","_app/immutable/chunks/disclose-version.BXLFK3yU.js","_app/immutable/chunks/runtime.BdkIV7pQ.js"];
export const stylesheets = [];
export const fonts = [];

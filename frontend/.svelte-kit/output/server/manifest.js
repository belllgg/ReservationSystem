export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.TCwr8LgO.js","app":"_app/immutable/entry/app.D3Cy93C4.js","imports":["_app/immutable/entry/start.TCwr8LgO.js","_app/immutable/chunks/entry.C6u40Nfa.js","_app/immutable/chunks/runtime.BdkIV7pQ.js","_app/immutable/chunks/index.BaJxa5tY.js","_app/immutable/entry/app.D3Cy93C4.js","_app/immutable/chunks/runtime.BdkIV7pQ.js","_app/immutable/chunks/store.pdG8NUdX.js","_app/immutable/chunks/disclose-version.BXLFK3yU.js","_app/immutable/chunks/index-client.Dqr8zXv0.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

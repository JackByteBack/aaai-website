import { defineConfig } from 'astro/config';

const STATIC_ASSET_CACHE = 'public, max-age=31536000, immutable';
const ASSET_PATH_RE = /^\/(105\/media|images|font|fonts|css|js|svg)\//;

/** @returns {import('vite').Plugin} */
function staticAssetCacheHeaders() {
	/** @param {import('connect').Server} middlewares */
	const applyMiddleware = (middlewares) => {
		middlewares.use((req, res, next) => {
			if (req.method === 'GET' && ASSET_PATH_RE.test(req.url || '')) {
				res.setHeader('Cache-Control', STATIC_ASSET_CACHE);
			}
			next();
		});
		// Vite installs its static middleware after plugin middlewares and its
		// bundled sirv stamps Cache-Control: no-cache on public files, which
		// makes the browser revalidate large videos on every load (the 304
		// request flood in devtools). Move this middleware to the front of the
		// stack: sirv prefers headers already set on the response, so static
		// assets are served as cacheable while HTML stays un-cacheable.
		const handle = middlewares.stack.pop();
		if (handle) middlewares.stack.unshift(handle);
	};

	return {
		name: 'static-asset-cache-headers',
		configureServer(server) {
			applyMiddleware(server.middlewares);
		},
		configurePreviewServer(server) {
			applyMiddleware(server.middlewares);
		},
	};
}

export default defineConfig({
	vite: {
		plugins: [staticAssetCacheHeaders()],
	},
});

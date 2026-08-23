// The simulator's source declaration is not loaded when Next.js type-checks
// the package's source maps during production builds.
declare global {
	interface Window {
		prismic?: {
			sliceSimulator?: {
				api?: unknown[]
				client?: unknown[]
			}
		}
	}
}

export {}

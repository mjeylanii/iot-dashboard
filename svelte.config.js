import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({ 'index.html': '200.html' }),
		alias: {
			$components: './src/lib/components/index.ts',
			$helpers: './src/lib/helpers/index.ts',
			$constants: './src/lib/constants/index.ts',
			$stores: './src/lib/stores/index.ts',
			$api: './src/lib/api/index.ts',
			$services: './src/lib/services/index.ts',
			$types: './src/lib/types/index.ts',
		},
	},
};

export default config;

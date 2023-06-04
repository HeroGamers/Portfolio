import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// Default options from https://kit.svelte.dev/docs/adapter-cloudflare#usage
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		})
	},

	preprocess: [
		preprocess({
			scss: {
				// prependData: `@use 'src/variables.scss' as *;`
				prependData: `@import 'src/variables.scss';`
			},

			postcss: true
		})
	]
};

export default config;

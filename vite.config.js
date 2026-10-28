import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-cloudflare';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';
import { parse } from 'yaml';

export default defineConfig({
	plugins: [
		// Import .yaml files as plain data, parsed at build time
		{
			name: 'yaml',
			transform: {
				filter: { id: /\.ya?ml$/ },
				handler(code) {
					return { code: `export default ${JSON.stringify(parse(code))};`, map: null };
				}
			}
		},
		sveltekit({
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter({
				// Default options from https://svelte.dev/docs/kit/adapter-cloudflare#Usage
				routes: {
					include: ['/*'],
					exclude: ['<all>']
				}
			}),
			preprocess: vitePreprocess()
		}),
		// Iconify icons as inline SVG components, e.g. `import Icon from '~icons/lucide/chevron-down'`
		Icons({ compiler: 'svelte', scale: 1 })
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	// https://vite.dev/config/shared-options#css-preprocessoroptions
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "variables.scss" as *;',
				loadPaths: ['src']
			}
		}
	},
	// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});

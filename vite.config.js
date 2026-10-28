import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-cloudflare';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
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
		})
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

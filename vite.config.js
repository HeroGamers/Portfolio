import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	// https://vite.dev/config/shared-options#css-preprocessoroptions
	css: {
		preprocessorOptions: {
			scss: {
				// Handled by svelte.config.js
				// additionalData: '@use "src/variables.scss" as *;',
				// https://sass-lang.com/documentation/breaking-changes/legacy-js-api/
				// api: 'modern-compiler' // or "modern"
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

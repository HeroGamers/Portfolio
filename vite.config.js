import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	// https://sass-lang.com/documentation/breaking-changes/legacy-js-api/
	// https://vite.dev/config/shared-options#css-preprocessoroptions
	css: {
		preprocessorOptions: {
		  scss: {
			api: 'modern-compiler' // or "modern"
		  }
		}
	}
});

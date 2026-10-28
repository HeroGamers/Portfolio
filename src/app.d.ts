/// <reference types="unplugin-icons/types/svelte" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			title?: string;
			description?: string;
		}
		// interface Platform {}
	}
}

declare module '*.postcss';
declare module '*.scss';
declare module '@fontsource/*';
declare module '@fontsource-variable/*';

export {};

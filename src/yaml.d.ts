// Parsed at build time by the yaml plugin in vite.config.js
declare module '*.yaml' {
	const data: Record<string, any>;
	export default data;
}

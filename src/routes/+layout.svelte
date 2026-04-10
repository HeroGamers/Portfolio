<script>
	import { page } from '$app/state';

	import '../app.postcss';
	import '../app.scss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import '@fontsource/roboto';
	import '@fontsource-variable/open-sans';

	/**
	 * @type {import('./$types').LayoutProps}
	 */
	let { children } = $props();
</script>

<svelte:head>
	<!-- Default title (can be overridden in pages) -->
	<title>Hero - Portfolio</title>
	<!-- Basic Metadata (shared across pages) -->
	<meta name="description" content="My journey through cyberspace :)" />
	<meta name="keywords" content="HeroGamers, Marcus Sand, Portfolio, Website, Personal Website" />
	<meta name="author" content="Marcus Sand" />
	<meta name="application-name" content="Hero" />
	<meta name="msapplication-TileColor" content="#6F3C97" />

	<!-- Facebook Metadata (base/defaults) -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:title" content="Hero - Portfolio" />
	<meta property="og:description" content="My journey through cyberspace :)" />
	<!-- Twitter Metadata (base/defaults) -->
	<meta property="twitter:url" content={page.url.href} />
	<meta property="twitter:title" content="Hero - Portfolio" />
	<meta property="twitter:description" content="My journey through cyberspace :)" />
</svelte:head>

<div class="flex min-h-screen flex-col transition-colors md:flex-row">
	<Header />

	<div class="relative flex flex-1 flex-col">
		<main class="box-border flex h-full w-full flex-1 flex-col p-4">
			<!-- <slot /> -->
			{@render children()}
		</main>

		<Footer />
	</div>
</div>

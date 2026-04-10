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

	<!-- Favicons -->
	<link rel="apple-touch-icon-precomposed" sizes="57x57" href="apple-touch-icon-57x57.png" />
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-touch-icon-114x114.png" />
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="apple-touch-icon-72x72.png" />
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="apple-touch-icon-144x144.png" />
	<link rel="apple-touch-icon-precomposed" sizes="60x60" href="apple-touch-icon-60x60.png" />
	<link rel="apple-touch-icon-precomposed" sizes="120x120" href="apple-touch-icon-120x120.png" />
	<link rel="apple-touch-icon-precomposed" sizes="76x76" href="apple-touch-icon-76x76.png" />
	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="apple-touch-icon-152x152.png" />
	<link rel="icon" type="image/png" href="favicon-196x196.png" sizes="196x196" />
	<link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
	<link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
	<link rel="icon" type="image/png" href="favicon-128.png" sizes="128x128" />
	<meta name="msapplication-TileImage" content="mstile-144x144.png" />
	<meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
	<meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
	<meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
	<meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
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

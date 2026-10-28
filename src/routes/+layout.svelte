<script>
	import { page } from '$app/state';

	import '../app.postcss';
	import '../app.scss';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';

	import '@fontsource/roboto';
	import '@fontsource-variable/open-sans';

	/**
	 * @type {import('./$types').LayoutProps}
	 */
	let { children } = $props();

	// Pages can set `title` and `description` from their load function
	const page_title = $derived(
		page.data.title ? `Hero - ${page.data.title}` : 'Hero - Cybersecurity Enthusiast'
	);
	const description = $derived(
		page.data.description ??
			'Welcome to the place where I ramble about the world of cybersecurity and software development!'
	);
</script>

<svelte:head>
	<title>{page_title}</title>
	<!-- Basic Metadata (shared across pages) -->
	<meta name="description" content={description} />
	<meta name="keywords" content="HeroGamers, Marcus Sand, Portfolio, Website, Personal Website" />
	<meta name="author" content="Marcus Sand" />
	<meta name="application-name" content="Hero" />
	<meta name="msapplication-TileColor" content="#6F3C97" />

	<!-- Facebook Metadata -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:title" content={page_title} />
	<meta property="og:description" content={description} />
	<!-- Twitter Metadata -->
	<meta property="twitter:url" content={page.url.href} />
	<meta property="twitter:title" content={page_title} />
	<meta property="twitter:description" content={description} />
</svelte:head>

<div class="flex min-h-screen flex-col transition-colors md:flex-row-reverse">
	<Header />

	<div class="relative flex flex-1 flex-col">
		<main
			class="box-border flex h-full w-full flex-1 flex-col px-4 pt-4 pb-6 sm:px-6 md:px-10 md:pt-6 md:pb-10"
		>
			<!-- <slot /> -->
			{@render children()}
		</main>

		<Footer />
	</div>
</div>

<script>
	import '../app.postcss';
	import '../app.scss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import '@fontsource/roboto';
	import '@fontsource-variable/open-sans';
</script>

<div class="flex min-h-screen flex-col md:flex-row">
	<Header />

	<div class="relative md:flex md:flex-1 md:flex-col">
		<main class="box-border flex h-full w-full flex-1 flex-col p-4">
			<slot />
		</main>

		<Footer />
	</div>
</div>

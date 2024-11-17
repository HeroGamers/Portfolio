<script>
	import '../app.postcss';
	import '../app.scss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import "@fontsource/roboto";
	import "@fontsource-variable/open-sans";
</script>

<div class="flex flex-col md:flex-row min-h-screen">
	<Header />

	<div class="md:flex md:flex-col md:flex-1 relative">
		<main class="flex flex-col flex-1 p-4 w-full h-full box-border">
			<slot />
		</main>

		<Footer />
	</div>
</div>

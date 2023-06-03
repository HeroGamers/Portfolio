<script>
	import '../app.postcss';
	import '../app.scss';
	import Header from './Header.svelte';
	// import "@fontsource/roboto";
	// import "@fontsource-variable/open-sans";
</script>

<div class="flex flex-col md:flex-row min-h-screen">
	<Header />

	<div class="md:flex md:flex-col md:flex-1">
		<main class="flex flex-col flex-1 p-4 w-full max-w-5xl h-full m-auto box-border">
			<slot />
		</main>

		<footer class="flex flex-col justify-center items-center p-3 md:py-3 md:px-0 fixed bottom-0 left-0 w-full text-center">
			<p>Marcus Sand © 2023 - CVR 43411764 - Hanstholmvej 55, 2. th, 2720 Vanløse, Denmark</p>
		</footer>
	</div>
</div>

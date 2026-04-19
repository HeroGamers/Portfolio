<script>
	import Title from '$lib/components/Title.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Education from '$lib/components/Education.svelte';
	import Certificates from '$lib/components/Certificates.svelte';
	import Portfolio from '$lib/components/Portfolio.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Webring from '$lib/components/Webring.svelte';
</script>

<div
	class="justify-top content-container flex w-full flex-col items-start overflow-x-hidden md:mt-4"
>
	<Title />
	<About />
	<div class="flex w-full flex-col gap-7 xl:flex-row xl:items-start xl:justify-between xl:gap-8">
		<Experience />
		<Education />
	</div>
	<Certificates />
	<Portfolio />
	<Contact />
	<Webring />
</div>

<style lang="scss">
	.content-container {
		margin: 0 auto;
		max-width: 72rem;
		padding-bottom: 6rem;
	}
</style>

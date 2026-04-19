<script>
	import Title from '$lib/components/Title.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Education from '$lib/components/Education.svelte';
	import Portfolio from '$lib/components/Portfolio.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<div
	class="justify-top content-container flex flex-col items-start overflow-x-hidden md:mt-8 md:ml-5"
>
	<Title />
	<About />
	<div class="flex flex-col xl:w-full xl:flex-row xl:justify-evenly xl:space-x-10">
		<Experience />
		<Education />
	</div>
	<Portfolio />
	<Contact />
</div>
<div class="mb-20 flex flex-1 flex-col items-center justify-center">
	<h5>Thanks for visiting!</h5>
</div>

<style lang="scss">
	.content-container {
		margin-bottom: 100vh;
	}
</style>

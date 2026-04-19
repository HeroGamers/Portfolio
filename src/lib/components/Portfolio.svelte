<script>
	import PortfolioCard from '$lib/components/PortfolioCard.svelte';

	/** @type {Array.<{date: Date, project_name: String, programming_language: String, link: String, description: String}>} */
	let portfolioEntries = [
		{
			date: new Date('2023-06-03'),
			project_name: 'Portfolio Website',
			programming_language: 'Svelte',
			link: 'https://github.com/HeroGamers/Portfolio',
			description:
				'This website, which is written in Svelte and replaces my old static portfolio website. Imagine ' +
				'having developed full-stack web applications and still having a static portfolio website. Not me, anymore!'
		},
		{
			date: new Date('2020-08-31'),
			project_name: 'HeroAI',
			programming_language: 'Python',
			link: 'https://github.com/HeroGamers/HeroAI',
			description:
				'An AI written using TensorFlow Keras performing text classification using sentiment analysis on ' +
				'text messages, to determine whether messages were toxic.'
		},
		{
			date: new Date('2019-08-10'),
			project_name: 'MyDog',
			programming_language: 'Java',
			link: 'https://github.com/HeroGamers/MyDog',
			description: 'A Minecraft plugin bringing much more functionality to tamed pets.'
		}
	];
</script>

<section id="portfolio" class="flex w-full flex-col items-start">
	<h5 class="font-medium">Portfolio</h5>
	<div class="portfolio-cards flex w-full flex-col justify-center pr-1 sm:pr-2">
		{#each portfolioEntries as portfolioEntry (portfolioEntry.project_name)}
			<PortfolioCard {...portfolioEntry} />
		{/each}
	</div>
</section>

<style lang="scss">
	.portfolio-cards {
		flex-flow: row wrap;
	}
</style>

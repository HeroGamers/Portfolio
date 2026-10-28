<script>
	import PortfolioCard from '#lib/components/PortfolioCard.svelte';
	import { fly } from 'svelte/transition';
	import { projects as portfolioEntries } from '#lib/resume.js';
</script>

<section id="portfolio" class="flex w-full flex-col items-start" in:fly={{ y: 12, duration: 700 }}>
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

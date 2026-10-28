<script>
	import PortfolioCard from '#lib/components/PortfolioCard.svelte';
	import { fly } from 'svelte/transition';
	import { projects as portfolioEntries } from '#lib/resume.js';
</script>

<section id="portfolio" class="flex w-full flex-col items-start" in:fly={{ y: 12, duration: 700 }}>
	<h5 class="font-medium">Portfolio</h5>
	<div class="grid w-full gap-x-2 px-1 sm:px-2 md:grid-cols-2">
		{#each portfolioEntries as portfolioEntry (portfolioEntry.project_name)}
			<PortfolioCard {...portfolioEntry} />
		{/each}
	</div>
</section>

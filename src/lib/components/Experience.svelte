<script>
	import ExperienceCard from '#lib/components/ExperienceCard.svelte';
	import { fly } from 'svelte/transition';
	import { experiences } from '#lib/resume.js';
</script>

<section
	id="experience"
	class="flex w-full flex-col items-start xl:max-w-[48%]"
	in:fly={{ y: 12, duration: 700 }}
>
	<h5 class="font-medium">Experience</h5>
	<div class="flex w-full flex-col space-y-3 px-1 sm:px-4">
		{#each experiences as experience (experience.company)}
			<ExperienceCard {...experience} />
		{/each}
	</div>
</section>

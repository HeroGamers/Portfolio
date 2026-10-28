<script>
	import EducationCard from '#lib/components/EducationCard.svelte';
	import { fly } from 'svelte/transition';
	import { educations } from '#lib/resume.js';
</script>

<section
	id="education"
	class="flex w-full max-w-3xl flex-col items-start xl:max-w-[48%]"
	in:fly={{ y: 12, duration: 700 }}
>
	<h5 class="font-medium">Education</h5>
	<div class="flex w-full flex-col space-y-3 px-1 sm:px-4">
		{#each educations as education (education.school)}
			<EducationCard {...education} />
		{/each}
	</div>
</section>

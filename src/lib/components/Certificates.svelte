<script>
	import CertificateCard from '#lib/components/CertificateCard.svelte';
	import { fly } from 'svelte/transition';
	import { certificates } from '#lib/resume.js';
</script>

<section
	id="certificates"
	class="flex w-full flex-col items-start"
	in:fly={{ y: 12, duration: 700 }}
>
	<h5 class="font-medium">Certificates</h5>
	<div class="flex w-full flex-col space-y-3 px-1 sm:px-4">
		{#each certificates as certificate (certificate.name)}
			<CertificateCard {...certificate} />
		{/each}
	</div>
</section>

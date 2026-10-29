<script>
	import CertificateCard from '#lib/components/CertificateCard.svelte';
	import { certificates } from '#lib/resume.js';
</script>

<section id="certificates" class="flex w-full flex-col items-start">
	<h5 class="font-medium">Certificates</h5>
	<div class="grid w-full items-start gap-3 px-1 sm:px-4 md:grid-cols-2 xl:grid-cols-1">
		{#each certificates as certificate (certificate.name)}
			<CertificateCard {...certificate} />
		{/each}
	</div>
</section>

<script>
	import CertificateCard from '$lib/components/CertificateCard.svelte';
	import { fly } from 'svelte/transition';

	/** @type {Array<{name: string, issuer: string, issue_date: Date | null, expiry_date: Date | null, credential_id: string | null, link: string | null, description: string | null}>} */
	let certificates = [
		{
			name: 'OffSec Defense Analyst (OSDA)',
			issuer: 'OffSec',
			issue_date: new Date('2024-12-19'),
			expiry_date: null,
			credential_id: null,
			link: 'https://credentials.offsec.com/ecd21884-5cee-4907-9241-d83389bcfcfa',
			description:
				'OffSec Defense Analysts (OSDAs) have the skills and expertise needed to detect, uncover, and understand cyber attacks against an organization. They can analyze security logs across operating systems and applications, chain findings to map full attack paths, and build detection rules and analysis scripts.'
		},
		{
			name: 'Certified in Cybersecurity (CC)',
			issuer: 'ISC2',
			issue_date: new Date('2024-09-04'),
			expiry_date: new Date('2027-09-30'),
			credential_id: null,
			link: 'https://www.credly.com/badges/36f66c55-984e-4c06-a1e5-57749f5d0fea',
			description:
				'Vendor-neutral foundational certification covering core security principles, business continuity and incident response concepts, access controls, network security, and security operations.'
		}
	];
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

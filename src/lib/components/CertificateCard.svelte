<script>
	import ExpandableCard from '#lib/components/ExpandableCard.svelte';
	import { formatDate } from '#lib/utils.js';

	/** @type {string} */
	export let name = 'Certification Name';
	/** @type {string} */
	export let issuer = 'Issuing Organization';
	/** @type {Date | null} */
	export let issue_date = null;
	/** @type {Date | null} */
	export let expiry_date = null;
	/** @type {string | null} */
	export let credential_id = null;
	/** @type {string | null} */
	export let link = null;
	/** @type {string | null} */
	export let description = null;

	const getDateText = () => {
		const parts = [];
		const now = new Date();

		if (issue_date != null) {
			parts.push('Issued ' + formatDate(issue_date));
		}

		if (expiry_date != null) {
			parts.push(
				(expiry_date.getTime() < now.getTime() ? 'Expired ' : 'Expires ') + formatDate(expiry_date)
			);
		} else {
			parts.push('No expiration');
		}

		return parts.join(' · ');
	};
</script>

<ExpandableCard dateText={getDateText()} {description}>
	<div slot="summary" class="flex flex-col gap-1">
		<p class="font-semibold">{name}</p>
		<p class="flex flex-wrap items-baseline gap-x-4 text-sm text-zinc-400">
			<span class="text-zinc-300">{issuer}</span>
			{#if credential_id != null}
				<span>ID {credential_id}</span>
			{/if}
			{#if link != null}
				<a
					href={link}
					target="_blank"
					rel="noreferrer"
					on:click|stopPropagation
					on:keydown|stopPropagation
				>
					View credential
				</a>
			{/if}
		</p>
	</div>
</ExpandableCard>

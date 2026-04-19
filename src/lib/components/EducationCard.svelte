<script>
	import ExpandableCard from '$lib/components/ExpandableCard.svelte';

	/** @type Date */
	export let start_date = new Date();
	/** @type Date | null */
	export let end_date = null;
	/** @type String */
	export let school = 'School';
	/** @type String */
	export let degree = 'Degree';
	/** @type String | null */
	export let description = null;

	import { durationInHalfYears, formatDate } from '$lib/utils.js';

	const getDateText = () => {
		const startText = start_date != null ? formatDate(start_date) : 'Unknown';
		const endText = end_date != null ? formatDate(end_date) : 'Present';
		const durationText =
			start_date != null && end_date != null
				? ' (' + durationInHalfYears(start_date, end_date) + ' years)'
				: '';

		return startText + ' to ' + endText + durationText;
	};
</script>

<ExpandableCard dateText={getDateText()} {description}>
	<div slot="summary">
		<p class="font-semibold">{school}</p>
		<p class="font-light text-zinc-300">{degree}</p>
	</div>
</ExpandableCard>

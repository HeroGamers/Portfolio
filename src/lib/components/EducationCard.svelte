<script>
	import ExpandableCard from '#lib/components/ExpandableCard.svelte';

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

	import { formatDateRange } from '#lib/utils.js';
</script>

<ExpandableCard dateText={formatDateRange(start_date, end_date)} {description}>
	<div slot="summary">
		<p class="font-semibold">{school}</p>
		<p class="font-light text-zinc-300">{degree}</p>
	</div>
</ExpandableCard>

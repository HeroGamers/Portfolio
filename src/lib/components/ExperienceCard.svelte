<script>
	import ExpandableCard from '$lib/components/ExpandableCard.svelte';

	/** @type String */
	export let company = 'Company Name';
	/** @type String | null */
	export let description = null;
	/** @type Array<{start_date: Date, end_date: Date | null, title: String, employment_type: String}> */
	export let functions = [
		{
			start_date: new Date(),
			end_date: null,
			title: 'Software Engineer',
			employment_type: 'Full-time'
		}
	];

	// Get the "newest" end date and the oldest start date for the entire company,
	// and check if employment types are equal
	/** @type Date | undefined | null */
	let oldest_start_date = undefined;
	/** @type Date | undefined | null */
	let newest_end_date = undefined;
	/** @type String | undefined | null */
	let employmentType = undefined;

	functions.forEach((func_at_company) => {
		if (employmentType === undefined) {
			employmentType = func_at_company.employment_type;
		} else if (employmentType !== func_at_company.employment_type) {
			employmentType = null;
		}

		if (oldest_start_date === undefined) {
			oldest_start_date = func_at_company.start_date;
		} else if (func_at_company.start_date === null && oldest_start_date !== null) {
			oldest_start_date = null;
		} else {
			if (
				func_at_company.start_date !== null &&
				oldest_start_date !== null &&
				func_at_company.start_date.getTime() - oldest_start_date.getTime() < 0
			) {
				oldest_start_date = func_at_company.start_date;
			}
		}

		if (newest_end_date === undefined) {
			if (func_at_company.end_date === undefined) {
				newest_end_date = null;
			} else {
				newest_end_date = func_at_company.end_date;
			}
		} else if (newest_end_date !== null) {
			if (func_at_company.end_date === null) {
				newest_end_date = null;
			} else if (newest_end_date.getTime() - func_at_company.end_date.getTime() < 0) {
				newest_end_date = func_at_company.end_date;
			}
		}
	});

	import { durationInHalfYears, formatDate } from '$lib/utils.js';

	const getDateText = () => {
		const startText = oldest_start_date != null ? formatDate(oldest_start_date) : 'Unknown';
		const endText = newest_end_date != null ? formatDate(newest_end_date) : 'Present';
		const durationText =
			oldest_start_date != null && newest_end_date != null
				? ' (' + durationInHalfYears(oldest_start_date, newest_end_date) + ' years)'
				: '';

		return startText + ' to ' + endText + durationText;
	};
</script>

<ExpandableCard dateText={getDateText()} {description}>
	<div slot="summary">
		<p class="font-semibold">
			{company}
			{#if employmentType !== null}
				&bull; {employmentType}
			{/if}
		</p>
		{#each functions as func_at_company, index (index)}
			<p class="hasDate font-medium tracking-normal normal-case">
				- {func_at_company.title} ({formatDate(func_at_company.start_date)} to {func_at_company.end_date !=
				null
					? formatDate(func_at_company.end_date)
					: 'Present'})
			</p>
			{#if employmentType === null}
				<p class="pl-2 font-light text-zinc-300">- {func_at_company.employment_type}</p>
			{/if}
		{/each}
	</div>
</ExpandableCard>

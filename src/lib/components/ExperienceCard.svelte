<script>
	import ExpandableCard from '#lib/components/ExpandableCard.svelte';
	import { formatDate, formatDateRange } from '#lib/utils.js';

	/** @type String */
	export let company = 'Company Name';
	/** @type String | null */
	export let description = null;
	/** @type {string[]} */
	export let highlights = [];
	/** @type Array<{start_date: Date, end_date: Date | null, title: String, employment_type: String}> */
	export let functions = [
		{
			start_date: new Date(),
			end_date: null,
			title: 'Software Engineer',
			employment_type: 'Full-time'
		}
	];

	// The oldest start date and newest end date for the entire company (null if still ongoing)
	const oldest_start_date = new Date(
		Math.min(...functions.map((func) => func.start_date.getTime()))
	);
	const newest_end_date = functions.some((func) => func.end_date === null)
		? null
		: new Date(Math.max(...functions.map((func) => func.end_date?.getTime() ?? 0)));

	// Show the employment type once for the company if all functions share it
	const employmentTypes = new Set(functions.map((func) => func.employment_type));
	const sharedEmploymentType = employmentTypes.size === 1 ? functions[0].employment_type : null;
</script>

<ExpandableCard
	dateText={formatDateRange(oldest_start_date, newest_end_date)}
	{description}
	{highlights}
>
	<div slot="summary" class="flex flex-col gap-3">
		<p class="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold">
			{company}
			{#if sharedEmploymentType !== null}
				<span class="badge">{sharedEmploymentType}</span>
			{/if}
		</p>
		<ul class="flex flex-col gap-2">
			{#each functions as func_at_company, index (index)}
				<li class="flex flex-col">
					<p class="flex flex-wrap items-center gap-x-2 gap-y-1 leading-snug font-medium">
						{func_at_company.title}
						{#if sharedEmploymentType === null}
							<span class="badge">{func_at_company.employment_type}</span>
						{/if}
					</p>
					<p class="text-sm text-zinc-400">
						{formatDate(func_at_company.start_date)} – {func_at_company.end_date != null
							? formatDate(func_at_company.end_date)
							: 'Present'}
					</p>
				</li>
			{/each}
		</ul>
	</div>
</ExpandableCard>

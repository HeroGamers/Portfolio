<script>
	import DropDownIcon from '$lib/images/ChevronDownSolidSVG.svelte';

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

	/** @type boolean */
	let expanded = false;

	/**
	 * @param {MouseEvent | KeyboardEvent} event
	 */
	const toggleExpansion = (event) => {
		// If the event is a keyboard event, check if the key is not "Enter" or " ", to prevent Tab from toggling the expansion
		if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') {
			return;
		}

		expanded = !expanded;
	};

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
</script>

<div class="flex flex-col">
	<p class="hasDate pb-2">
		{oldest_start_date != null ? formatDate(oldest_start_date) : 'Unknown'} to {newest_end_date !=
		null
			? formatDate(newest_end_date)
			: 'Present'}{oldest_start_date != null && newest_end_date != null
			? ' (' + durationInHalfYears(oldest_start_date, newest_end_date) + ' years)'
			: ''}
	</p>
	<div
		class="card relative ml-1 flex flex-col sm:ml-3"
		on:click={toggleExpansion}
		on:keydown={toggleExpansion}
		aria-expanded={expanded}
		role="button"
		tabindex="0"
	>
		<div class="flex flex-row justify-between gap-2">
			<div class="flex max-w-[95%] flex-col">
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
			<!-- absolute top-4 right-4 rotate-90 transition-transform h-7 w-7 dropdown -->
			<div class="dropdown mt-0.5 ml-3 h-7 w-7 rotate-90 transition-transform duration-300">
				<DropDownIcon />
			</div>
		</div>
		<div>
			{#if description != null}
				<p class="card-expansion pt-2">{description}</p>
			{/if}
		</div>
	</div>
</div>

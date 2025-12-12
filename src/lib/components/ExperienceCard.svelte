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

	import { formatDate } from '$lib/utils.js';
</script>

<div class="flex flex-col">
	<p class="hasDate pb-2">
		{oldest_start_date != null ? formatDate(oldest_start_date) : 'Unknown'} to {newest_end_date !=
		null
			? formatDate(newest_end_date)
			: 'Present'}
	</p>
	<div
		class="card relative ml-2 flex flex-col p-2 sm:ml-4"
		on:click={toggleExpansion}
		on:keydown={toggleExpansion}
		aria-expanded={expanded}
		role="button"
		tabindex="0"
	>
		<div class="flex flex-row justify-between">
			<div class="flex max-w-[95%] flex-col">
				<p class="font-bold">
					{company}
					{#if employmentType !== null}
						&bull; {employmentType}
					{/if}
				</p>
				{#each functions as func_at_company, index (index)}
					<p class="hasDate font-medium">
						- {func_at_company.title} ({formatDate(func_at_company.start_date)} to {func_at_company.end_date !=
						null
							? formatDate(func_at_company.end_date)
							: 'Present'})
					</p>
					{#if employmentType === null}
						<p class="pl-2 font-light">- {func_at_company.employment_type}</p>
					{/if}
				{/each}
			</div>
			<!-- absolute top-4 right-4 rotate-90 transition-transform h-7 w-7 dropdown -->
			<div class="dropdown ml-3 h-7 w-7 rotate-90 transition-transform">
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

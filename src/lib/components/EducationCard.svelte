<script>
	import DropDownIcon from '$lib/images/ChevronDownSolidSVG.svelte';

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

	import { formatDate } from '$lib/utils.js';
</script>

<div class="flex flex-col">
	<p class="hasDate pb-2">
		{start_date != null ? formatDate(start_date) : 'Unknown'} to {end_date != null
			? formatDate(end_date)
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
				<p class="font-bold">{school}</p>
				<p class="font-light">{degree}</p>
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

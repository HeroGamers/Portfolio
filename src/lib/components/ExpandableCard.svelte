<script>
	import DropDownIcon from '$lib/images/ChevronDownSolidSVG.svelte';
	import { slide } from 'svelte/transition';

	/** @type {string | null} */
	export let dateText = null;
	/** @type {string | null} */
	export let description = null;
	/** @type {number} */
	export let transitionDuration = 220;

	let expanded = false;

	/**
	 * @param {MouseEvent | KeyboardEvent} event
	 */
	const toggleExpansion = (event) => {
		if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') {
			return;
		}

		expanded = !expanded;
	};
</script>

<div class="flex flex-col">
	{#if dateText != null}
		<p class="hasDate pb-2">{dateText}</p>
	{/if}

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
				<slot name="summary" />
			</div>
			<div
				class="dropdown mt-0.5 ml-3 h-7 w-7 transition-transform duration-300"
				class:rotate-90={!expanded}
				class:rotate-0={expanded}
			>
				<DropDownIcon />
			</div>
		</div>

		{#if description != null && expanded}
			<p class="card-expansion pt-2" transition:slide|local={{ duration: transitionDuration }}>
				{description}
			</p>
		{/if}
	</div>
</div>

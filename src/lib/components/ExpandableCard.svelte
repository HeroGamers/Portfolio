<script>
	import ChevronDown from '~icons/lucide/chevron-down';
	import { slide } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';

	/** @type {string | null} */
	export let dateText = null;
	/** @type {string | null} */
	export let description = null;
	/** @type {string[]} bullet points shown under the description */
	export let highlights = [];
	/** @type {string | null} optional heading above the highlights */
	export let highlightsLabel = null;
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
				class="dropdown mt-1 ml-3 size-4.5 shrink-0 transition-transform duration-300"
				class:rotate-90={!expanded}
				class:rotate-0={expanded}
			>
				<ChevronDown class="icon block size-full" />
			</div>
		</div>

		{#if (description != null || highlights.length > 0) && expanded}
			<div
				class="card-expansion flex flex-col gap-2 pt-2"
				transition:slide|local={{ duration: prefersReducedMotion.current ? 0 : transitionDuration }}
			>
				{#if description != null}
					<p>{description}</p>
				{/if}
				{#if highlights.length > 0}
					{#if highlightsLabel != null}
						<p class="text-sm text-zinc-400">{highlightsLabel}</p>
					{/if}
					<ul class="flex list-disc flex-col gap-1 pl-5 marker:text-zinc-500">
						{#each highlights as highlight (highlight)}
							<li>{highlight}</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/if}
	</div>
</div>

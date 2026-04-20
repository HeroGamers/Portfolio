<script>
	import { fly } from 'svelte/transition';
	/** @type {string | null} [backLink] - Optional link to go back to */
	export let backLink = null;
	/** @type {string | null} [backText] */
	export let backText = null;
	/** @type {string} title - The page title */
	export let title = '';
	/** @type {string | null} [description] - Optional description */
	export let description = null;
	/** @type {string | null} [id] - Section ID for styling */
	export let id = null;
</script>

<section class="flex w-full flex-col items-start pt-0" {id} in:fly={{ y: 12, duration: 700 }}>
	{#if backLink && backText}
		<a
			href={backLink}
			class="mb-4 text-sm font-medium tracking-widest text-zinc-400 uppercase transition hover:text-zinc-200"
		>
			← {backText}
		</a>
	{/if}

	<h1 class="mb-2 text-4xl font-semibold sm:text-5xl" class:gradient={id === 'ddc-fasttrack'}>
		{title}
	</h1>

	{#if description}
		<p class="mb-8 text-zinc-300">{description}</p>
	{/if}

	<slot />
</section>

<style>
	h1.gradient {
		background: linear-gradient(
			90deg,
			rgba(250, 250, 250, 0.98) 0%,
			rgba(213, 188, 232, 0.94) 100%
		);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
</style>

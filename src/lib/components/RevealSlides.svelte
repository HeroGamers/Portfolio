<script>
	import { onMount, tick } from 'svelte';
	import 'reveal.js/reveal.css';
	import 'reveal.js/theme/night.css';
	import 'reveal.js/plugin/highlight/monokai.css';

	/** @type {Record<string, unknown>} */
	export let options = {};
	/** @type {string} */
	export let markdownSrc = '';
	/** @type {string} */
	export let markdownContent = '';
	/** @type {string} */
	export let markdownSeparator = '^\\r?\\n---\\r?\\n$';
	/** @type {string} */
	export let markdownSeparatorVertical = '';
	/** @type {string} */
	export let markdownSeparatorNotes = '^notes?:';
	/** @type {string} */
	export let markdownCharset = '';

	/** @type {HTMLElement | undefined} */
	let container;
	/** @type {HTMLElement | undefined} */
	let revealRoot;
	/** @type {any} */
	let deck;
	/** @type {(() => void) | undefined} */
	let cleanupFullscreen;
	/** @type {(() => void) | undefined} */
	let cleanupKeydown;
	/** @type {(() => void) | undefined} */
	let cleanupMarkdownUrl;
	/** @type {string} */
	let markdownContentUrl = '';

	const defaultOptions = /** @type {any} */ ({
		embedded: true,
		controls: true,
		progress: true,
		center: true,
		hash: true,
		transition: 'slide'
	});

	function toggleFullscreen() {
		if (!container) {
			return;
		}

		if (document.fullscreenElement === container) {
			document.exitFullscreen();
			return;
		}

		container.requestFullscreen?.();
	}

	onMount(() => {
		const init = async () => {
			if (!revealRoot) {
				return;
			}

			if (markdownContent && !markdownSrc) {
				const markdownBlob = new Blob([markdownContent], { type: 'text/markdown' });
				markdownContentUrl = URL.createObjectURL(markdownBlob);
				cleanupMarkdownUrl = () => URL.revokeObjectURL(markdownContentUrl);
				await tick();
			}

			const activeMarkdownSrc = markdownSrc || markdownContentUrl;

			const { default: Reveal } = await import('reveal.js');
			/** @type {any} */
			const resolvedOptions = { ...defaultOptions, ...options };

			const existingPlugins = Array.isArray(resolvedOptions.plugins) ? resolvedOptions.plugins : [];
			const { default: RevealHighlight } = await import('reveal.js/plugin/highlight');

			if (activeMarkdownSrc) {
				const { default: RevealMarkdown } = await import('reveal.js/plugin/markdown');
				resolvedOptions.plugins = [...existingPlugins, RevealMarkdown, RevealHighlight];
			} else {
				resolvedOptions.plugins = [...existingPlugins, RevealHighlight];
			}

			deck = new Reveal(revealRoot, resolvedOptions);
			await deck.initialize();

			const relayout = () => deck?.layout();
			document.addEventListener('fullscreenchange', relayout);
			cleanupFullscreen = () => document.removeEventListener('fullscreenchange', relayout);

			/** @param {KeyboardEvent} event */
			const handleKeydown = (event) => {
				if (event.key === 'Escape' && document.fullscreenElement === container) {
					document.exitFullscreen();
				}
			};

			document.addEventListener('keydown', handleKeydown);
			cleanupKeydown = () => document.removeEventListener('keydown', handleKeydown);
		};

		void init();

		return () => {
			cleanupFullscreen?.();
			cleanupKeydown?.();
			cleanupMarkdownUrl?.();
			deck?.destroy();
		};
	});
</script>

<div class="slides-wrapper" bind:this={container}>
	<div class="slides-toolbar">
		<button type="button" class="fullscreen-btn" on:click={toggleFullscreen}>
			Toggle Fullscreen
		</button>
	</div>

	<div class="reveal" bind:this={revealRoot}>
		<div class="slides">
			{#if markdownSrc || markdownContentUrl}
				<section
					data-markdown={markdownSrc || markdownContentUrl}
					data-separator={markdownSeparator}
					data-separator-vertical={markdownSeparatorVertical || undefined}
					data-separator-notes={markdownSeparatorNotes}
					data-charset={markdownCharset || undefined}
				></section>
			{:else}
				<slot />
			{/if}
		</div>
	</div>
</div>

<style>
	.slides-wrapper {
		width: 100%;
		max-width: 1100px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		overflow: hidden;
		background: #0e1017;
	}

	.slides-toolbar {
		display: flex;
		justify-content: flex-end;
		padding: 0.75rem;
		background: rgba(255, 255, 255, 0.05);
	}

	.fullscreen-btn {
		padding: 0.45rem 0.8rem;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.25);
		color: #fff;
		background: rgba(255, 255, 255, 0.1);
		cursor: pointer;
	}

	.fullscreen-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	:global(.reveal) {
		height: 70vh;
	}

	:global(.reveal .slides section) {
		text-align: left;
	}

	.slides-wrapper:fullscreen {
		max-width: none;
		width: 100vw;
		height: 100vh;
		border-radius: 0;
	}

	.slides-wrapper:fullscreen :global(.reveal) {
		height: 100vh;
	}

	.slides-wrapper:fullscreen .slides-toolbar {
		display: none;
	}
</style>

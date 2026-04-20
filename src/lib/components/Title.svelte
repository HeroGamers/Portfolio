<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const prefix = 'Hello, ';
	const original = 'Hello, World!';
	const replacement = "I'm Hero!";

	let displayText = original;

	onMount(() => {
		if (typeof window === 'undefined') return;

		/** @type {ReturnType<typeof setTimeout>[]} */
		const timers = [];
		/** @param {() => void} fn @param {number} delay */
		const queue = (fn, delay) => timers.push(setTimeout(fn, delay));

		const startDelay = 2000;
		const stepMs = 150;

		// Delete "World!"
		let t = startDelay;
		for (let i = original.length - 1; i >= prefix.length; i--) {
			queue(() => {
				displayText = original.slice(0, i);
			}, t);
			t += stepMs;
		}

		// Replace with introducing text
		for (let i = 1; i <= replacement.length; i++) {
			queue(() => {
				displayText = prefix + replacement.slice(0, i);
			}, t);
			t += stepMs;
		}

		return () => timers.forEach(clearTimeout);
	});
</script>

<section id="home" class="flex w-full flex-col" in:fly={{ y: 12, duration: 700 }}>
	<h1 class="typing text-center font-semibold" id="hello-world">{displayText}</h1>
	<h4 class="text-center font-light text-zinc-300">Currently pursuing an MSc in Cyber Security</h4>
</section>

<style>
	h1 {
		background: linear-gradient(
			90deg,
			rgba(250, 250, 250, 0.98) 0%,
			rgba(213, 188, 232, 0.94) 100%
		);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.typing::after {
		content: '|';
		margin-left: 0.08em;
		animation: blink 0.9s step-end infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>

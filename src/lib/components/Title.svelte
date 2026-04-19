<script>
	import { onMount } from 'svelte';

	const prefix = 'Hello, ';
	const original = 'Hello, World!';
	const replacement = "I'm Marcus!";

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

		// Type "I'm Marcus!"
		for (let i = 1; i <= replacement.length; i++) {
			queue(() => {
				displayText = prefix + replacement.slice(0, i);
			}, t);
			t += stepMs;
		}

		return () => timers.forEach(clearTimeout);
	});
</script>

<section id="home" class="flex w-full flex-col">
	<h1 class="typing text-center" id="hello-world">{displayText}</h1>
	<h4 class="text-center">Currently pursuing an MSc in Cyber Security</h4>
</section>

<style>
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

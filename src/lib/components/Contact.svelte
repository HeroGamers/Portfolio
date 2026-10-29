<script>
	import resume from '#lib/resume.js';

	/** @type {Array<{network: string, url: string}>} */
	const profiles = resume.basics.profiles ?? [];
</script>

<section id="contact" class="flex w-full flex-col items-start">
	<h5 class="font-medium">Contact</h5>
	<div class="flex w-full flex-col gap-3 px-1 sm:px-4">
		<p class="text-sm text-zinc-300">Feel free to reach out through any of these channels:</p>
		<dl class="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2">
			<dt class="text-zinc-400">Email</dt>
			<dd id="email" aria-label="Email address" class="font-mono"></dd>
			{#each profiles as profile (profile.url)}
				<dt class="text-zinc-400">{profile.network}</dt>
				<dd class="min-w-0">
					<a href={profile.url} target="_blank" rel="noreferrer" class="font-mono break-all"
						>{profile.url.replace(/^https?:\/\//, '')}</a
					>
				</dd>
			{/each}
		</dl>
	</div>
</section>

<style lang="scss">
	#email {
		position: relative;
		display: inline-flex;
		min-height: 1.2em;
		font-family: 'Courier New', Courier, monospace;
		color: #00d9ff;
	}

	#email::before,
	#email::after {
		opacity: 0;
		animation: show-email 1ms linear 350ms forwards;
	}

	#email::before {
		content: 'hero';
	}

	#email::after {
		content: '@herogamers.dev';
	}

	@keyframes show-email {
		to {
			opacity: 1;
		}
	}
</style>

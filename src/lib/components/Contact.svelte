<section id="contact" class="flex w-full flex-col items-center">
	<div class="contact-container flex w-full max-w-3xl flex-col items-center px-1 sm:px-3">
		<h5 class="w-full text-center font-medium">Contact</h5>
		<div class="mt-2 flex w-full flex-col items-center gap-2">
			<p class="text-center text-sm text-zinc-300">
				Feel free to reach out through any of these channels:
			</p>
			<ul class="flex flex-col items-center gap-2.5">
				<li class="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
					<p class="text-zinc-400">Email:</p>
					<p id="email" aria-label="Email address" class="font-mono"></p>
				</li>
				<li class="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
					<p class="text-zinc-400">Keybase:</p>
					<a href="https://keybase.io/herogamers" target="_blank" class="font-mono"
						>keybase.io/herogamers</a
					>
				</li>
			</ul>
		</div>
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

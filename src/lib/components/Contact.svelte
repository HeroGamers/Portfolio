<section id="contact" class="flex w-full flex-col items-center items-start pt-10">
	<div class="max-w-5xl">
		<h5 class="w-full text-center font-medium">Contact</h5>
		<p class="pb-2">
			If you'd like to contact me, then you can do so through any of the following ways:
		</p>
		<ul class="flex w-full max-w-sm flex-1 flex-col">
			<li class="flex w-full flex-row">
				<p class="w-full">Email:</p>
				<p class="w-full" id="email" aria-label="Email address"></p>
			</li>
			<li class="flex w-full flex-row">
				<p class="w-full">Keybase (encrypted):</p>
				<a class="w-full" href="https://keybase.io/herogamers" target="_blank"
					>keybase.io/herogamers</a
				>
			</li>
		</ul>
	</div>
</section>

<style lang="scss">
	#email {
		position: relative;
		display: inline-flex;
		min-height: 1.2em;
		font-family: 'Courier New', Courier, monospace;
		color: $color-theme-1;
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

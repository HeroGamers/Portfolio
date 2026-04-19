<script>
	/** @type {Array<{name: string, href: string, image: string}>} */
	export let badges = [
		{
			name: 'Hero',
			href: 'https://herogamers.dev',
			image: '/badges/hero.png'
		}
	];
</script>

<section id="friends-badges" class="flex w-full flex-col items-start">
	<h5 class="font-medium">Webring</h5>

	<div class="flex w-full flex-wrap gap-3 px-1 sm:px-4">
		{#each badges as badge (badge.href)}
			<a
				class="badge-link inline-flex items-center justify-center p-1"
				href={badge.href}
				target="_blank"
				rel="noreferrer"
				title={badge.name}
			>
				<img
					src={badge.image}
					alt={'Badge for ' + badge.name}
					width="88"
					height="31"
					loading="lazy"
				/>
			</a>
		{/each}
	</div>
</section>

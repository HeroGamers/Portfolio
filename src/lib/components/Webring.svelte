<script>
	import { fly } from 'svelte/transition';
	/** @type {Array<{name: string, href: string, image: string}>} */
	export let badges = [
		{
			name: 'Hero',
			href: 'https://herogamers.dev',
			image: '/badges/hero.png'
		}
	];

	/** @type {Array<{name: string, href: string, image: string}>} */
	export let other_badges = [
		{
			name: 'Kagi Search',
			href: 'https://kagi.com/',
			image: '/badges/other/kagi.png'
		},
		{
			name: 'NixOS',
			href: 'https://nixos.org/',
			image: '/badges/other/nixos.png'
		},
		{
			name: 'Firefox',
			href: 'https://www.firefox.com/',
			image: '/badges/other/firefox.gif'
		},
		{
			name: 'Thunderbird',
			href: 'https://www.thunderbird.net/',
			image: '/badges/other/thunderbird.gif'
		},
		{
			name: 'Matrix',
			href: 'https://matrix.org/',
			image: '/badges/other/matrix.png'
		}
	];
</script>

<section
	id="friends-badges"
	class="flex w-full flex-col items-start"
	in:fly={{ y: 12, duration: 700 }}
>
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
					class="pixelated"
					src={badge.image}
					alt={'Badge for ' + badge.name}
					width="88"
					height="31"
					loading="lazy"
				/>
			</a>
		{/each}
	</div>

	<h6 class="mt-4 font-medium">&gt; Other badges</h6>
	<div class="flex w-full flex-wrap gap-3 px-1 sm:px-4">
		{#each other_badges as badge (badge.href)}
			<a
				class="badge-link inline-flex items-center justify-center p-1"
				href={badge.href}
				target="_blank"
				rel="noreferrer"
				title={badge.name}
			>
				<img
					class="pixelated"
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

<style>
	.pixelated {
		image-rendering: pixelated;
	}
</style>

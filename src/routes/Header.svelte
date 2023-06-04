<script>
	import { page } from '$app/stores';
	import Logo from '$lib/images/SiteIconSVG.svelte';
	import GitHubLogo from '$lib/images/GitHubSVG.svelte';
	import LinkedInSVG from "$lib/images/LinkedInSVG.svelte";

</script>

<header class="flex md:min-h-screen md:max-h-screen">
	<div class="flex justify-between md:flex-col px-2 pt-2 md:py-12 md:min-h-screen md:max-h-screen md:px-0 md:fixed md:m-auto">
		<div class="flex justify-center md:w-full h-20 flex-col">
			<a class="flex justify-start md:justify-center h-full w-full" href="https://herogamers.dev">
				<Logo class="site-logo" />
<!--				<img src={logo} alt="HeroGamers" />-->
			</a>
	<!--		<hr class="border-t-4 border-purple-400 rounded-2xl mt-2 hidden md:flex" />-->
		</div>

		<nav class="flex items-center justify-end md:justify-center w-full">
			<ul class="flex flex-row md:flex-col md:space-y-6 items-center md:items-start list-none">
				<li aria-current={($page.url.pathname === '/' && $page.url.searchParams.get('page') === null) ? 'page' : undefined}>
					<a class="flex items-center" href="/">Home</a>
				</li>

				<li aria-current={$page.url.searchParams.get('page') === 'about' ? 'page' : undefined}>
					<a class="flex items-center" href="?page=about">About</a>
				</li>

				<li aria-current={$page.url.searchParams.get('page') === 'experience' ? 'page' : undefined}>
					<a class="flex items-center" href="?page=experience">Experience</a>
				</li>

				<li aria-current={$page.url.searchParams.get('page') === 'education' ? 'page' : undefined}>
					<a class="flex items-center" href="?page=education">Education</a>
				</li>

				<li aria-current={$page.url.searchParams.get('page') === 'portfolio' ? 'page' : undefined}>
					<a class="flex items-center" href="?page=portfolio">Portfolio</a>
				</li>

				<li aria-current={$page.url.searchParams.get('page') === 'contact' ? 'page' : undefined}>
					<a class="flex items-center" href="?page=contact">Contact</a>
				</li>
			</ul>
		</nav>

		<div class="justify-center w-full flex-row hidden md:flex space-x-5">
			<a class="flex justify-center socials h-10 w-10" href="https://github.com/HeroGamers">
				<GitHubLogo />
			</a>
			<a class="flex justify-center socials h-10 w-10" href="https://linkedin.com/in/marcus-sand">
				<LinkedInSVG />
			</a>
		</div>
	</div>
</header>

<style lang="scss">
	header {
		@media (min-width: 768px) {
			min-width: 15rem;
			max-width: 15rem;
		}

		& > div {
			min-width: 100%;
			@media (min-width: 768px) {
				min-width: 15rem;
				max-width: 15rem;
				border-right-width: 1.5px;
				border-right-color: $color-bg-top;
			}
		}
	}

	nav {
		a {
			height: 100%;
			padding: 0 0.5rem;
			font-weight: 700;
			font-size: 0.8rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			text-decoration: none;
			transition: color 0.2s linear;

			@media (min-width: 768px) {
				font-size: 1.5rem;
			}

			&:hover {
				color: $color-theme-1;
			}
		}

		li {
			transition: border 0.2s linear;

			a {
				color: $color-text;
			}

			&[aria-current='page'] {
				a {
					color: $color-theme-1;
				}
			}

			@media (min-width: 768px) {
				border-left-width: 4px;
				&[aria-current='page'] {
					border-left-color: $color-theme-1;

					a {
						color: $color-text;

						&:hover {
							color: $color-theme-1;
						}
					}
				}
				&:hover {
					border-left-color: $color-theme-1;
				}
			}
		}
	}
</style>

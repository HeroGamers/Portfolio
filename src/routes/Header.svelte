<script>
	// import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Logo from '$lib/images/SiteIconSVG.svelte';
	import GitHubLogo from '$lib/images/GitHubSVG.svelte';
	import LinkedInSVG from "$lib/images/LinkedInSVG.svelte";

	let sections = [
		{
			id: "home",
			href: "/",
			text: "Home",
			current: "page"
		},
		{
			id: "about",
			href: "#about",
			text: "About",
			current: false
		},
		{
			id: "experience",
			href: "#experience",
			text: "Experience",
			current: false
		},
		{
			id: "education",
			href: "#education",
			text: "Education",
			current: false
		},
		{
			id: "portfolio",
			href: "#portfolio",
			text: "Portfolio",
			current: false
		},
		{
			id: "contact",
			href: "#contact",
			text: "Contact",
			current: false
		}
	]

	onMount(() => {
		// console.log("OnMount");

		const offset_offset = 100;
		const isCurrentHeader = (id) => {
			// console.log("isCurrentHeader " + id);
			// https://stackoverflow.com/a/31712309/12418245
			const currentScroll = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
			const idElem = document.getElementById(id);
			// console.log(idElem.offsetTop + " < " + (currentScroll + offset_offset) + " = " + (idElem.offsetTop < currentScroll + offset_offset))
			return idElem.offsetTop < currentScroll + offset_offset;
		}

		const getCurrentHeader = () => {
			// let current_section = 0;
			for (let i = 0; i < sections.length; i++) {
				if (i === 0) {
					sections[i].current = "page";
					continue;
				}

				if (isCurrentHeader(sections[i].id)) {
					// console.log("changing current");
					sections[i].current = "page";
					// current_section = i;
					if (i > 0) {
						sections[i-1].current = false;
					}
				}
				else {
					sections[i].current = false;
				}
			}

			// console.log("updating sections");
			// console.table(sections);
			// sections = sections;

			// window.location.hash = sections[current_section].id;
			// document.getElementsByClassName(sections[current_section].id + "-navbar")[0].ariaCurrent = true;
			// if (window.history.replaceState) {
			// 	window.history.replaceState({}, sections[current_section].text, sections[current_section].href);
			// }
		}

		window.onscroll = () => {
			// console.log("scroll");
			getCurrentHeader()
		}

		getCurrentHeader();
	})

	// onDestroy(() => {
	// 	window.onscroll = () => {}
	// })
</script>

<header class="flex md:min-h-screen md:max-h-screen">
	<div class="flex justify-between md:flex-col px-2 pt-2 md:py-12 md:min-h-screen md:max-h-screen md:px-0 md:fixed md:m-auto">
		<div class="flex justify-center md:w-full h-20 flex-col">
			<a class="flex justify-start md:justify-center h-full w-full" href="/">
				<Logo />
<!--				<img src={logo} alt="HeroGamers" />-->
			</a>
	<!--		<hr class="border-t-4 border-purple-400 rounded-2xl mt-2 hidden md:flex" />-->
		</div>

		<nav class="flex items-center justify-end md:justify-center w-full">
			<ul class="flex flex-row md:flex-col md:space-y-6 items-center md:items-start list-none">
				{#each sections as section}
					<li aria-current={section.current} class="{section.id}-navbar" data-testid="{section.id}-navbar">
						<a class="flex items-center" href={section.href}>{section.text}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="justify-center w-full flex-row hidden md:flex space-x-5">
			<a class="flex justify-center socials h-10 w-10" href="https://github.com/HeroGamers" target="_blank">
				<GitHubLogo />
			</a>
			<a class="flex justify-center socials h-10 w-10" href="https://linkedin.com/in/marcus-sand" target="_blank">
				<LinkedInSVG />
			</a>
		</div>
	</div>
</header>

<style lang="scss">
	header {
		overflow: hidden;

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
				font-size: 1rem;
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

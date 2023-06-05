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

	let burgerMenuExpanded = false;
</script>

<header class="flex md:min-h-screen md:max-h-screen">
	<div class="flex flex-col sm:flex-row justify-between md:flex-col px-2 py-2 md:py-12 md:min-h-screen md:max-h-screen md:px-0 md:fixed md:m-auto">
		<div class="flex justify-between sm:w-fit sm:justify-center items-center flex-row md:w-full">
			<a class="flex justify-start md:justify-center w-12 h-12 md:w-20 md:h-20" href="/" title="Home">
				<Logo />
<!--				<img src={logo} alt="HeroGamers" />-->
			</a>
	<!--		<hr class="border-t-4 border-purple-400 rounded-2xl mt-2 hidden md:flex" />-->

			<!-- https://stackoverflow.com/a/51813362/12418245 -->
			<ul class="flex justify-end sm:hidden cursor-pointer list-none hamburger-menu" class:expanded={burgerMenuExpanded} on:click={() => (burgerMenuExpanded = !burgerMenuExpanded)} on:keydown={() => (burgerMenuExpanded = !burgerMenuExpanded)}>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>

		<nav class="flex flex-col sm:flex-row items-center justify-end md:justify-center w-full" class:expanded={burgerMenuExpanded}>
			<ul class="flex flex-col sm:flex-row md:flex-col md:space-y-6 items-center justify-center md:items-start list-none w-full sm:w-fit">
				{#each sections as section}
					<li aria-current={section.current} class="{section.id}-navbar w-screen text-center flex justify-center md:justify-start h-full sm:w-full" data-testid="{section.id}-navbar">
						<a class="flex items-center justify-center w-full text-center sm:justify-start" href={section.href} title={section.text}>{section.text}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="justify-center w-full flex-row hidden md:flex space-x-5">
			<a class="flex justify-center socials h-10 w-10" href="https://github.com/HeroGamers" target="_blank" title="GitHub">
				<GitHubLogo />
			</a>
			<a class="flex justify-center socials h-10 w-10" href="https://linkedin.com/in/marcus-sand" target="_blank" title="LinkedIn">
				<LinkedInSVG />
			</a>
		</div>
	</div>
</header>

<style lang="scss">
	header {
		overflow: hidden;

		@media (max-width: 639px) {
			background-color: $color-bg-1;
		}

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
		@media (max-width: 639px) {
			display: flex;
			max-height: 0;
			transition: max-height 1s ease;
			overflow: hidden;

			&.expanded {
				display: flex;
				max-height: 30vh;
			}
		}

		a {
			height: 100%;
			padding: 0 0.5rem;
			font-weight: 700;
			font-size: 0.8rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			text-decoration: none;
			transition: color 0.2s linear;

			@media (max-width: 639px) {
				padding: 0.5rem 0.5rem;
				font-size: 0.95rem;
			}

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

			//@media (max-width: 639px) {
			//	background-color: $color-bg-1;
			//
			//	&:hover {
			//		background-color: $color-bg-0;
			//	}
			//}

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

	// https://stackoverflow.com/a/51813362/12418245
	.hamburger-menu {
		cursor: pointer;
		height: 24px;
		list-style: none;
		margin: 0;
		padding: 0;
		width: 30px;
		position: relative;
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transition: .3s ease-in-out;
		-moz-transition: .3s ease-in-out;
		-o-transition: .3s ease-in-out;
		transition: .3s ease-in-out;

		&.expanded {
			li {
				&:nth-child(1) {
					left: 4px;
					top: -1px;
					-webkit-transform: rotate(45deg);
					-moz-transform: rotate(45deg);
					-o-transform: rotate(45deg);
					transform: rotate(45deg);
				}

				&:nth-child(2) {
					opacity: 0;
					width: 0;
				}

				&:nth-child(3) {
					left: 4px;
					top: 20px;
					-webkit-transform: rotate(-45deg);
					-moz-transform: rotate(-45deg);
					-o-transform: rotate(-45deg);
					transform: rotate(-45deg);
				}
			}
		}

		li {
			background-color: $color-text;
			border-radius: 4px;
			display: block;
			height: 4px;
			left: 0;
			margin: 0;
			opacity: 1;
			padding: 0;
			position: absolute;
			width: 100%;
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
			-webkit-transition: .15s ease-in-out;
			-moz-transition: .15s ease-in-out;
			-o-transition: .15s ease-in-out;
			transition: .15s ease-in-out;

			&:nth-child(1) {
				top: 0;
				-webkit-transform-origin: left center;
				-moz-transform-origin: left center;
				-o-transform-origin: left center;
				transform-origin: left center;
			}

			&:nth-child(2) {
				top: 9px;
				-webkit-transform-origin: left center;
				-moz-transform-origin: left center;
				-o-transform-origin: left center;
				transform-origin: left center;
			}

			&:nth-child(3) {
				top: 18px;
				-webkit-transform-origin: left center;
				-moz-transform-origin: left center;
				-o-transform-origin: left center;
				transform-origin: left center;
			}
		}
	}
</style>

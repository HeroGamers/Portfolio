<script>
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Logo from '$lib/images/SiteIconSVG.svelte';
	import GitHubLogo from '$lib/images/GitHubSVG.svelte';
	import LinkedInSVG from '$lib/images/LinkedInSVG.svelte';

	/**
	 * Sections of the page
	 * @type {Array.<{id: string | null, href: string, text: string, current: "page" | null}>}
	 */
	let sections = [
		{
			id: 'home',
			href: '/',
			text: 'Home',
			current: null
		},
		{
			id: 'about',
			href: '/#about',
			text: 'About',
			current: null
		},
		{
			id: 'experience',
			href: '/#experience',
			text: 'Experience',
			current: null
		},
		{
			id: 'education',
			href: '/#education',
			text: 'Education',
			current: null
		},
		{
			id: 'portfolio',
			href: '/#portfolio',
			text: 'Portfolio',
			current: null
		},
		{
			id: null,
			href: '/blog',
			text: 'Blog',
			current: null
		},
		{
			id: 'contact',
			href: '/#contact',
			text: 'Contact',
			current: null
		}
	];

	const offset_offset = 100;
	/**
	 * Check if the header is the current header
	 * @param {string | null} id - The id of the header
	 */
	const isCurrentHeader = (id) => {
		if (!id || typeof window === 'undefined') {
			return false;
		}
		const currentScroll = window.scrollY || document.getElementsByTagName('html')[0].scrollTop;
		const idElem = document.getElementById(id);
		if (!idElem) {
			return false;
		}
		return idElem.offsetTop < currentScroll + offset_offset;
	};

	const getCurrentHeader = () => {
		if (typeof window === 'undefined') {
			return;
		}

		const pathname = window.location.pathname;
		const hash = window.location.hash;
		let activeIndex = -1;

		for (let i = 0; i < sections.length; i++) {
			const [sectionPath, sectionHash] = sections[i].href.split('#');
			const hasHash = sectionHash != null && sectionHash.length > 0;

			if (hasHash) {
				if (pathname === sectionPath && hash === '#' + sectionHash) {
					activeIndex = i;
				}
				continue;
			}

			if (
				(sectionPath === '/' && pathname === '/') ||
				(sectionPath !== '/' &&
					(pathname === sectionPath || pathname.startsWith(sectionPath + '/')))
			) {
				activeIndex = i;
			}
		}

		if (pathname === '/') {
			for (let i = 0; i < sections.length; i++) {
				if (isCurrentHeader(sections[i].id)) {
					activeIndex = i;
				}
			}
		}

		for (let i = 0; i < sections.length; i++) {
			sections[i].current = i === activeIndex ? 'page' : null;
		}
		sections = [...sections];
	};

	const updateCurrentHeader = () => {
		getCurrentHeader();
	};

	afterNavigate(() => {
		updateCurrentHeader();
	});

	onMount(() => {
		window.addEventListener('scroll', updateCurrentHeader, { passive: true });
		window.addEventListener('hashchange', updateCurrentHeader);

		getCurrentHeader();

		return () => {
			window.removeEventListener('scroll', updateCurrentHeader);
			window.removeEventListener('hashchange', updateCurrentHeader);
		};
	});

	// onDestroy(() => {
	// 	window.onscroll = () => {}
	// })

	let burgerMenuExpanded = false;
</script>

<header class="flex md:max-h-screen md:min-h-screen">
	<div
		class="flex flex-col justify-between px-2 py-2 sm:flex-row md:fixed md:top-0 md:right-0 md:m-auto md:max-h-screen md:min-h-screen md:flex-col md:px-0 md:py-10"
	>
		<div class="flex flex-row items-center justify-between sm:w-fit sm:justify-center md:w-full">
			<a
				class="flex h-12 w-12 justify-start md:h-20 md:w-20 md:justify-center"
				href={resolve('/')}
				on:click={() => goto(resolve('/'))}
				title="Home"
			>
				<Logo />
				<!--				<img src={logo} alt="HeroGamers" />-->
			</a>
			<!--		<hr class="border-t-4 border-purple-400 rounded-2xl mt-2 hidden md:flex" />-->

			<!-- https://stackoverflow.com/a/51813362/12418245 -->
			<button
				class="flex cursor-pointer justify-end"
				on:click={() => (burgerMenuExpanded = !burgerMenuExpanded)}
				on:keydown={() => (burgerMenuExpanded = !burgerMenuExpanded)}
				aria-label="Toggle navigation"
			>
				<ul
					class="hamburger-menu flex cursor-pointer list-none justify-end sm:hidden"
					class:expanded={burgerMenuExpanded}
				>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</button>
		</div>

		<nav
			class="flex w-full flex-col items-center justify-start sm:flex-row sm:justify-end md:justify-center"
			class:expanded={burgerMenuExpanded}
		>
			<ul
				class="flex w-full list-none flex-col items-center justify-center sm:w-fit sm:flex-row md:flex-col md:items-end md:space-y-4"
			>
				{#each sections as section (section.id)}
					<li
						aria-current={section.current}
						class="{section.id}-navbar flex h-full w-screen justify-center text-center sm:w-full md:justify-end"
						data-testid="{section.id}-navbar"
					>
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a
							class="flex w-full items-center justify-center text-center sm:justify-start md:justify-end md:text-right"
							href={section.href}
							on:click={() => goto(section.href)}
							title={section.text}>{section.text}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="hidden w-full flex-row justify-center space-x-5 md:flex">
			<a
				class="socials flex h-10 w-10 justify-center"
				href="https://github.com/HeroGamers"
				target="_blank"
				title="GitHub"
			>
				<GitHubLogo />
			</a>
			<a
				class="socials flex h-10 w-10 justify-center"
				href="https://linkedin.com/in/marcus-sand"
				target="_blank"
				title="LinkedIn"
			>
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
			min-width: 16rem;
			max-width: 16rem;
		}

		& > div {
			min-width: 100%;
			background: linear-gradient(180deg, rgba(19, 19, 19, 0.88) 0%, rgba(13, 13, 13, 0.95) 100%);
			@media (min-width: 768px) {
				min-width: 16rem;
				max-width: 16rem;
				border-left-width: 1px;
				border-left-color: rgba(255, 255, 255, 0.1);
				box-shadow: -14px 0 50px rgba(0, 0, 0, 0.28);
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
				max-height: 25rem;
				overflow-y: auto;
			}
		}

		a {
			height: 100%;
			padding: 0.2rem 0.6rem;
			font-weight: 600;
			font-size: 0.8rem;
			text-transform: uppercase;
			letter-spacing: 0.16em;
			text-decoration: none;
			transition:
				color 0.2s linear,
				transform 0.2s ease;

			@media (max-width: 639px) {
				padding: 0.5rem 0.5rem;
				font-size: 0.95rem;
			}

			@media (min-width: 768px) {
				font-size: 0.95rem;
			}

			&:hover {
				color: $color-theme-1;
				transform: translateX(-3px);
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
				border-right-width: 4px;
				padding-right: 0.2rem;
				&[aria-current='page'] {
					border-right-color: $color-theme-1;

					a {
						color: $color-text;

						&:hover {
							color: $color-theme-1;
						}
					}
				}
				&:hover {
					border-right-color: $color-theme-1;
				}
			}
		}
	}

	.socials {
		opacity: 0.88;
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;

		&:hover {
			opacity: 1;
			transform: translateY(-2px);
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
		-webkit-transition: 0.3s ease-in-out;
		-moz-transition: 0.3s ease-in-out;
		-o-transition: 0.3s ease-in-out;
		transition: 0.3s ease-in-out;

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
			-webkit-transition: 0.15s ease-in-out;
			-moz-transition: 0.15s ease-in-out;
			-o-transition: 0.15s ease-in-out;
			transition: 0.15s ease-in-out;

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

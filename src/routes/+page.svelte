<script>
	import { page } from '$app/stores';
	import Title from '$lib/components/Title.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Education from '$lib/components/Education.svelte';
	import Portfolio from '$lib/components/Portfolio.svelte';
	import Contact from '$lib/components/Contact.svelte';

	/** @type String */
	const description = 'A student, aspiring to become a full-time developer.';

	/**
	 * For holding the title of the current page, to use in various places.
	 * @type String
	 * */
	let page_title = 'Aspiring Cybersecurity Enthusiast';

	// /** @type String */
	// switch (($page.url.searchParams.get('page') != null ? $page.url.searchParams.get('page').toLowerCase() : "home")) {
	// 	case "about":
	// 		page_title = "About";
	// 		break;
	// 	case "home":
	// 	default:
	// 		page_title = "Home";
	// 		break;
	// }

	//onMount(() => {
	//	if ($page.url.searchParams.get('page') != null) {
	//		document.querySelector($page.url.searchParams.get('page')).scrollIntoView();
	//	}

	// let title = $page_title ? 'Hero \u2014 ${$page_title}' : 'Hero';
	//
	// document.title = title;
	//});
</script>

<svelte:head>
	<title>Hero - {page_title}</title>
	<!-- Basic Metadata-->
	<meta name="description" content={description} />
	<meta name="keywords" content="HeroGamers, Marcus Sand, Portfolio, Website, Personal Website" />
	<meta name="author" content="Marcus Sand" />
	<meta name="application-name" content="&nbsp;" />
	<meta name="msapplication-TileColor" content="#6F3C97" />
	<!-- Facebook Metadata-->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={page_title} />
	<meta property="og:description" content={description} />
	<!-- Twitter Metadata-->
	<meta property="twitter:url" content={$page.url.href} />
	<meta property="twitter:title" content={page_title} />
	<meta property="twitter:description" content={description} />
</svelte:head>

<div
	class="justify-top content-container flex flex-col items-start overflow-x-hidden md:ml-5 md:mt-8"
>
	<Title />
	<About />
	<div class="flex flex-col xl:w-full xl:flex-row xl:justify-evenly xl:space-x-10">
		<Experience />
		<Education />
	</div>
	<Portfolio />
	<Contact />
</div>
<div class="mb-20 flex flex-1 flex-col items-center justify-center">
	<h5>Thanks for visiting!</h5>
</div>

<style lang="scss">
	.content-container {
		margin-bottom: 100vh;
	}
</style>

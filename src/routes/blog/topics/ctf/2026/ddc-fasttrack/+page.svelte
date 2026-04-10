<script>
	import { page } from '$app/state';
	import RevealSlides from '$lib/components/RevealSlides.svelte';

	import youveGotMail2 from './youve-got-mail-2.md?raw';
	import windowsForensicsHell from './windows-forensics-hell.md?raw';

	/** @type String */
	const description = 'Some stuff for the DDC FastTrack 2026 CTF competition.';

	/**
	 * For holding the title of the current page, to use in various places.
	 * @type String
	 * */
	let page_title = 'Blog - CTFs - DDC FastTrack 2026 Writeup';
</script>

<svelte:head>
	<title>Hero - {page_title}</title>
	<!-- Basic Metadata-->
	<meta name="description" content={description} />
	<!-- Facebook Metadata-->
	<meta property="og:url" content={page.url.href} />
	<meta property="og:title" content={page_title} />
	<meta property="og:description" content={description} />
	<!-- Twitter Metadata-->
	<meta property="twitter:url" content={page.url.href} />
	<meta property="twitter:title" content={page_title} />
	<meta property="twitter:description" content={description} />
</svelte:head>

<div class="flex flex-col items-start overflow-x-hidden md:mt-8 md:ml-5">
	<h1>DDC FastTrack 2026</h1>

	<p class="mt-3 mb-4 max-w-3xl">
		Challenge writeups for some of the challs I solved during the DDC FastTrack 2026 CTF. This is a
		work in progress, and I might be adding more details and writeups as I have time to do so.
	</p>

	<h2>Challenges</h2>
	<ul class="ml-5 list-disc">
		<!-- <li><a href="#youve-got-mail">Youve got mail!</a></li> -->
		<li><a href="#youve-got-mail-2">Youve got mail 2!</a></li>
		<li><a href="#windows-forensics-hell">Windows Forensics Hell</a></li>
	</ul>

	<!-- <h2 id="youve-got-mail" class="mt-8 mb-4 text-2xl font-bold">Youve got mail!</h2>
	<RevealSlides options={{ transition: 'convex' }} markdownContent={youveGotMail} /> -->

	<h2 id="youve-got-mail-2" class="mt-8 mb-4 text-2xl font-bold">Youve got mail 2!</h2>
	<RevealSlides options={{ transition: 'convex' }} markdownContent={youveGotMail2} />

	<h2 id="windows-forensics-hell" class="mt-8 mb-4 text-2xl font-bold">Windows Forensics Hell</h2>
	<RevealSlides options={{ transition: 'convex' }} markdownContent={windowsForensicsHell} />
</div>

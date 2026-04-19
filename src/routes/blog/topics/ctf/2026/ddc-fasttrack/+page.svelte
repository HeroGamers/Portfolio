<script>
	import RevealSlides from '$lib/components/RevealSlides.svelte';
	import BlogHeader from '$lib/components/BlogHeader.svelte';

	import youveGotMail2 from './youve-got-mail-2.md?raw';
	import windowsForensicsHell from './windows-forensics-hell.md?raw';

	const description =
		'Challenge writeups and solutions from the DDC FastTrack 2026 CTF competition.';
	const page_title = 'Blog - CTFs - DDC FastTrack 2026';
</script>

<svelte:head>
	<title>Hero - {page_title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={page_title} />
	<meta property="og:description" content={description} />
	<meta property="twitter:title" content={page_title} />
	<meta property="twitter:description" content={description} />
</svelte:head>

<BlogHeader
	title="DDC FastTrack 2026"
	description="Challenge writeups for some of the challenges I solved during the DDC FastTrack 2026 CTF competition. This is a work in progress."
	backLink="/blog/topics/ctf"
	backText="Back to CTF Writeups"
	id="ddc-fasttrack"
>
	<div class="mt-6 w-full">
		<h5 class="mb-4">Challenges</h5>
		<nav class="flex flex-col gap-2">
			<a
				href="#youve-got-mail-2"
				class="text-sm font-medium text-purple-400 transition hover:text-purple-300"
				>→ Youve got mail 2!</a
			>
			<a
				href="#windows-forensics-hell"
				class="text-sm font-medium text-purple-400 transition hover:text-purple-300"
				>→ Windows Forensics Hell</a
			>
		</nav>
	</div>

	<h2 id="youve-got-mail-2" class="mt-12 mb-6 border-t border-white/10 pt-8 text-2xl font-semibold">
		Youve got mail 2!
	</h2>
	<RevealSlides options={{ transition: 'convex' }} markdownContent={youveGotMail2} />

	<h2
		id="windows-forensics-hell"
		class="mt-12 mb-6 border-t border-white/10 pt-8 text-2xl font-semibold"
	>
		Windows Forensics Hell
	</h2>
	<RevealSlides options={{ transition: 'convex' }} markdownContent={windowsForensicsHell} />
</BlogHeader>

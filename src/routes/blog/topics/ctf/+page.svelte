<script>
	import BlogHeader from '$lib/components/BlogHeader.svelte';

	const description = 'Solutions and writeups from various Capture The Flag competitions.';
	const page_title = 'Blog - CTFs';
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
	title="CTF Writeups"
	{description}
	backLink="/blog"
	backText="Back to Blog"
	id="ctf-blog"
>
	<div class="w-full">
		<h5 class="mb-4">2026</h5>
		<div class="flex w-full flex-col gap-3">
			<a
				href="/blog/topics/ctf/2026/ddc-fasttrack"
				class="card group flex w-full flex-col p-4 sm:p-5"
			>
				<h4 class="font-semibold transition-colors group-hover:text-purple-300">
					DDC FastTrack 2026
				</h4>
				<p class="mt-1 text-sm text-zinc-400">Challenge writeups and solutions</p>
			</a>
		</div>
	</div>
</BlogHeader>

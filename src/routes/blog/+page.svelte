<script>
	import { page } from '$app/state';
	import BlogHeader from '$lib/components/BlogHeader.svelte';

	const description =
		'Writeups, explorations, and infodumps about cybersecurity and CTF competitions.';
	const page_title = 'Blog';
</script>

<svelte:head>
	<title>Hero - {page_title}</title>
	<meta name="description" content={description} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:title" content={page_title} />
	<meta property="og:description" content={description} />
	<meta property="twitter:url" content={page.url.href} />
	<meta property="twitter:title" content={page_title} />
	<meta property="twitter:description" content={description} />
</svelte:head>

<BlogHeader title="Blog" {description} id="blog">
	<div class="w-full">
		<h5 class="mb-4">Topics</h5>
		<div class="flex w-full flex-col gap-3">
			<a href="/blog/topics/ctf" class="card group flex w-full flex-col p-4 sm:p-5">
				<h4 class="font-semibold transition-colors group-hover:text-purple-300">CTF Writeups</h4>
				<p class="mt-1 text-sm text-zinc-400">
					Solutions and writeups from Capture The Flag competitions
				</p>
			</a>
		</div>
	</div>
</BlogHeader>

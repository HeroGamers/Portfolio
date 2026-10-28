<script>
	import BlogHeader from '#lib/components/BlogHeader.svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<BlogHeader
	title="CTF Writeups"
	description={data.description}
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

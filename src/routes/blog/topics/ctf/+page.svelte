<script>
	import { page } from '$app/state';

	/** @type String */
	const description = 'Place for infodumping about CTFs :)';

	/**
	 * For holding the title of the current page, to use in various places.
	 * @type String
	 * */
	let page_title = 'Blog - CTFs';
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
	<h1>CTF Blog</h1>

	<h2>2026</h2>
	<ul class="ml-5 list-disc">
		<li><a href="/blog/topics/ctf/2026/ddc-fasttrack">CTF Writeup: DDC FastTrack 2026</a></li>
	</ul>
</div>

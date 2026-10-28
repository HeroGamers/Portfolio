<script>
	/** @type Date */
	export let date = new Date();
	/** @type String */
	export let project_name = 'Project Name';
	/** @type String */
	export let programming_language = 'Python';
	/** @type String */
	export let link = 'https://github.com/HeroGamers/Portfolio';
	/** @type String | null */
	export let description = null;

	import { formatDate } from '#lib/utils.js';
	import ArrowUpRight from '~icons/lucide/arrow-up-right';

	// Open off-site links in a new tab
	const external = /^https?:\/\//.test(link);
</script>

<div class="flex">
	<a
		class="card group flex w-full flex-col"
		href={link}
		target={external ? '_blank' : undefined}
		rel={external ? 'noreferrer' : undefined}
		title={project_name}
	>
		<p class="flex items-start justify-between gap-3 font-semibold">
			{project_name}
			<ArrowUpRight
				class="icon mt-1 size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
				aria-hidden="true"
			/>
		</p>
		{#if description != null}
			<p class="pt-2 text-zinc-200">{description}</p>
		{/if}
		<p class="hasDate pt-2 font-light">{programming_language} &bull; {formatDate(date)}</p>
	</a>
</div>

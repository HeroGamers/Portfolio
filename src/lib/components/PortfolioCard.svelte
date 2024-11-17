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

	import { formatDate } from '$lib/utils.js';
</script>

<div class="mx-3 flex w-full flex-col p-2 xl:mx-0 xl:w-1/2">
	<a class="card flex flex-col" href={link} target="_blank" title={project_name}>
		<p class="font-bold">{project_name}</p>
		{#if description != null}
			<p class="pt-2">{description}</p>
		{/if}
		<p class="hasDate pt-2 font-light">{programming_language} &bull; {formatDate(date)}</p>
	</a>
</div>

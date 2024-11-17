<script>
  /** @type Date */
  export let date = new Date();
  /** @type String */
  export let project_name = "Project Name";
  /** @type String */
  export let programming_language = "Python";
  /** @type String */
  export let link = "https://github.com/HeroGamers/Portfolio";
  /** @type String | null */
  export let description = null;

  import { formatDate } from "$lib/utils.js";
</script>

<div class="flex flex-col p-2 w-full xl:w-1/2 mx-3 xl:mx-0">
  <a class="flex flex-col card" href={link} target="_blank" title={project_name}>
    <p class="font-bold">{project_name}</p>
    {#if description != null}
      <p class="pt-2">{description}</p>
    {/if}
    <p class="font-light pt-2 hasDate">{programming_language} &bull; {formatDate(date)}</p>
  </a>
</div>

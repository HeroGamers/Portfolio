<script>
  /** @type Date */
  export let date = new Date();
  /** @type String */
  export let project_name = "Project Name";
  /** @type String */
  export let programming_language = "Python";
  /** @type String */
  export let link = "https://github.com/HeroGamers/Portfolio";
  /** @type String */
  export let description = null;

  import { getMonthString } from "./utils.js";
</script>

<div class="flex flex-col">
  <a class="flex flex-col p-2 card m-3" href={link}>
    <p class="font-bold">{project_name}</p>
    {#if description != null}
      <p class="pt-2">{description}</p>
    {/if}
    <p class="font-light pt-2">{programming_language} &bull; {getMonthString(date)} {date.getFullYear()}</p>
  </a>
</div>

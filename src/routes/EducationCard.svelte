<script>
  import DropDownIcon from "$lib/images/ChevronDownSolidSVG.svelte";

  /** @type Date */
  export let start_date = new Date();
  /** @type Date */
  export let end_date = null;
  /** @type String */
  export let school = "School";
  /** @type String */
  export let degree = "Degree";
  /** @type String */
  export let description = null;

  /** @type boolean */
  let expanded = false;

  /**
   * @type any
   */
  const toggleExpansion = () => {
    expanded = !expanded;
  }

  import { formatDate } from "./utils.js";
</script>

<div class="flex flex-col">
  <p class="pb-2 hasDate">{formatDate(start_date)} to {end_date != null ? formatDate(end_date) : "Present"}</p>
  <div class="flex flex-col ml-2 sm:ml-4 p-2 relative card" on:click={toggleExpansion} on:keydown={toggleExpansion} aria-expanded={expanded}>
    <div class="flex flex-row justify-between">
      <div class="flex flex-col max-w-[95%]">
        <p class="font-bold">{school}</p>
        <p class="font-light">{degree}</p>
      </div>
      <!-- absolute top-4 right-4 rotate-90 transition-transform h-7 w-7 dropdown -->
      <div class="rotate-90 transition-transform h-7 w-7 dropdown ml-3">
        <DropDownIcon />
      </div>
    </div>
    <div>
      {#if description != null}
        <p class="pt-2 card-expansion">{description}</p>
      {/if}
    </div>
  </div>
</div>

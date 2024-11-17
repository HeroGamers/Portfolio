<script>
  import DropDownIcon from "$lib/images/ChevronDownSolidSVG.svelte";

  /** @type Date */
  export let start_date = new Date();
  /** @type Date | null */
  export let end_date = null;
  /** @type String */
  export let school = "School";
  /** @type String */
  export let degree = "Degree";
  /** @type String | null */
  export let description = null;

  /** @type boolean */
  let expanded = false;

  /**
   * @param {MouseEvent | KeyboardEvent} event
   */
   const toggleExpansion = (event) => {
    // If the event is a keyboard event, check if the key is not "Enter" or " ", to prevent Tab from toggling the expansion
    if (event instanceof KeyboardEvent && event.key !== "Enter" && event.key !== " ") {
      return;
    }
    
    expanded = !expanded;
  }

  import { formatDate } from "$lib/utils.js";
</script>

<div class="flex flex-col">
  <p class="pb-2 hasDate">{start_date != null ? formatDate(start_date) : "Unknown"} to {end_date != null ? formatDate(end_date) : "Present"}</p>
  <div class="flex flex-col ml-2 sm:ml-4 p-2 relative card" on:click={toggleExpansion} on:keydown={toggleExpansion} aria-expanded={expanded} role="button" tabindex="0">
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

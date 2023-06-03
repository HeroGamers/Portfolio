<script>
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

  import { getMonthString } from "./utils.js";
</script>

<div class="flex flex-col">
  <p class="pb-2">{getMonthString(start_date)} {start_date.getFullYear()} to {end_date != null ? (getMonthString(end_date) + " " + end_date.getFullYear()) : "Present"}</p>
  <div class="flex flex-col ml-4 p-2 card">
    <p class="font-bold">{school}</p>
    <p class="font-light">{degree}</p>
    {#if description != null}
      <p class="italic">{description}</p>
    {/if}
  </div>
</div>

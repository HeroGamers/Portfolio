<script>
  import DropDownIcon from '$lib/images/ChevronDownSolidSVG.svelte';

  /** @type String */
  export let company = "Company Name";
  /** @type String */
  export let description = null;
  /** @type [{start_date: Date, end_date: Date, title: String, employment_type: String}] */
  export let functions = [{
    start_date: new Date(),
    end_date: null,
    title: "Software Engineer",
    employment_type: "Full-time"
  }];

  /** @type boolean */
  let expanded = false;

  /**
   * @type any
   */
  const toggleExpansion = () => {
    expanded = !expanded;
  }

  // Get the "newest" end date and the oldest start date for the entire company,
  // and check if employment types are equal
  /** @type Date */
  let oldest_start_date = undefined;
  /** @type Date */
  let newest_end_date = undefined;
  /** @type String */
  let employmentType = undefined;

  functions.forEach((func_at_company) => {
    if (employmentType === undefined) {
      employmentType = func_at_company.employment_type;
    }
    else if (employmentType !== func_at_company.employment_type) {
      employmentType = null;
    }

    if (oldest_start_date === undefined) {
      oldest_start_date = func_at_company.start_date;
    }
    else if (func_at_company.start_date === null && oldest_start_date !== null) {
      oldest_start_date = null;
    }
    else {
      if (func_at_company.start_date !== null && oldest_start_date !== null && (func_at_company.start_date.getTime() - oldest_start_date.getTime() < 0)) {
        oldest_start_date = func_at_company.start_date;
      }
    }

    if (newest_end_date === undefined) {
      if (func_at_company.end_date === undefined) {
        newest_end_date = null;
      }
      else {
        newest_end_date = func_at_company.end_date;
      }
    }
    else if (newest_end_date !== null) {
      if (func_at_company.end_date === null) {
        newest_end_date = null;
      }
      else if (newest_end_date.getTime() - func_at_company.end_date.getTime() < 0) {
        newest_end_date = func_at_company.end_date;
      }
    }
  });

  import { getMonthString } from "./utils.js";
</script>

<div class="flex flex-col">
  <p class="pb-2">{getMonthString(oldest_start_date)} {oldest_start_date.getFullYear()} to {newest_end_date != null ? (getMonthString(newest_end_date) + " " + newest_end_date.getFullYear()) : "Present"}</p>
  <div class="flex flex-col ml-4 p-2 relative card" on:click={toggleExpansion} on:keydown={toggleExpansion} aria-expanded={expanded}>
    <div class="flex flex-row justify-between">
      <div class="flex flex-col max-w-[95%]">
        <p class="font-bold">
          {company}
          {#if employmentType !== null}
            &bull; {employmentType}
          {/if}
        </p>
        {#each functions as func_at_company}
          <p class="font-medium">- {func_at_company.title} ({getMonthString(func_at_company.start_date)} {func_at_company.start_date.getFullYear()} to {func_at_company.end_date != null ? (getMonthString(func_at_company.end_date) + " " + func_at_company.end_date.getFullYear()) : "Present"})</p>
          {#if employmentType === null}
            <p class="font-light pl-2">- {func_at_company.employment_type}</p>
          {/if}
        {/each}
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

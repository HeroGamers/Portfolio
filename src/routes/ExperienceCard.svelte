<script>
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

  let oldest_start_date;
  let newest_end_date = new Date();

  functions.forEach((func_at_company) => {
    if (oldest_start_date == null && func_at_company.start_date != null) {
      oldest_start_date = func_at_company.start_date;
    }
    else {
      if (func_at_company.start_date - oldest_start_date < 0) {
        oldest_start_date = func_at_company.start_date;
      }
    }

    if (newest_end_date != null) {
      if (func_at_company.end_date == null) {
        newest_end_date = null;
      }
      else if (func_at_company.end_date - newest_end_date < 0) {
        newest_end_date = func_at_company.end_date;
      }
    }
  });

  import { getMonthString } from "./utils.js";
</script>

<div class="flex flex-col">
  <p class="pb-2">{getMonthString(oldest_start_date)} {oldest_start_date.getFullYear()} to {newest_end_date != null ? (getMonthString(newest_end_date) + " " + newest_end_date.getFullYear()) : "Present"}</p>
  <div class="flex flex-col ml-4 p-2 card">
    <p class="font-bold">{company}</p>
    {#each functions as func_at_company}
      <p class="font-medium">- {func_at_company.title}</p>
      <p class="font-light pl-2">- {func_at_company.employment_type}</p>
    {/each}
    {#if description != null}
      <p class="italic">{description}</p>
    {/if}
  </div>
</div>

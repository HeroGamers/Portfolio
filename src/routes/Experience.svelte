<script>
  import ExperienceCard from "./ExperienceCard.svelte";

  let experiences = [
    {
      company: "DSE - Students' Business Relations",
      functions: [
        {
          start_date: new Date("2021-08-01"),
          title: "IT Coordinator",
          employment_type: "Volunteer Work"
        }
      ]
    },
    {
      company: "DTU - Technical University of Denmark",
      functions: [
        {
          start_date: new Date("2021-08-01"),
          title: "IT Technician",
          employment_type: "Part-time"
        }
      ]
    }
  ]
</script>

<section id="experience" class="flex flex-col pt-10 items-start w-full max-w-5xl">
  <h5 class="font-medium">Experience</h5>
  <div class="flex flex-col w-full space-y-3 pl-6">
    {#each experiences as experience}
      <ExperienceCard {...experience} />
    {/each}
  </div>
</section>

<style lang="scss">
  section > div {
    border-left-width: 2px;
    border-left-color: $color-bg-top;
  }
</style>
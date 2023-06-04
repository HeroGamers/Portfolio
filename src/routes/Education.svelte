<script>
  import EducationCard from "./EducationCard.svelte";

  /** @type Object[] */
  let educations = [
    {
      start_date: new Date("2021-08-01"),
      school: "DTU - Technical University of Denmark",
      degree: "Bachelor of Engineering - BEng: Software Technology",
    },
    {
      start_date: new Date("2018-08-01"),
      end_date: new Date("2021-06-31"),
      school: "HTX Næstved",
      degree: "Higher Technical Examination Programme",
      description: "This is an Upper Secondary Education in Denmark, and my line of study was Computer Science."
    },
    {
      start_date: new Date("2008-08-01"),
      end_date: new Date("2018-06-31"),
      school: "Lille Næstved Skole",
      degree: "The Danish Folkeskole",
      description: "This is the Primary and Lower Secondary Education in Denmark."
    }
  ]
</script>

<section id="education" class="flex flex-col pt-10 items-start w-full max-w-5xl">
  <h5 class="font-medium">Education</h5>
  <div class="flex flex-col w-full space-y-3 pl-6">
    {#each educations as education (education.school)}
      <EducationCard {...education} />
    {/each}
  </div>
</section>

<style lang="scss">
  section > div {
    border-left-width: 2px;
    border-left-color: $color-bg-top;
  }
</style>
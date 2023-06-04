<script>
  import ExperienceCard from "./ExperienceCard.svelte";

  /** @type Object[] */
  let experiences = [
    {
      company: "DSE - Students' Business Relations",
      description: "Active Member of the non-profit non-political organization DSE, whose purpose is to help students" +
        " connect with companies. In the organization I'm the coordinator of our IT team, and member of the sales " +
        "team. I've previously been one of the main coordinators of our yearly fair, DSE Messe Lyngby.",
      functions: [
        {
          start_date: new Date("2023-04-01"),
          title: "IT Coordinator",
          employment_type: "Volunteer Work"
        },
        {
          start_date: new Date("2022-04-01"),
          title: "Salesperson",
          employment_type: "Volunteer Work"
        },
        {
          start_date: new Date("2022-06-01"),
          end_date: new Date("2023-04-31"),
          title: "Event Coordinator",
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
    },
    {
      company: "Modus Games",
      functions: [
        {
          start_date: new Date("2019-06-01"),
          title: "Playtester",
          employment_type: "Remote"
        }
      ]
    },
    {
      company: "BonBon-Land",
      functions: [
        {
          start_date: new Date("2018-04-01"),
          end_date: new Date("2021-09-31"),
          title: "Ride Operator",
          employment_type: "Summer Job"
        },
        {
          start_date: new Date("2017-06-01"),
          end_date: new Date("2021-09-31"),
          title: "Service Assistant",
          employment_type: "Summer Job"
        }
      ]
    },
    {
      company: "Herlufsholm Svømmeklub",
      functions: [
        {
          start_date: new Date("2018-08-01"),
          end_date: new Date("2021-07-31"),
          title: "Swim Coach",
          employment_type: "Part-time"
        },
        {
          start_date: new Date("2015-08-01"),
          end_date: new Date("2018-08-01"),
          title: "Assistant Swim Coach",
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
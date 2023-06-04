<script>
  import EducationCard from "./EducationCard.svelte";

  /** @type Object[] */
  let educations = [
    {
      start_date: new Date("2021-08-01"),
      school: "DTU - Technical University of Denmark",
      degree: "Bachelor of Engineering - BEng: Software Technology",
      description: "I have developed a strong ability to analyze problems, design solutions, and implement them in " +
        "practice. My education in software technology has given me a deep understanding in a wide range of topics " +
        "such as software processes, principles of data communication, and network security. I have also gained " +
        "practical experience with agile development methods like SCRUM and project management tools, which have " +
        "provided me with an efficient approach to project management and organization, ensuring the development of " +
        "high-quality solutions."
    },
    {
      start_date: new Date("2018-08-01"),
      end_date: new Date("2021-06-31"),
      school: "HTX Næstved",
      degree: "Higher Technical Examination Programme",
      description: "This is an Upper Secondary Education in Denmark, and my line of study was Computer Science. " +
        "I developed skills in computer science, digital design, and development, including designing and programming" +
        " a voice-controlled robot with AI in my third-year technical subject. As part of the mandatory Study Area " +
        "Project (SOP), I also developed an AI for chat moderation using TensorFlow Keras in Python. The AI was able " +
        "to assess whether chat messages had a good or bad intention (toxicity), which could be used to help " +
        "moderators on various chat forums."
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
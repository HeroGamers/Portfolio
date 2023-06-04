<script>
  import PortfolioCard from "./PortfolioCard.svelte";

  /** @type Object[] */
  let portfolioEntries = [
    {
      date: new Date("2023-06-03"),
      project_name: "Portfolio Website",
      programming_language: "Svelte",
      link: "https://github.com/HeroGamers/Portfolio",
      description: "This website, which is written in Svelte and replaces my old static portfolio website. Imagine " +
        "having developed full-stack web applications and still having a static portfolio website. Not me, anymore!"
    },
    {
      date: new Date("2020-08-31"),
      project_name: "HeroAI",
      programming_language: "Python",
      link: "https://github.com/HeroGamers/HeroAI",
      description: "An AI written using TensorFlow Keras performing text classification using sentiment analysis on " +
        "text messages, to determine whether messages were toxic."
    },
    {
      date: new Date("2021-03-15"),
      project_name: "Anihaven Frontend",
      programming_language: "Next.js",
      link: "https://github.com/Anihaven/anihaven-web",
      description: "A fully-fledged streaming website written in Next.js, made as a school project to try and " +
        "challenge myself and explore new technologies."
    },
    {
      date: new Date("2021-03-15"),
      project_name: "Anihaven Backend",
      programming_language: "GraphQL",
      link: "https://github.com/Anihaven/anihaven-api",
      description: "The backend for my fully-fledged streaming website, written in JavaScript with Koa and Apollo " +
        "GraphQL, serving content to the Next.js frontend, with the content being hosted on S3 buckets."
    },
    {
      date: new Date("2020-08-12"),
      project_name: "Project Nisseven",
      programming_language: "JavaScript",
      link: "https://github.com/HeroGamers/Nisseven",
      description: "A website based on a Danish school tradition during Christmas, where people can register and " +
        "get their very own Nisseven. It is essentially Secret Santa. The essential part of the project was the " +
        "security and encryption of others' Nissevenner / Secret Santa, and of course the login password."
    },
    {
      date: new Date("2019-08-10"),
      project_name: "MyDog",
      programming_language: "Java",
      link: "https://github.com/HeroGamers/MyDog",
      description: "A Minecraft plugin bringing much more functionality to tamed pets."
    },
  ]
</script>

<section id="portfolio" class="flex flex-col pt-10 items-start w-full">
  <h5 class="font-medium">Portfolio</h5>
  <div class="flex flex-col w-full portfolio-cards justify-start">
    {#each portfolioEntries as portfolioEntry}
      <PortfolioCard {...portfolioEntry} />
    {/each}
  </div>
</section>

<style lang="scss">
  .portfolio-cards {
    flex-flow: row wrap;
  }
</style>
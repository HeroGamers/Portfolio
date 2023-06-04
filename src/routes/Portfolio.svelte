<script>
  import PortfolioCard from "./PortfolioCard.svelte";

  /** @type Object[] */
  let portfolioEntries = [
    {
      date: new Date("2023-06-03"),
      project_name: "Portfolio Website",
      programming_language: "Svelte",
      link: "https://github.com/HeroGamers/Portfolio",
      description: "This website!"
    },
    {
      date: new Date("2019-08-10"),
      project_name: "MyDog",
      programming_language: "Java",
      link: "https://github.com/HeroGamers/MyDog",
      description: "A Minecraft plugin bringing much more functionality to tamed pets."
    },
    {
      date: new Date("2023-06-03"),
      project_name: "HeroAI",
      programming_language: "Python",
      link: "https://github.com/HeroGamers/HeroAI",
      description: "An AI written using TensorFlow Keras performing text classification using sentiment analysis on " +
        "text messages, to determine whether messages were toxic."
    },
    {
      date: new Date("2020-08-12"),
      project_name: "Project Nisseven",
      programming_language: "JavaScript",
      link: "https://github.com/HeroGamers/Nisseven",
      description: "A website based on a Danish school tradition during Christmas, where people can register and " +
        "get their very own Nisseven. It is essentially Secret Santa. The essential part of the project was the " +
        "security and encryption of others' Nissevenner / Secret Santa, and of course the login password."
    }
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
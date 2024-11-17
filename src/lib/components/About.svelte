<script>
  const birthdate = new Date("2002-03-26");
  // kudos to https://stackoverflow.com/a/24181701/12418245
  const ageDate = new Date(Date.now() - birthdate.getTime());
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
</script>

<section id="about" class="flex flex-col pt-10 items-start w-full max-w-5xl">
  <h5 class="font-medium">About me</h5>
  <p>
    Hi there, my name is Marcus, and I'm a {age} year old Software Engineering student at the Technical University of
    Denmark with a love for all things tech. I currently reside in Copenhagen, Denmark.
  </p>
  <p class="pt-2">
    I have always been fascinated by computers, and especially video games.
    This passion slowly grew into deep love for how software, websites and other feats were created,
    and as such I started creating simple websites and Minecraft Plugins, continuing to improve my skills and
    expand upon my knowledge and expertise.
  </p>
  <p class="pt-2">
    I have had the pleasure of working on lots of different projects, ranging from simple websites in plain HTML,
    to full-stack web applications and AI models with TensorFlow and PyTorch.
    This website is one of my little side-projects, and the primary objective is for it to function as a proper
    portfolio.
  </p>
</section>

<script>
	const birthdate = new Date('2002-03-26');
	// kudos to https://stackoverflow.com/a/24181701/12418245
	const ageDate = new Date(Date.now() - birthdate.getTime());
	const age = Math.abs(ageDate.getUTCFullYear() - 1970);
</script>

<section id="about" class="flex w-full flex-col items-center pt-10">
	<div class="flex max-w-5xl flex-col items-start">
		<h5 class="w-full text-center font-medium">About me</h5>
		<p>
			Hi there, my name is Marcus, and I'm a {age}-year-old Security Analyst currently working
			full-time in Cybersecurity while living in Copenhagen, Denmark. Starting next year, I'll be
			pursuing an
			<a href="https://www.en.aau.dk/education/master/cyber-security" rel="_blank"
				>MSc in Cyber Security</a
			>
			to deepen my expertise and expand my career in this dynamic field.
		</p>
		<p class="pt-2">
			My journey into tech began with a fascination for computers and video games, which evolved
			into a passion for understanding how systems are built and secured. I started by creating
			websites and Minecraft plugins, which later grew into developing full-stack applications and
			experimenting with AI models using TensorFlow and PyTorch. This natural curiosity eventually
			led me to focus on cybersecurity, where I thrive on solving complex challenges and protecting
			systems from threats.
		</p>
		<p class="pt-2">
			I've worked on a variety of projects, from enhancing security tools and workflows in
			professional settings to participating in Capture the Flag (CTF) competitions with
			Kalmarunionen, which sharpen my practical skills and problem-solving abilities. This website
			serves as a portfolio showcasing my journey and accomplishments in technology and
			cybersecurity.
		</p>
	</div>
</section>

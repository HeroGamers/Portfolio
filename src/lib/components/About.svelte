<script>
	import { fly } from 'svelte/transition';
	const birthdate = new Date('2002-03-26');
	// kudos to https://stackoverflow.com/a/24181701/12418245
	const ageDate = new Date(Date.now() - birthdate.getTime());
	const age = Math.abs(ageDate.getUTCFullYear() - 1970);
</script>

<section id="about" class="flex w-full flex-col items-start" in:fly={{ y: 12, duration: 700 }}>
	<h5 class="font-medium">About me</h5>
	<div class="flex flex-col items-start px-1 sm:px-4">
		<p>
			I'm Marcus, though most people know me as Hero. I'm a {age}-year-old SOC analyst at TDC
			Erhverv in Copenhagen, working on incident response, threat hunting and detection engineering,
			while finishing an
			<a
				href="https://www.en.aau.dk/education/master/cyber-security"
				target="_blank"
				rel="noreferrer">MSc in Cyber Security</a
			>
			at Aalborg University.
		</p>
		<p class="pt-2">
			I got into tech through computers and video games, building websites and Minecraft plugins
			before moving on to full-stack applications and, well before LLMs took off, training my own
			machine learning models with TensorFlow. Wanting to understand how systems break eventually
			pulled me toward security.
		</p>
		<p class="pt-2">
			I believe you defend systems best when you understand how they're attacked, which is why I
			took the OSCP+ alongside my defensive work. Most of my offensive practice happens in Capture
			the Flag (CTF) competitions with
			<a href="https://kalmarunionen.dk" target="_blank" rel="noreferrer">Kalmarunionen</a>, a team
			long known for competing at the very top, where I also sit on the board.
		</p>
	</div>
</section>

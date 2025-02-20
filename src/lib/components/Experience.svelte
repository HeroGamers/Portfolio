<script>
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';

	/** @type Array<{company: String, description: String, functions: Array<{start_date: Date, end_date: Date | null, title: String, employment_type: String}>}> */
	let experiences = [
		{
			company: 'TDC Erhverv',
			description:
				'At TDC Erhverv, I gained extensive experience in cybersecurity operations through both my roles as a SOC Analyst and SOC Intern. ' +
				'I analyzed complex security incidents, supported Managed Detection and Response (MDR) using SIEM, and developed use cases and detection rules ' +
				'to enhance monitoring capabilities. I optimized workflows by improving SOAR automation, co-managed anti-DDoS solutions, ' +
				'and developed and refined security tools. My responsibilities also included conducting proactive threat hunting, ' +
				'integrating threat intelligence into operations, and coordinating effective incident response plans. ' +
				'Additionally, I engaged with the cybersecurity community by participating in conferences and industry events, ' +
				'further expanding my knowledge and expertise in the field.',
			functions: [
				{
					start_date: new Date('2024-07-01'),
					end_date: null,
					title: 'Security Operations Center Analyst',
					employment_type: 'Full-time'
				},
				{
					start_date: new Date('2024-02-01'),
					end_date: new Date('2024-07-01'),
					title: 'Security Operations Center Intern',
					employment_type: 'Internship'
				}
			]
		},
		{
			company: 'Kalmarunionen',
			description:
				'Team member of the CTF (Capture The Flag) team, Kalmarunionen. ' +
				'CTF is a cybersecurity competition that is used to test and develop computer security skills.',
			functions: [
				{
					start_date: new Date('2024-03-01'),
					end_date: null,
					title: 'CTF Player',
					employment_type: 'Volunteer Work'
				}
			]
		},
		{
			company: "DSE - Students' Business Relations",
			description:
				'Active Member of the non-profit non-political organization DSE, whose purpose is to help students' +
				' connect with companies. As a system administrator and developer, I have been responsible for maintaining ' +
				'and developing both new and existing systems in DSE, which has given me the ability to understand, enhance,' +
				' and refactor code created by previous members. As an event coordinator, I was part of a team of six people' +
				' where we coordinated the DSE Messe Lyngby 2023, the largest job and career fair for engineering students' +
				' in Denmark. This provided me with experiences in various areas such as logistics, design, and teamwork.' +
				" I have also worked as a sales representative, selling DSE's products through telephone, email, and " +
				'in-person interactions, which has given me experience in sales and communication with customers.',
			functions: [
				{
					start_date: new Date('2023-04-01'),
					end_date: null,
					title: 'IT Coordinator',
					employment_type: 'Volunteer Work'
				},
				{
					start_date: new Date('2022-04-01'),
					end_date: new Date('2024-11-01'),
					title: 'Salesperson',
					employment_type: 'Volunteer Work'
				},
				{
					start_date: new Date('2022-06-01'),
					end_date: new Date('2023-04-30'),
					title: 'Event Coordinator',
					employment_type: 'Volunteer Work'
				},
				{
					start_date: new Date('2022-02-01'),
					end_date: new Date('2023-04-01'),
					title: 'IT Staff',
					employment_type: 'Volunteer Work'
				}
			]
		},
		{
			company: 'DTU - Technical University of Denmark',
			description:
				'My primary responsibilities were to provide technical support to both students and staff, ' +
				'including setting up and distributing IT equipment, as well as organizing and structuring the support ' +
				'inventory. Additionally, I performed IT support during exams to ensure that all technical equipment was ' +
				'functioning correctly.',
			functions: [
				{
					start_date: new Date('2021-08-01'),
					end_date: new Date('2023-09-01'),
					title: 'IT Technician',
					employment_type: 'Part-time'
				}
			]
		},
		{
			company: 'Modus Games',
			description:
				'Playtesting of games such as Soulstice, Projekt Z, Ary and the Secret of Seasons, Remothered: ' +
				'Broken Porcelain, In Sound Mind, Trine 4, Lost Words: Beyond the Page, and more.',
			functions: [
				{
					start_date: new Date('2019-06-01'),
					end_date: null,
					title: 'Playtester',
					employment_type: 'Remote'
				}
			]
		},
		{
			company: 'BonBon-Land',
			description:
				"I was responsible for the operation of the park's attractions. Here, I developed skills in " +
				'teamwork and in adhering to various procedures and safety standards, which I have been able to apply in ' +
				'my role as a software engineer.',
			functions: [
				{
					start_date: new Date('2018-04-01'),
					end_date: new Date('2021-09-30'),
					title: 'Ride Operator',
					employment_type: 'Summer Job'
				},
				{
					start_date: new Date('2017-06-01'),
					end_date: new Date('2021-09-30'),
					title: 'Service Assistant',
					employment_type: 'Summer Job'
				}
			]
		},
		{
			company: 'Herlufsholm Svømmeklub',
			description:
				'I was responsible for teaching children different swimming styles and ensuring their safety in ' +
				'the swimming pool, which has given me skills in instructing and guiding others, as well as being responsible' +
				' for the safety of others. I have transferred these skills to situations where it is important to work in ' +
				'teams and communicate effectively with colleagues and customers, where it is also important to adapt to ' +
				'different skill levels and have patience.',
			functions: [
				{
					start_date: new Date('2018-08-01'),
					end_date: new Date('2021-07-31'),
					title: 'Swim Coach',
					employment_type: 'Part-time'
				},
				{
					start_date: new Date('2015-08-01'),
					end_date: new Date('2018-08-01'),
					title: 'Assistant Swim Coach',
					employment_type: 'Part-time'
				}
			]
		}
	];
</script>

<section id="experience" class="flex w-full max-w-5xl flex-col items-start pt-10">
	<h5 class="font-medium">Experience</h5>
	<div class="flex w-full flex-col space-y-3 px-2 sm:px-6">
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

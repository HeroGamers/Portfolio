import resume from '#lib/resume.yaml';

/**
 * Parse an optional JSON Resume date (YYYY, YYYY-MM or YYYY-MM-DD)
 * @param {string | undefined} date
 * @returns {Date | null}
 */
const toDate = (date) => (date ? new Date(date) : null);

/**
 * Parse a required JSON Resume date, failing the build if it is missing
 * @param {string | undefined} date
 * @param {string} entry description of the entry, for the error message
 * @returns {Date}
 */
const requireDate = (date, entry) => {
	if (!date) throw new Error(`resume.yaml: missing date for ${entry}`);
	return new Date(date);
};

/**
 * Group positions by company/organization, keeping file order.
 * The first position listed for a company provides the card description.
 * @param {Array<{company: string, summary?: string, start_date: Date, end_date: Date | null, title: string, employment_type: string}>} positions
 */
const groupByCompany = (positions) => {
	/** @type {Map<string, {company: string, description: string | null, functions: Array<{start_date: Date, end_date: Date | null, title: string, employment_type: string}>}>} */
	const companies = new Map();

	for (const { company, summary, ...func } of positions) {
		if (!companies.has(company)) {
			companies.set(company, { company, description: summary ?? null, functions: [] });
		}
		companies.get(company)?.functions.push(func);
	}

	return [...companies.values()];
};

export const experiences = groupByCompany([
	...(resume.work ?? []).map((/** @type {any} */ work) => ({
		company: work.name,
		summary: work.summary,
		start_date: requireDate(work.startDate, `${work.name} - ${work.position}`),
		end_date: toDate(work.endDate),
		title: work.position,
		employment_type: work.custom?.portfolio?.employmentType ?? 'Full-time'
	})),
	...(resume.volunteer ?? []).map((/** @type {any} */ volunteer) => ({
		company: volunteer.organization,
		summary: volunteer.summary,
		start_date: requireDate(
			volunteer.startDate,
			`${volunteer.organization} - ${volunteer.position}`
		),
		end_date: toDate(volunteer.endDate),
		title: volunteer.position,
		employment_type: 'Volunteer Work'
	}))
]);

export const educations = (resume.education ?? []).map((/** @type {any} */ education) => ({
	start_date: requireDate(education.startDate, education.institution),
	end_date: toDate(education.endDate),
	school: education.institution,
	degree: [education.studyType, education.area].filter(Boolean).join(': '),
	description: education.summary ?? null
}));

/**
 * Whether a certificate is hidden because the certificate superseding it is still valid
 * @param {any} certificate
 * @returns {boolean}
 */
const isSuperseded = (certificate) => {
	const supersededBy = certificate.custom?.portfolio?.supersededBy;
	if (!supersededBy) return false;

	const successor = (resume.certificates ?? []).find(
		(/** @type {any} */ other) => other.name === supersededBy
	);
	if (!successor) {
		throw new Error(`resume.yaml: ${certificate.name} is superseded by unknown ${supersededBy}`);
	}

	const expiry = toDate(successor.expiryDate);
	return expiry == null || expiry.getTime() > Date.now();
};

export const certificates = (resume.certificates ?? [])
	.filter((/** @type {any} */ certificate) => !isSuperseded(certificate))
	.map((/** @type {any} */ certificate) => ({
		name: certificate.name,
		issuer: certificate.issuer,
		issue_date: toDate(certificate.date),
		expiry_date: toDate(certificate.expiryDate),
		credential_id: certificate.credentialId ?? null,
		link: certificate.url ?? null,
		description: certificate.summary ?? null
	}));

export const projects = (resume.projects ?? []).map((/** @type {any} */ project) => ({
	date: requireDate(project.startDate, project.name),
	project_name: project.name,
	programming_language: project.keywords?.[0] ?? '',
	link: project.url,
	description: project.description ?? null
}));

export default resume;

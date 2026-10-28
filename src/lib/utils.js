/**
 * Function to format date to month and year
 * @param {Date} date
 * @returns {string} formatted date
 * @example formatDate(new Date("2021-01-01")) // January 2021
 * @example formatDate(new Date("2021-12-01")) // December 2021
 *
 */
export const formatDate = (date) => {
	return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

/**
 * Function to format the duration between two dates, in months below a year
 * and otherwise in years rounded to the nearest half-year
 * @param {Date} start
 * @param {Date} end
 * @returns {string} formatted duration
 * @example formatDuration(new Date("2023-08-01"), new Date("2024-01-01")) // 5 months
 * @example formatDuration(new Date("2021-08-01"), new Date("2025-02-05")) // 3.5 years
 */
export const formatDuration = (start, end) => {
	const months = Math.max(
		1,
		(end.getUTCFullYear() - start.getUTCFullYear()) * 12 + (end.getUTCMonth() - start.getUTCMonth())
	);
	if (months < 12) {
		return months === 1 ? '1 month' : `${months} months`;
	}

	const years = Math.round(months / 6) / 2;
	return years === 1 ? '1 year' : `${years} years`;
};

/**
 * Function to format a date range with its duration; a missing end date means ongoing
 * @param {Date} start
 * @param {Date | null} end
 * @returns {string} formatted date range
 * @example formatDateRange(new Date("2024-02-01"), new Date("2024-07-01")) // February 2024 to July 2024 (5 months)
 */
export const formatDateRange = (start, end) => {
	const endText = end != null ? formatDate(end) : 'Present';
	return `${formatDate(start)} to ${endText} (${formatDuration(start, end ?? new Date())})`;
};

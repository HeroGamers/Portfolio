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

const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;

/**
 * Function to calculate rounded years between two dates to nearest half-year
 * @param {Date} start
 * @param {Date} end
 * @returns {number} rounded years in 0.5 increments
 */
export const durationInHalfYears = (start, end) => {
	const years = (end.getTime() - start.getTime()) / millisecondsPerYear;
	return Math.round(years * 2) / 2;
};

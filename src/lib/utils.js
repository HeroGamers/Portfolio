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

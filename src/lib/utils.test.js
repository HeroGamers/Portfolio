import { expect, test } from 'vitest';
import { formatDate, formatDateRange, formatDuration } from './utils.js';

test('formatDate formats date correctly', () => {
	const date1 = new Date('2021-01-01');
	const date2 = new Date('2021-12-01');
	expect(formatDate(date1)).toBe('January 2021');
	expect(formatDate(date2)).toBe('December 2021');
});

test('formatDuration uses months below a year and half-years above', () => {
	expect(formatDuration(new Date('2024-02-01'), new Date('2024-03-01'))).toBe('1 month');
	expect(formatDuration(new Date('2023-08-01'), new Date('2024-01-01'))).toBe('5 months');
	expect(formatDuration(new Date('2024-01-01'), new Date('2025-01-01'))).toBe('1 year');
	expect(formatDuration(new Date('2021-08-01'), new Date('2025-02-05'))).toBe('3.5 years');
});

test('formatDateRange shows the duration, also for ongoing ranges', () => {
	expect(formatDateRange(new Date('2024-02-01'), new Date('2024-07-01'))).toBe(
		'February 2024 to July 2024 (5 months)'
	);
	expect(formatDateRange(new Date('2024-02-01'), null)).toMatch(
		/^February 2024 to Present \(\d+(\.5)? (months?|years?)\)$/
	);
});

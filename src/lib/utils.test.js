import { expect, test } from 'vitest';
import { formatDate } from './utils.js';

test('formatDate formats date correctly', () => {
	const date1 = new Date('2021-01-01');
	const date2 = new Date('2021-12-01');
	expect(formatDate(date1)).toBe('January 2021');
	expect(formatDate(date2)).toBe('December 2021');
});

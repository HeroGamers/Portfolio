import { afterEach, expect, test, vi } from 'vitest';
import { validate } from '@jsonresume/schema';
import resume from './resume.yaml';

afterEach(() => {
	vi.useRealTimers();
	vi.resetModules();
});

test('resume.yaml is a valid JSON Resume', async () => {
	const errors = await new Promise((resolve) => validate(resume, resolve));
	expect(errors).toBeNull();
});

/** @param {string} now */
const certificateNamesAt = async (now) => {
	vi.useFakeTimers({ now: new Date(now) });
	const { certificates } = await import('./resume.js');
	return certificates.map((/** @type {{ name: string }} */ certificate) => certificate.name);
};

test('OSCP is hidden while the OSCP+ is valid', async () => {
	const names = await certificateNamesAt('2026-10-29');
	expect(names).toContain('OffSec Certified Professional+ (OSCP+)');
	expect(names).not.toContain('OffSec Certified Professional (OSCP)');
});

test('OSCP is shown once the OSCP+ has expired', async () => {
	const names = await certificateNamesAt('2029-08-01');
	expect(names).toContain('OffSec Certified Professional (OSCP)');
});

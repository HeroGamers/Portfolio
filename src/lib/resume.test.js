import { expect, test } from 'vitest';
import { validate } from '@jsonresume/schema';
import resume from './resume.yaml';

test('resume.yaml is a valid JSON Resume', async () => {
	const errors = await new Promise((resolve) => validate(resume, resolve));
	expect(errors).toBeNull();
});

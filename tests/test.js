import { expect, test } from '@playwright/test';

test('Home section exists', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'An Aspiring Developer' })).toBeVisible();
});
test('About section exists', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'About me' })).toBeVisible();
});
test('Experience section exists', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible();
});
test('Education section exists', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible();
});
test('Portfolio section exists', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Portfolio' })).toBeVisible();
});
test('Contact section exists', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();
});

test('Navbar Scroll Indicator', async ({ page }) => {
	await page.goto('#portfolio');
	await expect(page.getByTestId('portfolio-navbar')).toHaveAttribute('aria-current', 'page');
});

test('Valid dates', async ({ page }) => {
	await page.goto('/');
	const dates = await page.$$('.hasDate');
	for (const date of dates) {
		const elementText = await date.textContent();
		expect(elementText.toLowerCase()).not.toContain('nan');
		expect(elementText.toLowerCase()).not.toContain('invalid date');
		// this cannot check for 'carryover' months
	}
});

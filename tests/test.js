import { expect, test } from '@playwright/test';

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
		expect(elementText).not.toBeNull();
		if (elementText) {
			expect(elementText.toLowerCase()).not.toContain('nan');
			expect(elementText.toLowerCase()).not.toContain('invalid date');
		}
		// this cannot check for 'carryover' months
	}
});

test('Title updates on client-side navigation', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle('Hero - Cybersecurity Enthusiast');

	await page.getByRole('link', { name: 'Blog' }).first().click();
	await expect(page).toHaveTitle('Hero - Blog');

	await page.goBack();
	await expect(page).toHaveTitle('Hero - Cybersecurity Enthusiast');

	await page.goto('/blog');
	await page.getByRole('link', { name: 'Home' }).first().click();
	await expect(page).toHaveTitle('Hero - Cybersecurity Enthusiast');
});

test('Blog pages have a single description', async ({ page }) => {
	await page.goto('/blog');
	await expect(page.locator('meta[name="description"]')).toHaveCount(1);
	await expect(page.locator('meta[name="description"]')).toHaveAttribute(
		'content',
		'Writeups, explorations, and infodumps about cybersecurity and CTF competitions.'
	);
});

const { test, expect } = require('@playwright/test');

const pages = [
  { path: '/', label: 'Home' },
  { path: '/features/', label: 'Features' },
  { path: '/pricing/', label: 'Pricing' },
  { path: '/services/', label: 'Services' },
  { path: '/downloads/', label: 'Downloads' },
];

const placeholderPages = ['/features/', '/pricing/', '/downloads/'];

for (const { path, label } of pages) {
  test(`${label} page: header and footer inject`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('#site-header .nav__brand')).toBeVisible();
    await expect(page.locator('#site-footer .footer__copyright')).toBeVisible();
  });

  test(`${label} page: only the ${label} nav link is active`, async ({ page }) => {
    await page.goto(path);
    const activeLinks = page.locator('.nav__link--active');
    await expect(activeLinks).toHaveCount(1);
    await expect(activeLinks).toHaveText(label);
  });

  test(`${label} page: no console errors`, async ({ page }) => {
    // The Cloudflare analytics beacon is a third-party script outside this site's control;
    // its reachability isn't what this test verifies (our own include.js/injection logic is),
    // and its failure mode varies by environment (blocked, CORS, timeout). Stub it with an
    // empty, successful response so its own network calls never run and never log errors.
    await page.route('https://static.cloudflareinsights.com/**', (route) =>
      route.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
    );

    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    await page.goto(path);
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
}

for (const path of placeholderPages) {
  test(`${path} shows a placeholder notice`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('.placeholder-notice')).toBeVisible();
  });
}

test('mobile hamburger menu opens and closes', async ({ page }) => {
  await page.setViewportSize({ width: 480, height: 800 });
  await page.goto('/');

  const toggle = page.locator('.nav__toggle');
  const links = page.locator('#primary-nav');

  await expect(toggle).toBeVisible();
  await expect(links).not.toHaveClass(/nav__links--open/);

  await toggle.click();
  await expect(links).toHaveClass(/nav__links--open/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');

  await toggle.click();
  await expect(links).not.toHaveClass(/nav__links--open/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

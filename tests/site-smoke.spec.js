const { test, expect } = require("@playwright/test");

test.use({ storageState: undefined });

test("IIS site is reachable", async ({ page }, testInfo) => {
  const response = await page.goto(testInfo.project.use.baseURL);

  expect(response).not.toBeNull();
  expect(response.status()).toBe(200);
  await expect(page).toHaveTitle(/.+/);
});

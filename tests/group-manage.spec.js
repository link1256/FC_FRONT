const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const authFile = path.join(__dirname, "..", "playwright", ".auth", "user.json");

test("function group can expand and collapse", async ({ page }, testInfo) => {
  test.skip(!fs.existsSync(authFile), "Run `npm run test:e2e:auth` to save an authenticated session first.");

  await page.goto(testInfo.project.use.baseURL);

  if (page.url().includes("auth_page")) {
    throw new Error("Authentication is required. Run `npm run test:e2e:auth`, sign in, then close the browser window.");
  }

  await page.locator(".function_bt_f").first().click();
  await expect(page.locator("#dropdowntrig")).toBeVisible();

  await page.locator("#dropdowntrig").click();
  await page.locator('[data-csp-onclick*="group_manage"]').click();

  const expandButton = page.locator(".sys_group_first_vect").first();
  await expect(expandButton).toBeVisible();

  const groupIndex = await expandButton.getAttribute("data-group-index");
  expect(groupIndex).not.toBeNull();

  const childRows = page.locator(`.child_${groupIndex}`);
  await expect(childRows.first()).toBeHidden();

  await expandButton.click();
  await expect(expandButton).toHaveAttribute("aria-expanded", "true");
  await expect(childRows.first()).toBeVisible();

  await expandButton.click();
  await expect(expandButton).toHaveAttribute("aria-expanded", "false");
  await expect(childRows.first()).toBeHidden();
});

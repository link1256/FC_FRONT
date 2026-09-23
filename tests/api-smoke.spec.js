const { test, expect } = require("@playwright/test");

const apiBaseURL = process.env.PLAYWRIGHT_API_BASE_URL || "http://localhost/Cadastral/api/";

test("backend API is reachable", async ({ request }) => {
  const response = await request.post(new URL("UserAccount/GetVersion", apiBaseURL).toString());

  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.isSuccess).toBe(true);
  expect(body.data).toBeTruthy();
});

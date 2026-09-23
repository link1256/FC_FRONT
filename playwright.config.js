const fs = require("fs");
const path = require("path");
const { defineConfig, devices } = require("@playwright/test");

const authFile = path.join(__dirname, "playwright", ".auth", "user.json");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost/Forest_ca/",
    storageState: !process.env.PLAYWRIGHT_NO_AUTH && fs.existsSync(authFile) ? authFile : undefined,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});

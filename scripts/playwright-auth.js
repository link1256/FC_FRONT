const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const authDir = path.join(projectRoot, "playwright", ".auth");
const authFile = path.join(authDir, "user.json");
const loginUrl = new URL(
  "auth_page.html",
  process.env.PLAYWRIGHT_BASE_URL || "http://localhost/Forest_ca/"
).toString();

fs.mkdirSync(authDir, { recursive: true });

const result = spawnSync(
  process.execPath,
  [require.resolve("playwright/cli"), "codegen", `--save-storage=${authFile}`, loginUrl],
  { cwd: projectRoot, stdio: "inherit" }
);

process.exit(result.status === null ? 1 : result.status);

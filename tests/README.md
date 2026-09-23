# Playwright E2E tests

The tests target these IIS applications by default:

- Frontend: `http://localhost/Forest_ca/`
- Backend API: `http://localhost/Cadastral/api/`

## First-time setup

```powershell
npm install
npx playwright install chromium
```

## Save an authenticated session

The site uses a CAPTCHA, so authentication is captured interactively:

```powershell
npm run test:e2e:auth
```

Sign in in the opened browser. After the application home page appears, close the browser window. Playwright saves the session to `playwright/.auth/user.json`, which is excluded from Git.

## Run tests

```powershell
npm run test:e2e
npm run test:e2e:headed
npm run test:e2e:ui
```

Set `PLAYWRIGHT_BASE_URL` or `PLAYWRIGHT_API_BASE_URL` to test another deployment. Set `PLAYWRIGHT_NO_AUTH=1` to run only tests that do not require the saved session.

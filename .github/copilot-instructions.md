<!-- Copilot / AI agent instructions for the Taggbox automation repo -->
# Copilot Instructions — Taggbox Automation

Purpose: give an AI coding assistant the minimal, high-value context to be immediately productive in this repo.

Quick start (local)
- Install deps: `npm install` — see [package.json](package.json).
- Run full test suite: `npx playwright test` (tests live in `tests/`).
- Run a folder or single test: `npx playwright test tests/<path>` (CI runs `tests/socialwalls/socialfeeds`).
- Run headed for visual debugging: `npx playwright test --headed`.
- Deploy report (Netlify): `npm run deploy-report` or `npm run deploy-report:prod` (see [package.json](package.json) and [Jenkinsfile](Jenkinsfile)).

Key configuration & workflows
- Playwright config: [playwright.config.js](playwright.config.js) — important values: `testDir: './tests'`, `workers: 1`, `retries: 1`, `reporter: [['html']]`, `baseURL: 'https://app.taggbox.com'`.
- HTML report output: `playwright-report/` (CI deploys that directory to Netlify in `Jenkinsfile`).
- CI usage: `Jenkinsfile` runs `npx playwright test tests/socialwalls/socialfeeds` then deploys `playwright-report` to Netlify.

Environment & credentials
- Tests expect a `.env` file; fixtures call `dotenv.config()` (see [tests/fixtures.js](tests/fixtures.js) and other `*fixtures.js`).
- `ENV` controls which login payload is used (values: `live`, `test`) — set before running, e.g. `ENV=test npx playwright test`.

API helpers & fixtures
- `tests/fixtures.js` (and per-suite fixtures) create `apiContext`, obtain `token`, and compute `wallId` via `APiUtils`.
- Core helper: [utils/APiUtils.js](utils/APiUtils.js) — contains `getToken()` and `getWallId()` used throughout tests. Read before changing auth/network logic.

Navigation & page patterns
- Page objects live under `pageobjects/<feature>/` (e.g., [pageobjects/content/AddUpdateDeleteGallery.js](pageobjects/content/AddUpdateDeleteGallery.js)). Tests import and use these pageobjects; follow the existing naming/placement convention.
- URL helpers: [utils/constants.js](utils/constants.js) exports `FEED_PATH` functions used by tests to navigate to feed pages.

Project-specific conventions & gotchas
- Mixed module styles are present: tests and Playwright config use ESM-style `import`/`export default`, but some helpers use `module.exports`. When editing, be conservative — do not change export style unless you update all import sites.
- Tests rely on `baseURL` + `FEED_PATH(wallId)` for navigation; avoid hardcoding alternate origins.
- `playwright.config.js` sets `headless` by detecting `--headed` in `process.argv` — use that flag for deterministic headful runs.

When making changes
- Read these files first: [playwright.config.js](playwright.config.js), [tests/fixtures.js](tests/fixtures.js), [utils/APiUtils.js](utils/APiUtils.js), [utils/constants.js](utils/constants.js), [Jenkinsfile](Jenkinsfile), [package.json](package.json).
- Preserve API payload shapes used in `tests/fixtures.js` and `utils/APiUtils.js`.
- Keep Playwright `workers` and `retries` settings in mind when debugging flaky tests.

Examples (copyable)
- Run a single suite (headed):

```bash
ENV=test npx playwright test tests/socialwalls/socialfeeds --headed
```

- Deploy the HTML report locally (Netlify auth must be set via env or `package.json` script):

```bash
npm run deploy-report
```

If something's unclear
- Ask which area to dig into (fixtures/auth, a specific pageobject, CI deploy). Provide the failing test path and recent run logs for fastest help.

End of file.

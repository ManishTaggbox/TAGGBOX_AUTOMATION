<!-- Copilot / AI agent instructions for the Taggbox automation repo -->
# Copilot Instructions — Taggbox Automation

Purpose: give an AI coding assistant the minimal, high-value context to be immediately productive in this repo.

**Quick Start (local)**
- **Install deps:** `npm install` — see [package.json](package.json).
- **Run all tests:** `npx playwright test` (tests live in [tests/](tests/)).
- **Run a folder/single test:** `npx playwright test tests/<path>` (CI runs `tests/socialwalls/socialfeeds`).
- **Headed mode (visual):** `npx playwright test --headed`.
- **Deploy HTML report:** `npm run deploy-report` or `npm run deploy-report:prod` (see [package.json](package.json) & [Jenkinsfile](Jenkinsfile)).

**Architecture Overview**
- **Tests:** located under [tests/](tests/) and organized by feature (e.g., `socialwalls`, `login`).
- **Page objects:** encapsulated UI interactions live in [pageobjects/](pageobjects/) grouped by feature — e.g. [pageobjects/content/AddUpdateDeleteGallery.js](pageobjects/content/AddUpdateDeleteGallery.js).
- **Helpers & API utilities:** [utils/APiUtils.js](utils/APiUtils.js) handles API token/wallId creation; [utils/constants.js](utils/constants.js) holds path helpers.
- **Test runner config:** [playwright.config.js](playwright.config.js) sets `baseURL`, `testDir`, `workers`, `retries`, reporter, and headless behavior.

**Critical Workflows & Commands**
- Local test run (single suite): `ENV=test npx playwright test tests/socialwalls/socialfeeds --headed`.
- Run a single test file: `npx playwright test tests/<suite>/<file>.spec.js`.
- Reproduce CI run locally: run the same test path executed in [Jenkinsfile](Jenkinsfile).
- View generated HTML report: open `playwright-report/index.html` after a run.

**Patterns & Conventions (repo-specific)**
- **Mixed module styles:** Playwright tests and config use ESM `import`/`export default`; many pageobjects/utilities use CommonJS `module.exports`. Do not convert styles without fixing all import sites.
- **Fixtures & env:** Tests call `dotenv.config()` (see [tests/fixtures.js](tests/fixtures.js)). Provide a `.env` file; `ENV` picks the login payload (`live` or `test`).
- **API-first test setup:** Fixtures create `apiContext`, obtain `token`, and compute `wallId` via `APiUtils.getToken()` / `getWallId()` — changing these affects large parts of the suite.
- **Pageobject naming:** Files are named for feature + action, e.g. `AddUpdateDeleteGallery.js`. Reuse pageobject methods instead of duplicating selectors.

**Integration Points & CI**
- **Base URL & navigation:** Tests use `baseURL` from [playwright.config.js](playwright.config.js) combined with helpers in [utils/constants.js](utils/constants.js) (e.g., `FEED_PATH`). Avoid hardcoding origins.
- **Report deployment:** CI (see [Jenkinsfile](Jenkinsfile)) runs a subset of tests then deploys `playwright-report/` to Netlify; `npm run deploy-report` mirrors that flow locally.

**Common Pitfalls & Gotchas**
- Changing API payloads or auth shape in `tests/fixtures.js` or `utils/APiUtils.js` will break dependent fixtures — inspect usages before edits.
- Tests expect deterministic `workers: 1` and `retries: 1` in CI; don't increase workers without validating shared-state issues.
- Do not change `playwright.config.js` headless toggle semantics without checking local `--headed` runs.

**Files to Inspect First (fast path)**
- [playwright.config.js](playwright.config.js)
- [tests/fixtures.js](tests/fixtures.js)
- [utils/APiUtils.js](utils/APiUtils.js)
- [utils/constants.js](utils/constants.js)
- [pageobjects/](pageobjects/) (pick feature under test)
- [Jenkinsfile](Jenkinsfile)

**When making changes**
- Preserve API payload shapes and export styles; if you must change an export style, update all import sites.
- Run the affected suite locally with the same `ENV` and test path used by CI before pushing.
- If adding selectors, prefer updating or extending a pageobject rather than modifying many tests.

**Quick Examples**
```bash
# run the CI suite locally (example)
ENV=test npx playwright test tests/socialwalls/socialfeeds --headed

# generate and open report
npx playwright test && start playwright-report/index.html
```

If anything here is unclear or you'd like more detail about a specific area (fixtures, a pageobject, CI step), tell me which part to expand.

import { test, expect } from '../autopilotfixtures.js';

import { FEED_PATH } from '../../utils/constants.js';

import PrivateNetworkPost from '../../pageobjects/autopilot/PrivateNetworkPost.js';
import PublicNetworkPost from '../../pageobjects/autopilot/PublicNetworkPost.js';
import AssignTagNetworkPost from '../../pageobjects/autopilot/AssignTagNetworkPost.js';

// Reusable function to run feed test
const runAutoPilotTest = ({ tag, PageObject, method }) => {
    test(tag, async ({ page, token, wallId }) => {
        await test.step('Inject token into local storage', async () => {
            await page.addInitScript(token => localStorage.setItem('token', token), token);
            await page.addInitScript(wallId => localStorage.setItem('wallId', wallId), wallId);

        });

        await test.step('Navigate to AUTOPILOT page', async () => {
            await page.goto(FEED_PATH.AUTOPILOT, { waitUntil: 'domcontentloaded' });
        });

        await test.step('Soft check for correct page title', async () => {
            await expect.soft(page).toHaveTitle('Autopilot | Tagbox');
        });


        await test.step(`Run ${tag} feed creation flow`, async () => {
            const feedPage = new PageObject(page); // ✅ this fixes undefined wallId
            await feedPage[method]();
        });


        await test.step('Wait for content gallery to fully load', async () => {
            await page.waitForLoadState('load', { timeout: 60000 });
        });
    });
};

// Feed types configuration
const autopilot = [

    { tag: '@PrivateNetworkPost created', PageObject: PrivateNetworkPost, method: 'privateNetworkPost' },
    { tag: '@VerifyPostIsPrivate created', PageObject: PrivateNetworkPost, method: 'verifyPostIsPrivate' },
    { tag: '@PublicNetworkPost created', PageObject: PublicNetworkPost, method: 'publicNetworkPost' },
    { tag: '@VerifyPostIsPublic created', PageObject: PublicNetworkPost, method: 'verifyPostIsPublic' },
    { tag: '@AssignTagNetworkPost created', PageObject: AssignTagNetworkPost, method: 'assignTagNetworkPost' },
    { tag: '@VerifyAssignTag created', PageObject: AssignTagNetworkPost, method: 'verifyAssignTag' },


];

// Dynamically register each test
autopilot.forEach(runAutoPilotTest);

// Common teardown
test.afterEach(async ({ page }) => {
    console.log('🧹 Running teardown...');
    await page.evaluate(() => localStorage.clear());
    await page.close();
    console.log('✅ Teardown complete.');
});

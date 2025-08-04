import { test, expect } from '../../publishfixtures.js';

import { FEED_PATH } from '../../../utils/constants.js';
import SocialCard from '../../../pageobjects/publish/website/theme/socialcard/SocialCard.js';
import SocialCardWebEmbed from '../../../pageobjects/publish/website/theme/socialcard/SocialCardWebEmbed.js';
import DeleteWebsite from '../../../pageobjects/publish/website/theme/themeutils/DeleteWebsite.js';



const runSocialCardTest = ({ tag, PageObject, method }) => {
    test(tag, async ({ page, token, wallId }) => {
        await test.step('Inject token into local storage', async () => {
            await page.addInitScript(token => localStorage.setItem('token', token), token);
            await page.addInitScript(wallId => localStorage.setItem('wallId', wallId), wallId);

        });

        await test.step('Navigate to PUBLISH page', async () => {
            await page.goto(FEED_PATH.PUBLISH, { waitUntil: 'domcontentloaded' });
        });

        await test.step(`Run ${tag} feed creation flow`, async () => {
            const feedPage = new PageObject(page);
            await feedPage[method]();
        });


        await test.step('Wait for content gallery to fully load', async () => {
            await page.waitForLoadState('load', { timeout: 60000 });
        });
    });
};

const socialCard = [
    { tag: '@SocialCard Theme Created', PageObject: SocialCard, method: 'socialCard' },
    { tag: '@SocialCardWebEmbed Theme Created', PageObject: SocialCardWebEmbed, method: 'socialCardWebEmbed' },
    { tag: '@DeleteWebsite Theme Created', PageObject: DeleteWebsite, method: 'deleteWebsite' },

];

socialCard.forEach(runSocialCardTest);

// Common teardown
test.afterEach(async ({ page }) => {
    console.log('🧹 Running teardown...');
    await page.evaluate(() => localStorage.clear());
    await page.close();
    console.log('✅ Teardown complete.');
});

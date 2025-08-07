import { test, expect } from '../../publishfixtures.js';

import { FEED_PATH } from '../../../utils/constants.js';
import WidgetTheme from '../../../pageobjects/publish/website/theme/widgettheme/WidgetTheme.js';
import WidgetThemeWebEmbed from '../../../pageobjects/publish/website/theme/widgettheme/WidgetThemeWebEmbed.js';
import DeleteWebsite from '../../../pageobjects/publish/website/theme/themeutils/DeleteWebsite.js';



const runWidgetThemeTest = ({ tag, PageObject, method }) => {
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

const widgetTheme = [
{tag: '@WidgetTheme Theme Created', PageObject: WidgetTheme, method: 'widgetTheme'},
{tag: '@WidgetThemeWebEmbed Theme Created', PageObject: WidgetThemeWebEmbed, method: 'widgetThemeWebEmbed'},
{tag: '@DeleteWebsite Theme Created', PageObject: DeleteWebsite,method: 'deleteWebsite'},

];

widgetTheme.forEach(runWidgetThemeTest);

// Common teardown
test.afterEach(async ({ page }) => {
    console.log('🧹 Running teardown...');
    await page.evaluate(() => localStorage.clear());
    await page.close();
    console.log('✅ Teardown complete.');
});

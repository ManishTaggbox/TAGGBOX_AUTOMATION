import { test, expect } from '../../publishfixtures.js';

import { FEED_PATH } from '../../../utils/constants.js';
import GallerySlider from '../../../pageobjects/publish/website/theme/galleryslider/GallerySlider.js';
import GallerySliderWebEmbed from '../../../pageobjects/publish/website/theme/galleryslider/GallerySliderWebEmbed.js';
import DeleteWebsite from '../../../pageobjects/publish/website/theme/themeutils/DeleteWebsite.js';



const runGallerySliderTest = ({ tag, PageObject, method }) => {
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

const gallerySlider = [


{tag: '@GallerySlider Theme Created', PageObject: GallerySlider,method: 'gallerySlider'},
{tag: '@GallerySliderWebEmbed Theme Created', PageObject: GallerySliderWebEmbed,method: 'gallerySliderWebEmbed'},

{tag: '@DeleteWebsite Theme Created', PageObject: DeleteWebsite,method: 'deleteWebsite'},


   
];

gallerySlider.forEach(runGallerySliderTest);

// Common teardown
test.afterEach(async ({ page }) => {
    console.log('🧹 Running teardown...');
    await page.evaluate(() => localStorage.clear());
    await page.close();
    console.log('✅ Teardown complete.');
});

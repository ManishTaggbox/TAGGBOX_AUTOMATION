import { test, expect } from '@playwright/test';


test('Check all links on the website', async ({ page }) => {
  const websiteURL = 'https://tagshop.ai/';

  // Navigate to website
  await page.goto(websiteURL, { waitUntil: 'domcontentloaded' });

  // Extract all links from the page
  const links = await page.$$eval('a', (anchors) =>
    anchors.map(a => a.href).filter(href => href && !href.startsWith('javascript:'))
  );

  console.log(`🔗 Total links found: ${links.length}`);

  let brokenLinks = [];

  // Loop through each link and check status
  for (const link of links) {
    try {
      const response = await fetch(link, { method: 'HEAD' }); // fast check
      if (!response.ok) {
        console.error(`❌ [${response.status}] - ${link}`);
        brokenLinks.push({ url: link, status: response.status, statusText: response.statusText });
      } else {
        console.log(`✅ [${response.status}] - ${link}`);
      }
    } catch (error) {
      console.error(`🚫 Error accessing: ${link} - ${error.message}`);
      brokenLinks.push({ url: link, status: 'Error', statusText: error.message });
    }
  }

  // Show summary
  console.log('\n=== 🧾 Broken Links Report ===');
  if (brokenLinks.length > 0) {
    brokenLinks.forEach(b =>
      console.log(`❌ ${b.url} --> ${b.status} (${b.statusText})`)
    );
  } else {
    console.log('🎉 No broken links found!');
  }

  // Optional assertion to fail test if any link broken
  expect(brokenLinks.length, 'Broken links found').toBe(0);
});

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening ML Research page...');
  await page.goto('https://testdemoqwenai2025-creator.github.io/DemoSciCMP/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  await page.waitForTimeout(2000);
  
  // Click on ML Research in nav
  try {
    const mlLink = await page.$('text=ML Research');
    if (mlLink) {
      console.log('Clicking ML Research link...');
      await mlLink.click();
      await page.waitForTimeout(2000);
    }
  } catch (e) {
    console.log('ML Research link not found, capturing current view');
  }
  
  // Screenshot
  console.log('Capturing ML Research page...');
  await page.screenshot({
    path: '/home/z/my-project/download/ml-research-page.png',
    fullPage: false
  });
  
  console.log('Screenshot saved!');
  await browser.close();
})();

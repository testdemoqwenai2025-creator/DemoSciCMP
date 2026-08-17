const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });
  
  console.log('Opening main page with Featured Template section...');
  await page.goto('https://testdemoqwenai2025-creator.github.io/DemoSciCMP/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  await page.waitForTimeout(2000);
  
  // Scroll to bottom to see Featured Template section
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
  await page.waitForTimeout(1000);
  
  // Screenshot
  console.log('Capturing main page with Featured Template link...');
  await page.screenshot({
    path: '/home/z/my-project/download/main-page-with-docking-link.png',
    fullPage: false
  });
  
  console.log('Screenshot saved!');
  await browser.close();
})();

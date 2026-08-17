const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening Research Trends page...');
  await page.goto('https://testdemoqwenai2025-creator.github.io/DemoSciCMP/#/research-trends', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  // Wait for page to fully load
  await page.waitForTimeout(2000);
  
  // Screenshot of Hero section with new IDE Studio button
  console.log('Capturing Hero section with Open IDE Studio button...');
  await page.screenshot({
    path: '/home/z/my-project/download/ide-studio-button-added.png',
    fullPage: false
  });
  
  console.log('Screenshot saved!');
  await browser.close();
})();

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening DemoSciCMP Studio IDE...');
  await page.goto('https://testdemoqwenai2025-creator.github.io/DemoSciCMP/studio.html', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  await page.waitForTimeout(2000);
  
  // Screenshot of Studio IDE
  console.log('Capturing Studio IDE...');
  await page.screenshot({
    path: '/home/z/my-project/download/demoscicmp-studio-ide.png',
    fullPage: false
  });
  
  console.log('Screenshot saved!');
  await browser.close();
})();

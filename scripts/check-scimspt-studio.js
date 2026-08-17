const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening SciMSPT Studio IDE...');
  await page.goto('https://testdemoqwenai2025-creator.github.io/SciMSPT/studio.html', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  await page.waitForTimeout(2000);
  
  // Screenshot of studio page
  console.log('Capturing SciMSPT Studio IDE...');
  await page.screenshot({
    path: '/home/z/my-project/download/scimspt-studio-ide.png',
    fullPage: false
  });
  
  // Get the HTML content
  const htmlContent = await page.content();
  
  await browser.close();
})();

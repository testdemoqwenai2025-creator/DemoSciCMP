const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening new Docking template page...');
  await page.goto('https://testdemoqwenai2025-creator.github.io/DemoSciCMP/templates/cheminformatics/docking.html', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  await page.waitForTimeout(2000);
  
  // Screenshot
  console.log('Capturing docking page with Studio IDE button...');
  await page.screenshot({
    path: '/home/z/my-project/download/docking-with-studio-ide.png',
    fullPage: false
  });
  
  console.log('Screenshot saved!');
  await browser.close();
})();

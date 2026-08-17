const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
  
  console.log('Opening Research Trends page directly...');
  // Try direct navigation to research trends
  await page.goto('https://testdemoqwenai2025-creator.github.io/DemoSciCMP/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  await page.waitForTimeout(2000);
  
  // Click on Research Trends in nav if it exists
  try {
    const researchLink = await page.$('text=Research Trends');
    if (researchLink) {
      console.log('Clicking Research Trends link...');
      await researchLink.click();
      await page.waitForTimeout(2000);
    }
  } catch (e) {
    console.log('No Research Trends link found, capturing current view');
  }
  
  // Screenshot of Hero section
  console.log('Capturing page...');
  await page.screenshot({
    path: '/home/z/my-project/download/research-trends-with-ide-button.png',
    fullPage: false
  });
  
  console.log('Screenshot saved!');
  await browser.close();
})();

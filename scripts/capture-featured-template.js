const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening main page...');
  await page.goto('https://testdemoqwenai2025-creator.github.io/DemoSciCMP/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  await page.waitForTimeout(2000);
  
  // Scroll to Featured Template section (about 70% down)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.65));
  await page.waitForTimeout(1000);
  
  // Screenshot
  console.log('Capturing Featured Template section...');
  await page.screenshot({
    path: '/home/z/my-project/download/featured-template-section.png',
    fullPage: false
  });
  
  // Check if the section exists
  const sectionExists = await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h2, h3'))
      .find(el => el.textContent.includes('Featured Template') || el.textContent.includes('Most Popular'));
    return !!heading;
  });
  
  console.log('Featured Template section found:', sectionExists);
  
  await browser.close();
})();

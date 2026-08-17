const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening SciMSPT site...');
  await page.goto('https://testdemoqwenai2025-creator.github.io/SciMSPT/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  await page.waitForTimeout(2000);
  
  // Screenshot of SciMSPT main page
  console.log('Capturing SciMSPT page...');
  await page.screenshot({
    path: '/home/z/my-project/download/scimspt-main-page.png',
    fullPage: false
  });
  
  // Look for IDE-related buttons or elements
  const ideButtons = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, a, [role="button"]'));
    return buttons
      .filter(el => el.textContent.toLowerCase().includes('ide') || 
                    el.textContent.toLowerCase().includes('studio') ||
                    el.textContent.toLowerCase().includes('open'))
      .map(el => ({
        text: el.textContent.trim(),
        tag: el.tagName,
        href: el.href || '',
        class: el.className
      }));
  });
  
  console.log('IDE/Open buttons found:', JSON.stringify(ideButtons, null, 2));
  
  await browser.close();
})();

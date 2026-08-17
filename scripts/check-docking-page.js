const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('Opening docking template page...');
  await page.goto('https://testdemoqwenai2025-creator.github.io/DemoSciCMP/#/templates/cheminformatics/docking', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  await page.waitForTimeout(2000);
  
  // Screenshot of docking page
  console.log('Capturing docking page...');
  await page.screenshot({
    path: '/home/z/my-project/download/docking-template-page.png',
    fullPage: false
  });
  
  // Get page content info
  const pageInfo = await page.evaluate(() => {
    return {
      title: document.title,
      url: window.location.href,
      hasStudioButton: !!document.querySelector('[class*="studio"], [class*="ide"], [class*="IDE"]') || 
                       Array.from(document.querySelectorAll('button, a')).some(el => 
                         el.textContent.toLowerCase().includes('studio') || 
                         el.textContent.toLowerCase().includes('ide')
                       ),
      buttons: Array.from(document.querySelectorAll('button, a.btn, [role="button"]'))
        .slice(0, 10)
        .map(el => ({ text: el.textContent.trim(), href: el.href || '' }))
    };
  });
  
  console.log('Page info:', JSON.stringify(pageInfo, null, 2));
  
  await browser.close();
})();

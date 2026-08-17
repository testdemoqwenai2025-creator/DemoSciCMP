const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('=== FULL NAVIGATION ANALYSIS ===\n');
  
  // Go to main page
  await page.goto('https://testdemoqwenai2025-creator.github.io/DemoSciCMP/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  // Get ALL clickable elements with their info
  const allClickables = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('a, button, [onclick], [role="button"]'));
    return elements.slice(0, 30).map(el => ({
      text: el.textContent.trim().substring(0, 40),
      tag: el.tagName,
      href: el.href || '',
      onclick: el.getAttribute('onclick') || '',
      className: el.className.substring(0, 50)
    }));
  });
  
  console.log('All clickable elements on main page:');
  allClickables.forEach((item, i) => {
    console.log(`${i+1}. [${item.tag}] "${item.text}"`);
    if (item.href) console.log(`   → HREF: ${item.href}`);
    if (item.onclick) console.log(`   → ONCLICK: ${item.onclick.substring(0, 80)}`);
  });
  
  // Click on Templates and see where it goes
  console.log('\n=== CLICKING TEMPLATES BUTTON ===');
  
  const templateBtn = await page.$('button:has-text("Templates"), a:has-text("Templates")');
  if (templateBtn) {
    console.log('Found Templates button!');
    
    // Listen for navigation
    page.on('framenavigated', frame => {
      console.log(`Navigated to: ${frame.url()}`);
    });
    
    await templateBtn.click();
    await page.waitForTimeout(2000);
    
    const currentUrl = page.url();
    console.log(`Current URL after click: ${currentUrl}`);
    
    // Now look for docking-related content on this page
    const dockingLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href], button'))
        .filter(el => 
          el.textContent.toLowerCase().includes('docking') ||
          (el.href && el.href.toLowerCase().includes('docking')) ||
          (el.href && el.href.toLowerCase().includes('cheminformatics'))
        )
        .map(el => ({
          text: el.textContent.trim(),
          href: el.href || '',
          tag: el.tagName
        }));
    });
    
    console.log('\nDocking-related links on Templates page:');
    console.log(JSON.stringify(dockingLinks, null, 2));
  } else {
    console.log('Templates button not found as clickable element');
  }
  
  await browser.close();
})();

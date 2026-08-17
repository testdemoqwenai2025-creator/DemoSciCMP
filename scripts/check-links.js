const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  console.log('=== CHECKING LINKS FROM MAIN PAGE TO DOCKING ===\n');
  
  // Go to main page
  await page.goto('https://testdemoqwenai2025-creator.github.io/DemoSciCMP/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  // Find all links on the page
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href]'))
      .map(a => ({
        text: a.textContent.trim().substring(0, 50),
        href: a.href,
        className: a.className
      }))
      .filter(link => 
        link.href.includes('template') || 
        link.href.includes('docking') ||
        link.href.includes('cheminformatics') ||
        link.text.toLowerCase().includes('template') ||
        link.text.toLowerCase().includes('docking')
      );
  });
  
  console.log('Links related to Templates/Docking found:');
  console.log(JSON.stringify(links, null, 2));
  
  // Check nav bar for Templates link
  const navLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('nav a, .nav-link, [class*="nav"] a'))
      .map(a => ({ text: a.textContent.trim(), href: a.href }));
  });
  
  console.log('\n=== NAVIGATION LINKS ===');
  console.log(JSON.stringify(navLinks, null, 2));
  
  // Check if Templates button/link exists and where it goes
  const templateButtons = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('button, a, [role="button"]'));
    return elements
      .filter(el => el.textContent.toLowerCase().includes('template'))
      .map(el => ({
        text: el.textContent.trim(),
        tag: el.tagName,
        href: el.href || '',
        onclick: el.getAttribute('onclick') || ''
      }));
  });
  
  console.log('\n=== TEMPLATE BUTTONS/LINKS ===');
  console.log(JSON.stringify(templateButtons, null, 2));
  
  await browser.close();
})();

const puppeteer = require('puppeteer');

(async () => {
  // Launch browser with visible window
  const browser = await puppeteer.launch({
    headless: false,  // This makes the browser visible
    defaultViewport: null,  // Uses default viewport size
    args: ['--start-maximized']  // Starts browser maximized
  });

  const page = await browser.newPage();
  
  // Your bot actions here
  await page.goto('https://example.com');
  await page.type('#search', 'Puppeteer bot');
  await page.click('#submit');
  
  // Keep browser open for inspection
  // await browser.close();
})();
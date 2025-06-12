import puppeteer from 'puppeteer';

(async () => {
  // Launch browser with visible window
  const browser = await puppeteer.launch({
    headless: false,  // This makes the browser visible
    defaultViewport: null,  // Uses default viewport size
    args: ['--start-maximized']  // Starts browser maximized
  });

  const page = await browser.newPage();
  
  // Wait for the selector to appear (timeout after 5 seconds)
  await page.waitForSelector('#search', { timeout: 5000 });

  // Now interact with the element
  await page.type('#search', 'Hello, Puppeteer!');

  await browser.close();
})();
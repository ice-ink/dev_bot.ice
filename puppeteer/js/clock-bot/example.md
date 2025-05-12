# Example

```
To create a Puppeteer bot where you can see the browser activity as it executes tasks, you have several options. Here's how to set it up:
Basic Visible Browser Setup
javascript

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

Enhanced Visibility Options
1. Slow Motion Mode (Great for debugging)
javascript

const browser = await puppeteer.launch({
  headless: false,
  slowMo: 250,  // slows down operations by 250ms
});

2. DevTools Open by Default
javascript

const browser = await puppeteer.launch({
  headless: false,
  devtools: true,  // opens DevTools automatically
});

3. Custom Window Size
javascript

const browser = await puppeteer.launch({
  headless: false,
  args: ['--window-size=1200,800'],
});

Advanced: Recording or Screenshotting Actions
javascript

// Take screenshot after each action
await page.goto('https://example.com');
await page.screenshot({ path: 'step1.png' });

await page.type('#search', 'Puppeteer bot');
await page.screenshot({ path: 'step2.png' });

await page.click('#submit');
await page.screenshot({ path: 'step3.png' });

Using a GUI Wrapper

For even better visibility, consider using a GUI wrapper like:

    Puppeteer Cluster GUI - Visualizes parallel tasks

    Custom Electron App - Wraps Puppeteer with your own interface

Debugging Tips
javascript

// Listen to console messages
page.on('console', msg => console.log('PAGE LOG:', msg.text()));

// Listen to page errors
page.on('pageerror', error => console.log('Page error:', error));

// Listen to requests
page.on('request', request => console.log('Request:', request.url()));

Remember to remove or disable these visibility options when deploying to production for better performance.
```
/* Example code via DeepSeek
const puppeteer = require('puppeteer');
const readline = require('readline');

(async () => {
  // Launch browser with visible UI
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Set up CLI input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Bot> '
  });

  console.log('Bot initialized. Commands: goto <url>, screenshot, type <selector> <text>, click <selector>, quit');

  rl.prompt();

  rl.on('line', async (line) => {
    const [command, ...args] = line.trim().split(' ');

    try {
      switch (command) {
        case 'goto':
          await page.goto(args[0]);
          console.log(`Navigated to ${args[0]}`);
          break;
        case 'screenshot':
          await page.screenshot({ path: 'screenshot.png' });
          console.log('Screenshot saved');
          break;
        case 'type':
          await page.type(args[0], args.slice(1).join(' '));
          console.log(`Typed "${args.slice(1).join(' ')}" into ${args[0]}`);
          break;
        case 'click':
          await page.click(args[0]);
          console.log(`Clicked ${args[0]}`);
          break;
        case 'quit':
          await browser.close();
          rl.close();
          return;
        default:
          console.log('Unknown command');
      }
    } catch (err) {
      console.error('Error:', err.message);
    }

    rl.prompt();
  });

  rl.on('close', () => {
    console.log('Exiting bot...');
    process.exit(0);
  });
})();
*/
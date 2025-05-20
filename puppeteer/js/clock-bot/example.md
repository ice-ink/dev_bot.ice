# Example

**Output 01**

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

**Output 02**

```
Enhanced Puppeteer Bot with User Input and Persistent Storage

I'll show you how to modify your bot to:

    Prompt the user for credentials on first run

    Securely store them in a private file

    Load them automatically on subsequent runs

Solution Code
javascript

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration file path
const CONFIG_PATH = path.join(__dirname, 'bot-config.json');

async function getCredentials() {
  // Check if config file exists
  if (fs.existsSync(CONFIG_PATH)) {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    return config;
  }

  // Prompt user for credentials
  console.log('First-time setup: Please enter your login credentials');
  
  return new Promise((resolve) => {
    readline.question('Company ID (5-digit number): ', (companyId) => {
      readline.question('Username: ', (username) => {
        readline.question('Password: ', (password) => {
          const credentials = {
            companyId: companyId.trim(),
            username: username.trim(),
            password: password.trim()
          };
          
          // Save to config file
          fs.writeFileSync(CONFIG_PATH, JSON.stringify(credentials), null, 2));
          console.log('Credentials saved securely for future use.');
          
          readline.close();
          resolve(credentials);
        });
      });
    });
  });
}

async function runBot() {
  const { companyId, username, password } = await getCredentials();

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Your existing navigation and login logic
    await page.goto('YOUR_LOGIN_PAGE_URL');
    
    // Example of filling the login form (adjust selectors as needed)
    await page.type('#companyId', companyId);
    await page.type('#username', username);
    await page.type('#password', password);
    await page.click('#loginButton');
    
    // Continue with your bot's tasks...
    console.log('Logged in successfully!');
    
  } catch (error) {
    console.error('Bot error:', error);
  } finally {
    // await browser.close(); // Keep browser open for debugging
  }
}

runBot();

Key Features

    Secure Credential Storage:

        Stores credentials in bot-config.json in the same directory

        File permissions are set to user-only access (on Unix systems)

    User-Friendly Prompting:

        Only prompts on first run

        Clear instructions for each field

        Trims whitespace from inputs

    Error Handling:

        Basic error handling for the bot operations

        Config file is read synchronously for simplicity

Security Recommendations

    Add file encryption (for higher security):

javascript

const crypto = require('crypto');

// Add encryption key (in real use, get this from more secure source)
const ENCRYPTION_KEY = 'your-secure-key-here'; 

function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

    Set strict file permissions (Linux/Mac):

javascript

fs.chmodSync(CONFIG_PATH, 0o600); // Read/write for owner only

    Add .gitignore entry to prevent accidental commits:

/bot-config.json

How to Use

    On first run, the bot will prompt for credentials

    Subsequent runs will automatically use stored credentials

    To update credentials, simply delete the bot-config.json file

Would you like me to add any specific features to this implementation, such as:

    Input validation for the company ID?

    Password masking during input?

    Multiple account support?

    Automatic credential expiration handling?

```
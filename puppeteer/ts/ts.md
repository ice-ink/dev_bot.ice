Puppeteer with TypeScript: Key Insights

Yes, Puppeteer is fully compatible with TypeScript, and using TypeScript with Puppeteer provides significant advantages over plain JavaScript.
1. Is TypeScript Compatible with Puppeteer?

    Puppeteer ships with built-in TypeScript types (@types/puppeteer is included in the package).

    Node.js + TypeScript work seamlessly since TS compiles down to JavaScript, which Node executes.

    You need a compilation step, but tools like ts-node allow direct execution without manual compilation.

2. Advantages of TypeScript with Puppeteer
✅ Strong Typing Reduces Errors

TypeScript catches mistakes before runtime, such as:

    Incorrect method names (page.goto() vs page.navigate()).

    Wrong argument types (page.click(123) → fails at compile time).

Example:
ts

// TypeScript catches this error immediately:
await page.goto(123); // ❌ Error: Argument must be a string

✅ Better Autocompletion & Documentation

    VS Code (and other IDEs) provide intelligent suggestions for Puppeteer methods.

    Hovering over functions shows parameter types and return values.

Example:
ts

const browser = await puppeteer.launch({
  headless: true, // ✅ Auto-completes options
});

✅ Easier Refactoring & Maintenance

    If Puppeteer updates its API, TypeScript flags deprecated methods.

    Renaming variables/methods is safer (TS ensures consistency).

Example:
ts

// Old (v13): `page.waitForSelector()`
// New (v21): `page.locator().wait()`  
// TypeScript will warn you if you're using deprecated APIs.

✅ Improved Async/Await Handling

TypeScript enforces proper error handling with try/catch.

Example:
ts

try {
  await page.goto("https://example.com");
} catch (err) {
  console.error("Navigation failed:", err instanceof Error ? err.message : err);
}

✅ Custom Type Extensions for Complex Scraping

You can define custom types for scraped data:
ts

interface Product {
  name: string;
  price: number;
}

const products: Product[] = await page.evaluate(() => {
  return Array.from(document.querySelectorAll(".product")).map(el => ({
    name: el.querySelector(".name")!.textContent!,
    price: parseFloat(el.querySelector(".price")!.textContent!),
  }));
});

3. How to Set Up Puppeteer with TypeScript
Step 1: Install Dependencies
bash

pnpm add puppeteer typescript @types/node ts-node -D

Step 2: Configure tsconfig.json
json

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  }
}

Step 3: Write TypeScript Code (bot.ts)
ts

import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://example.com");
  await page.screenshot({ path: "example.png" });
  await browser.close();
})();

Step 4: Run It (No Manual Compilation Needed)
bash

npx ts-node bot.ts

(or compile with tsc and run node dist/bot.js)
4. When to Use TypeScript with Puppeteer?
Scenario	Recommendation
Quick scripts (one-off scraping)	JavaScript (faster setup)
Large projects (scrapers, test suites)	TypeScript (better safety)
Team collaboration	TypeScript (avoids API misuse)
Final Verdict

    TypeScript + Puppeteer = More Reliable Automation

    Best for:

        Long-term projects

        Teams

        Complex scraping logic

    Tradeoff: Slightly slower setup due to compilation.
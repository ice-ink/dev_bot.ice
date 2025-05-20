import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('token-for-website');
console.log(await page.title());
await browser.close();

// js/my-js-bot/js-bot.js
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://example.com');
console.log(await page.title());
await browser.close();

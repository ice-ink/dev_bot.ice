import readline from 'readline';
import puppeteer from 'puppeteer';

async function runBot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Store data that can be modified by commands
    let botData = {
        active: true,
        config: {},
        // other bot state variables
    };

    // Set up CLI interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'BOT> '
    });

    rl.prompt();

    rl.on('line', async (line) => {
        const [command, ...args] = line.trim().split(' ');
        
        switch(command) {
            case 'store':
                // Example command to store data
                const [key, value] = args;
                botData.config[key] = value;
                console.log(`Stored ${key}=${value}`);
                break;
            case 'goto':
                await page.goto(args[0]);
                console.log(`Navigated to ${args[0]}`);
                break;
            case 'status':
                console.log('Bot status:', botData);
                break;
            case 'exit':
                botData.active = false;
                await browser.close();
                rl.close();
                break;
            default:
                console.log('Unknown command');
        }
        
        if (botData.active) {
            rl.prompt();
        }
    });

    rl.on('close', () => {
        console.log('Exiting bot...');
        process.exit(0);
    });
}

runBot();
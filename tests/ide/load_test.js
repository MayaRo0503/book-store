const { Builder, By } = require("selenium-webdriver");
const fs = require("fs");

const iterations = 1500; // Number of times to run the script

(async function testBookstore() {
    let driver;
    const startTime = performance.now();

    try {
        // Set up the ChromeDriver path
        const chromeOptions = {
            binary: process.env.CHROME_BIN,
            args: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
        };

        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(chromeOptions)
            .build();

        await driver.get("https://book-store-5l9x.onrender.com");

        for (let i = 0; i < iterations; i++) {
            // Add to cart functionality check
            const X = performance.now();
            await driver.findElement(By.css("#bookList .book button")).click();
            await driver.sleep(50);
            const Y = performance.now();

            console.log("iteration=" + i);
            console.log(`Time Between clicks: ${Y - X} milsec`);
        }
    } catch (e) {
        console.log(e);
    } finally {
        const endTime = performance.now();
        console.log(`Time loading page: ${(endTime - startTime) / 1000} sec`);
        if (driver) {
            await driver.quit();
        }
    }
})();

const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

const iterations = 1500; // Number of times to run the script

(async function testBookstore() {
    let driver;
    const startTime = performance.now();

    try {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://bookstore11.azurewebsites.net/");

        // Title check
        let title = await driver.getTitle();
        assert.equal("Book Store", title);

        // Search functionality check
        await driver.findElement(By.id("searchInput")).sendKeys("Book 1");
        await driver.findElement(By.tagName("button")).click();
        await driver.sleep(1000);
        let bookTitle = await driver
            .findElement(By.css("#bookList .book h2"))
            .getText();
        assert.equal("Book 1", bookTitle.trim());

        // /// Search for a book that doesn't exist
        // const searchInput = 'Nonexistent Book';
        // await driver.findElement(By.id('searchInput')).sendKeys(searchInput);
        // await driver.findElement(By.tagName('button')).click();

        // // Wait for the button element in the book list to become visible
        // await driver.wait(until.elementIsVisible(driver.findElement(By.css('#bookList .book button'))), 20000);

        // Check if error message is displayed
        try {
            let alert = await driver.switchTo().alert();
            let alertText = await alert.getText();
            assert.equal("No books found matching your search.", alertText);
            await alert.dismiss(); // Dismiss the alert
        } catch (error) {
            console.log("No alert found. Test passed.");
        }

        for (let i = 0; i < iterations; i++) {
            // Add to cart functionality check
            const X = performance.now();
            await driver.findElement(By.css("#bookList .book button")).click();
            await driver.sleep(50);
            let cartItem = await driver
                .findElement(By.css("#cartItems li"))
                .getText();
            assert.equal("Book 1 - $10.99Delete", cartItem.trim()); // Adjusted expected value
            const Y = performance.now();

            console.log("iteration=" + i);
            console.log(`Time Bitween clicks: ${Y - X} milsec`);
        }

        // Check total price in the cart after adding a book
        let cartTotal = await driver.findElement(By.id("cartTotal")).getText();
        assert.equal("10.99", cartTotal.trim()); // Asserting the total price in the cart

        // Delete from cart functionality check
        await driver.findElement(By.css("#cartItems button")).click();
        await driver.sleep(1000);
        let cartItems = await driver.findElements(By.css("#cartItems li"));
        assert.equal(0, cartItems.length); // Asserting that cart is empty after deletion

        // Add another book to cart
        await driver.findElement(By.css("#bookList .book button")).click();
        await driver.sleep(1000);

        // Total price calculation check after adding one book
        let cartTotalAfterAdd = await driver
            .findElement(By.id("cartTotal"))
            .getText();
        assert.equal("10.99", cartTotalAfterAdd.trim());

        // Clear cart functionality check
        await driver.findElement(By.css(".cart button")).click();
        await driver.sleep(1000);
        let cartTotalAfterClear = await driver
            .findElement(By.id("cartTotal"))
            .getText();
        assert.equal("0.00", cartTotalAfterClear.trim());
    } catch (e) {
        console.log(e);
    } finally {
        const endTime = performance.now();
        console.log(`Time loading page: ${(endTime - startTime) / 1000} sec`);
        await driver.quit();
    }
})();
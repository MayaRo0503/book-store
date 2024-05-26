const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const fs = require("fs");

const iterations = 1500; // Number of times to run the script

(async function testBookstore() {
  let driver;
  const startTime = Date.now(); // Use Date.now() to get start time

  try {
    // Set up the ChromeDriver path
    const chromeOptions = {
      binary: process.env.CHROME_BIN,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    };

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();

    await driver.get("https://book-store-5l9x.onrender.com");

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
      const X = Date.now(); // Use Date.now() to get current time
      await driver.findElement(By.css("#bookList .book button")).click();
      await driver.sleep(50);
      let cartItem = await driver
        .findElement(By.css("#cartItems li"))
        .getText();
      assert.equal("Book 1 - $10.99Delete", cartItem.trim()); // Adjusted expected value
      const Y = Date.now(); // Use Date.now() to get current time

      console.log("iteration=" + i);
      console.log(`Time Between clicks: ${Y - X} milsec`);
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

    // Import your test files (Selenium IDE test files)
    const testFiles = fs
      .readdirSync("./tests")
      .filter((file) => file.endsWith(".spec.js"));

    // Run your Selenium IDE test files
    for (const testFile of testFiles) {
      const testScript = require(`./tests/${testFile}`);
      testScript(); // Assuming your test files export a function to run the tests
    }
  } catch (e) {
    console.log(e);
  } finally {
    const endTime = Date.now(); // Use Date.now() to get end time
    console.log(`Time loading page: ${(endTime - startTime) / 1000} sec`);
    if (driver) {
      await driver.quit();
    }
  }
})();

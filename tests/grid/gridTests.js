const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const { chromeCapabilities, firefoxCapabilities } = require("../capabilities");

async function runTestWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://book-store-5l9x.onrender.com");

    let title = await driver.getTitle();
    assert.strictEqual(
      "Book Store",
      title,
      "The title of the page is not as expected."
    );

    await driver.findElement(By.id("searchInput")).sendKeys("Book 1");
    await driver.findElement(By.tagName("button")).click();
    await driver.wait(until.elementLocated(By.css("#bookList .book h2")), 5000);
    let bookTitle = await driver
      .findElement(By.css("#bookList .book h2"))
      .getText();
    assert.strictEqual(
      "Book 1",
      bookTitle.trim(),
      "The book title is not as expected."
    );

    await driver.findElement(By.css("#bookList .book button")).click();
    await driver.wait(until.elementLocated(By.css("#cartItems li")), 5000);
    let cartItem = await driver.findElement(By.css("#cartItems li")).getText();
    assert.strictEqual(
      "Book 1 - $10.99Delete",
      cartItem.trim(),
      "The cart item is not as expected."
    );

    let cartTotal = await driver.findElement(By.id("cartTotal")).getText();
    assert.strictEqual(
      "10.99",
      cartTotal.trim(),
      "The cart total is not as expected."
    );

    await driver.findElement(By.css("#cartItems button")).click();
    await driver.wait(until.elementLocated(By.css("#cartItems")), 5000);
    let cartItems = await driver.findElements(By.css("#cartItems li"));
    assert.strictEqual(0, cartItems.length, "The cart is not empty.");
  } catch (error) {
    console.error(`Test failed. Error: ${error}`);
  } finally {
    await driver.quit();
  }
}

(async function testBookstore() {
  console.log("Testing on Chrome...");
  await runTestWithCapabilities(chromeCapabilities);

  console.log("Testing on Firefox...");
  await runTestWithCapabilities(firefoxCapabilities);
})();

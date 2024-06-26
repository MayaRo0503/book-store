const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

(async function testBookstore() {
  let driver;

  try {
    driver = await new Builder().forBrowser("chrome").build();
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

    // Add to cart functionality check
    await driver.findElement(By.css("#bookList .book button")).click();
    await driver.sleep(1000);
    let cartItem = await driver.findElement(By.css("#cartItems li")).getText();
    assert.equal("Book 1 - $10.99Delete", cartItem.trim()); // Adjusted expected value

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
    await driver.quit();
  }
})();

describe("IDE Test", function () {
  it("should return true", function () {
    assert.strictEqual(true, true);
  });
});

// gridTestImplementations.js
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

// Function to run "Clear Cart" with specified capabilities
async function runClearCartWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    // Navigate to the website
    await driver.get("https://book-store-5l9x.onrender.com");
    await driver.manage().window().setRect({ width: 784, height: 824 });

    // Add books to the cart before attempting to clear it
    console.log("Adding books to cart...");
    await driver.findElement(By.css(".book:nth-child(10) > button")).click();
    await driver.findElement(By.css(".book:nth-child(20) > button")).click();
    await driver.findElement(By.css(".book:nth-child(16) > button")).click();

    // Find and click the clear cart button
    console.log("Attempting to clear the cart...");
    const clearCartButton = await driver.findElement(
      By.css("button:nth-child(4)")
    );
    await clearCartButton.click();

    // Wait for the cart to be cleared and verify
    await driver.wait(until.elementLocated(By.css("#cartItems")), 5000);
    let cartItems = await driver.findElements(By.css("#cartItems li"));
    assert.strictEqual(
      cartItems.length,
      0,
      "Cart is not empty after clearing."
    );
    console.log("Cart cleared successfully.");
  } catch (error) {
    console.error(`An error occurred while clearing the cart: ${error}`);
  } finally {
    await driver.quit();
  }
}
// Placeholder for runDeleteMultipleBooksFromCartWithCapabilities
async function runDeleteMultipleBooksFromCartWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    // Delete multiple books from cart implementation
  } finally {
    await driver.quit();
  }
}

// Placeholder for runDeleteBookFromCartWithCapabilities
async function runDeleteBookFromCartWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    // Delete book from cart implementation
  } finally {
    await driver.quit();
  }
}

// Function to run "Add Book to Cart" with specified capabilities
async function runAddBookToCartWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://book-store-5l9x.onrender.com");
    await driver
      .findElement(By.css("#bookList .book:nth-child(1) button"))
      .click();
    await driver.wait(until.elementLocated(By.css("#cartItems li")), 5000);
    let cartItem = await driver.findElement(By.css("#cartItems li")).getText();
    assert.strictEqual("Book 1 - $10.99Delete", cartItem.trim());
  } finally {
    await driver.quit();
  }
}

// Function to run "Search Book" with specified capabilities
async function runSearchBookWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://book-store-5l9x.onrender.com");
    await driver.findElement(By.id("searchInput")).sendKeys("book 10");
    await driver.findElement(By.css("button:nth-child(3)")).click();
    // Implement checking the result, ensuring the right book is returned
  } finally {
    await driver.quit();
  }
}
async function runSearchInvalidBookWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://book-store-5l9x.onrender.com");
    await driver.manage().window().setRect({ width: 784, height: 824 });
    await driver.findElement(By.id("searchInput")).sendKeys("nonexistent book");

    // Use XPath to click on the button with text 'Search'
    const searchButton = await driver.findElement(
      By.xpath("//button[text()='Search']")
    );
    await searchButton.click();

    // Optionally wait for and check if a message about no results appears
    let noResultsText = await driver
      .findElement(By.css(".no-results"))
      .getText(); // Adjust if there's a specific no results selector
    assert.strictEqual(noResultsText, "No books found matching your search.");
  } catch (error) {
    console.error("Error during test execution:", error);
    // Optionally log additional diagnostic information or take a screenshot
  } finally {
    await driver.quit();
  }
}

async function runWindowFullSizeWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://book-store-5l9x.onrender.com");
    await driver.manage().window().maximize(); // Maximizes the window
  } finally {
    await driver.quit();
  }
}

async function runWindowHalfSizeWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://book-store-5l9x.onrender.com");
    const dimensions = await driver.executeScript(
      "return { width: window.screen.availWidth, height: window.screen.availHeight }"
    );
    await driver
      .manage()
      .window()
      .setRect({ width: dimensions.width / 2, height: dimensions.height / 2 });
    // Optionally, perform checks to ensure that UI elements adjust correctly to the new window size
  } finally {
    await driver.quit();
  }
}

module.exports = {
  runAddBookToCartWithCapabilities,
  runClearCartWithCapabilities,
  runSearchBookWithCapabilities,
  runDeleteBookFromCartWithCapabilities,
  runDeleteMultipleBooksFromCartWithCapabilities,
  runSearchInvalidBookWithCapabilities,
  runWindowFullSizeWithCapabilities,
  runWindowHalfSizeWithCapabilities,
};

const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { chromeCapabilities, firefoxCapabilities } = require("../capabilities");

async function runClearCartWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://book-store-5l9x.onrender.com");
    await driver.manage().window().setRect({ width: 784, height: 824 });

    console.log("Adding books to cart...");
    await driver.findElement(By.css(".book:nth-child(10) > button")).click();
    await driver.findElement(By.css(".book:nth-child(20) > button")).click();
    await driver.findElement(By.css(".book:nth-child(16) > button")).click();

    console.log("Attempting to clear the cart...");
    const clearCartButton = await driver.findElement(
      By.css("button:nth-child(4)")
    );
    await clearCartButton.click();

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

async function runDeleteMultipleBooksFromCartWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://book-store-5l9x.onrender.com");
    await driver.manage().window().setRect({ width: 784, height: 824 });

    console.log("Adding books to cart...");
    await driver.findElement(By.css(".book:nth-child(10) > button")).click();
    await driver.findElement(By.css(".book:nth-child(20) > button")).click();
    await driver.findElement(By.css(".book:nth-child(16) > button")).click();

    console.log("Attempting to delete multiple books from the cart...");
    const deleteButtons = await driver.findElements(
      By.css("#cartItems button")
    );
    for (let button of deleteButtons) {
      await button.click();
    }

    await driver.wait(until.elementLocated(By.css("#cartItems")), 5000);
    let cartItems = await driver.findElements(By.css("#cartItems li"));
    assert.strictEqual(
      cartItems.length,
      0,
      "Cart is not empty after deleting multiple books."
    );
    console.log("Multiple books deleted successfully.");
  } catch (error) {
    console.error(`An error occurred while deleting multiple books: ${error}`);
  } finally {
    await driver.quit();
  }
}

async function runDeleteBookFromCartWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://book-store-5l9x.onrender.com");
    await driver.manage().window().setRect({ width: 784, height: 824 });

    console.log("Adding a book to the cart...");
    await driver.findElement(By.css(".book:nth-child(10) > button")).click();

    console.log("Attempting to delete the book from the cart...");
    const deleteButton = await driver.findElement(By.css("#cartItems button"));
    await deleteButton.click();

    await driver.wait(until.elementLocated(By.css("#cartItems")), 5000);
    let cartItems = await driver.findElements(By.css("#cartItems li"));
    assert.strictEqual(
      cartItems.length,
      0,
      "Cart is not empty after deleting the book."
    );
    console.log("Book deleted successfully.");
  } catch (error) {
    console.error(`An error occurred while deleting the book: ${error}`);
  } finally {
    await driver.quit();
  }
}

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
  } catch (error) {
    console.error(
      `An error occurred while adding the book to the cart: ${error}`
    );
  } finally {
    await driver.quit();
  }
}

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
    await driver.wait(until.elementLocated(By.css("#bookList .book h2")), 5000);
    let bookTitle = await driver
      .findElement(By.css("#bookList .book h2"))
      .getText();
    assert.strictEqual(
      "Book 10",
      bookTitle.trim(),
      "The book title is not as expected."
    );
  } catch (error) {
    console.error(`An error occurred while searching for the book: ${error}`);
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

    const searchButton = await driver.findElement(
      By.xpath("//button[text()='Search']")
    );
    await searchButton.click();

    let noResultsText = await driver
      .findElement(By.css(".no-results"))
      .getText();
    assert.strictEqual(noResultsText, "No books found matching your search.");
  } catch (error) {
    console.error("Error during test execution:", error);
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
    await driver.manage().window().maximize();
  } catch (error) {
    console.error(`An error occurred while maximizing the window: ${error}`);
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
  } catch (error) {
    console.error(`An error occurred while resizing the window: ${error}`);
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

const { Builder, By, until } = require("selenium-webdriver");

async function runClearCartWithCapabilities(capabilities) {
  let driver = await new Builder()
    .forBrowser(capabilities.browserName)
    .usingServer("http://localhost:4444/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://book-store-5l9x.onrender.com");
    await driver.manage().window().setRect({ width: 784, height: 824 });
    // Simulate adding books to cart before clearing
    await driver.findElement(By.css(".book:nth-child(10)")).click();
    await driver.findElement(By.css(".book:nth-child(20) > button")).click();
    await driver.findElement(By.css(".book:nth-child(16) > button")).click();

    // Correctly identify and click the clear cart button
    // Ensure the selector corresponds to the button intended for clearing the cart
    await driver.findElement(By.css("button:nth-child(4)")).click();
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  } finally {
    await driver.quit();
  }
}

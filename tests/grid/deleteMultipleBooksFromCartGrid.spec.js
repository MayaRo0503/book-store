async function runDeleteMultipleBooksFromCartWithCapabilities(capabilities) {
  describe("Delete multiple books from cart", function () {
    this.timeout(50000); // Increase timeout for grid tests
    let driver;

    beforeEach(async function () {
      driver = await new Builder()
        .forBrowser(capabilities.browserName)
        .usingServer("http://localhost:4444/wd/hub")
        .withCapabilities(capabilities)
        .build();
    });

    afterEach(async function () {
      await driver.quit();
    });

    it("Delete multiple books from cart", async function () {
      await driver.get("http://bookstore11.azurewebsites.net/");
      await driver.manage().window().setRect({ width: 784, height: 824 });
      await driver.findElement(By.id("bookList")).click();
      await driver.findElement(By.css(".book:nth-child(11) > button")).click();
      await driver.findElement(By.css(".book:nth-child(20) > button")).click();
      await driver.findElement(By.css(".book:nth-child(19) > button")).click();
      await driver.findElement(By.css("li:nth-child(1) > button")).click();
      await driver.findElement(By.css("li:nth-child(1) > button")).click();
      await driver.findElement(By.css("button:nth-child(1)")).click(); // Assuming these are the delete buttons
    });
  });
}

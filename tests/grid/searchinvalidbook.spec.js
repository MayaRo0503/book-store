async function runSearchInvalidBookWithCapabilities(capabilities) {
  describe("Search invalid book", function () {
    this.timeout(50000);
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

    it("Search invalid book", async function () {
      await driver.get("https://book-store-5l9x.onrender.com");
      try {
        // To maximize the window directly
        await driver.manage().window().maximize();

        // Or to minimize (thereby not normal but minimized which might help circumvent the issue)
        await driver.manage().window().minimize();
        // Then resize after minimizing if necessary
        await driver.manage().window().setRect({ width: 784, height: 824 });
      } catch (error) {
        console.error("Error adjusting window state: ", error);
      }
      await driver.findElement(By.id("searchInput")).sendKeys("book 55");
      await driver.findElement(By.css("button:nth-child(3)")).click();
      try {
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        assert.strictEqual("No books found matching your search.", alertText);
        await alert.accept();
      } catch (error) {
        console.error("No alert found, or incorrect alert text.");
      }
    });
  });
}

async function runWindowHalfSizeWithCapabilities(capabilities) {
  describe("Window half size", function () {
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

    it("Window half size", async function () {
      await driver.get("http://bookstore11.azurewebsites.net/");
      await driver.manage().window().setRect({ width: 784, height: 824 });
    });
  });
}

const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

// Define capabilities for different browsers
const capabilities = {
  chrome: {
    browserName: "chrome",
    "goog:chromeOptions": {},
  },
  firefox: {
    browserName: "firefox",
    "moz:firefoxOptions": {},
  },
};

async function runTestWithGrid(browserName) {
  describe("Add book to cart on " + browserName, function () {
    this.timeout(50000);
    let driver;
    let vars;

    beforeEach(async function () {
      driver = await new Builder()
        .forBrowser(browserName)
        .usingServer("http://localhost:4444/wd/hub")
        .withCapabilities(capabilities[browserName])
        .build();
      vars = {};
    });

    afterEach(async function () {
      await driver.quit();
    });

    it("Add book to cart", async function () {
      await driver.get("https://book-store-5l9x.onrender.com");
      await driver.manage().window().setRect({ width: 784, height: 824 });

      // Wait for the button to be clickable and then click it
      await driver.wait(
        until.elementIsClickable(
          driver.findElement(By.css(".book:nth-child(1) > button"))
        )
      );
      await driver.findElement(By.css(".book:nth-child(1) > button")).click();
    });
  });
}

// Running tests across different browsers
(async function testOnAllBrowsers() {
  console.log("Testing on Chrome...");
  await runTestWithGrid("chrome");

  console.log("Testing on Firefox...");
  await runTestWithGrid("firefox");
})();

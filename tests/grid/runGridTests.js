const { chromeCapabilities, firefoxCapabilities } = require("../capabilities");
const {
  runAddBookToCartWithCapabilities,
  runClearCartWithCapabilities,
  runDeleteBookFromCartWithCapabilities,
  runDeleteMultipleBooksFromCartWithCapabilities,
  runSearchBookWithCapabilities,
  runSearchInvalidBookWithCapabilities,
  runWindowFullSizeWithCapabilities,
  runWindowHalfSizeWithCapabilities,
} = require("./gridTestImplementations");

(async function runTests() {
  console.log("Testing on Chrome...");
  await runAddBookToCartWithCapabilities(chromeCapabilities);
  await runClearCartWithCapabilities(chromeCapabilities);
  await runDeleteBookFromCartWithCapabilities(chromeCapabilities);
  await runDeleteMultipleBooksFromCartWithCapabilities(chromeCapabilities);
  await runSearchBookWithCapabilities(chromeCapabilities);
  await runSearchInvalidBookWithCapabilities(chromeCapabilities);
  await runWindowFullSizeWithCapabilities(chromeCapabilities);
  await runWindowHalfSizeWithCapabilities(chromeCapabilities);

  console.log("Testing on Firefox...");
  await runAddBookToCartWithCapabilities(firefoxCapabilities);
  await runClearCartWithCapabilities(firefoxCapabilities);
  await runDeleteBookFromCartWithCapabilities(firefoxCapabilities);
  await runDeleteMultipleBooksFromCartWithCapabilities(firefoxCapabilities);
  await runSearchBookWithCapabilities(firefoxCapabilities);
  await runSearchInvalidBookWithCapabilities(firefoxCapabilities);
  await runWindowFullSizeWithCapabilities(firefoxCapabilities);
  await runWindowHalfSizeWithCapabilities(firefoxCapabilities);
})();

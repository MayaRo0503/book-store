const { chromeCapabilities, firefoxCapabilities } =
  require("./capabilities").default;
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
  console.log("try to add book...");
  await runAddBookToCartWithCapabilities(chromeCapabilities);
  console.log("try to clear cart...");
  await runClearCartWithCapabilities(chromeCapabilities);
  console.log("try to delete book from cart...");
  await runDeleteBookFromCartWithCapabilities(chromeCapabilities);
  console.log("try delete multiple books from cart...");
  await runDeleteMultipleBooksFromCartWithCapabilities(chromeCapabilities);
  console.log("try search book...");
  await runSearchBookWithCapabilities(chromeCapabilities); // Run new search test
  console.log("try search invalid book..");
  await runSearchInvalidBookWithCapabilities(chromeCapabilities); // Run new invalid search test
  console.log("try FullSize..");
  await runWindowFullSizeWithCapabilities(chromeCapabilities); // Run new full size window test
  console.log("try HalfSize..");
  await runWindowHalfSizeWithCapabilities(chromeCapabilities); // Run new half size window test

  console.log("Testing on Firefox...");
  console.log("try to add book...");
  await runAddBookToCartWithCapabilities(firefoxCapabilities);
  console.log("try to clear cart...");
  await runClearCartWithCapabilities(firefoxCapabilities);
  console.log("try to delete book from cart...");
  await runDeleteBookFromCartWithCapabilities(firefoxCapabilities);
  console.log("try delete multiple books from cart...");
  await runDeleteMultipleBooksFromCartWithCapabilities(firefoxCapabilities);
  console.log("try search book...");
  await runSearchBookWithCapabilities(firefoxCapabilities); // Run new search test
  console.log("try search invalid book..");
  await runSearchInvalidBookWithCapabilities(firefoxCapabilities); // Run new invalid search test
})();

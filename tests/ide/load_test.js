const axios = require("axios");
const { performance } = require("perf_hooks");

const iterations = 1500; // Number of times to run the script

(async function testBookstore() {
  const startTime = performance.now();

  try {
    for (let i = 0; i < iterations; i++) {
      const iterationStartTime = performance.now();
      await axios.get("https://book-store-5l9x.onrender.com");
      const iterationEndTime = performance.now();

      console.log(`Iteration=${i}`);
      console.log(
        `Page load time: ${(iterationEndTime - iterationStartTime) / 1000} sec`
      );
    }
  } catch (e) {
    console.error(e);
  } finally {
    const endTime = performance.now();
    console.log(`Total test duration: ${(endTime - startTime) / 1000} sec`);
  }
})();

describe("Load Test", function () {
  it("should return true", function () {
    assert.strictEqual(true, true);
  });
});

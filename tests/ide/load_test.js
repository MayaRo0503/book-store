const iterations = 1500; // Number of times to run the script

for (let i = 0; i < iterations; i++) {
    // Add to cart functionality check
    const X = Date.now(); // Use Date.now() to get current time
    await driver.findElement(By.css("#bookList .book button")).click();
    await driver.sleep(50);
    let cartItem = await driver
        .findElement(By.css("#cartItems li"))
        .getText();
    assert.equal("Book 1 - $10.99Delete", cartItem.trim()); // Adjusted expected value
    const Y = Date.now(); // Use Date.now() to get current time

    console.log("iteration=" + i);
    console.log(`Time Between clicks: ${Y - X} milsec`);
}
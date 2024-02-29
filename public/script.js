const books = [
  { title: "Book 1", author: "Author 1", price: 10.99, image: "book1.jpg" },
  { title: "Book 2", author: "Author 2", price: 12.99, image: "book2.jpg" },
  { title: "Book 3", author: "Author 3", price: 10.99, image: "book3.jpg" },
  { title: "Book 4", author: "Author 4", price: 20.5, image: "book4.jpg" },
  { title: "Book 5", author: "Author 5", price: 2.2, image: "book5.jpg" },
  { title: "Book 6", author: "Author 6", price: 80.0, image: "book6.jpg" },
  { title: "Book 7", author: "Author 7", price: 10.99, image: "book7.jpg" },
  { title: "Book 8", author: "Author 8", price: 12.99, image: "book8.jpg" },
  { title: "Book 9", author: "Author 9", price: 10.99, image: "book9.jpg" },
  { title: "Book 10", author: "Author 10", price: 20.5, image: "book10.jpg" },
  { title: "Book 11", author: "Author 11", price: 2.2, image: "book11.jpg" },
  { title: "Book 12", author: "Author 12", price: 80.0, image: "book12.jpg" },
  { title: "Book 13", author: "Author 13", price: 10.99, image: "book13.jpg" },
  { title: "Book 14", author: "Author 14", price: 12.99, image: "book14.jpg" },
  { title: "Book 15", author: "Author 15", price: 10.99, image: "book15.jpg" },
  { title: "Book 16", author: "Author 16", price: 20.5, image: "book16.jpg" },
  { title: "Book 17", author: "Author 17", price: 2.2, image: "book17.jpg" },
  { title: "Book 18", author: "Author 18", price: 80.0, image: "book18.jpg" },
  { title: "Book 19", author: "Author 19", price: 20.5, image: "book19.jpg" },
  { title: "Book 20", author: "Author 20", price: 2.2, image: "book20.jpg" },
];

function searchBooks() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchInput)
  );
  displayBooks(filteredBooks);
}

function displayBooks(books) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "book";
    bookElement.innerHTML = `
      <img src="images/${book.image}" alt="${book.title}">
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Price: $${book.price.toFixed(2)}</p>
      <button onclick="addToCart('${book.title}', ${
      book.price
    })">Add to Cart</button>
    `;
    bookList.appendChild(bookElement);
  });
}

// Initially display all books
displayBooks(books);

function addToCart(title, price) {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  const li = document.createElement("li");
  li.textContent = `${title} - $${price.toFixed(2)}`;

  // Add delete button for each cart item
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = function () {
    cartItems.removeChild(li);
    updateTotal();
  };

  li.appendChild(deleteBtn); // Append delete button to cart item

  cartItems.appendChild(li);

  let total = parseFloat(cartTotal.textContent);
  total += price;
  cartTotal.textContent = total.toFixed(2);
}

function clearCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  cartTotal.textContent = "0.00";
}

function updateTotal() {
  const cartItems = document.querySelectorAll("#cartItems li");
  let total = 0;

  cartItems.forEach((item) => {
    const priceText = item.textContent.split(" - ")[1]; // Extract price from text content
    const price = parseFloat(priceText.substring(1)); // Remove '$' and convert to float
    total += price;
  });

  const cartTotal = document.getElementById("cartTotal");
  cartTotal.textContent = total.toFixed(2);
}

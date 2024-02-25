const books = [
  { title: "Book 1", author: "Author 1", price: 10.99, image: "book1.jpg" },
  { title: "Book 2", author: "Author 2", price: 12.99, image: "book2.jpg" },
  { title: "Book 3", author: "Author 3", price: 10.99, image: "book3.jpg" },
  { title: "Book 4", author: "Author 4", price: 20.50, image: "book4.jpg" },
  { title: "Book 5", author: "Author 5", price: 2.20, image: "book5.jpg" },
  { title: "Book 6", author: "Author 6", price: 80.00, image: "book6.jpg" }
];

function searchBooks() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchInput));
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
      <button onclick="addToCart('${book.title}', ${book.price})">Add to Cart</button>
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

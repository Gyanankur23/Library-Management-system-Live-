let books = [];
let members = [];
let suggestionsData = [];

// Preload suggestions from Open Library
window.onload = () => {
  fetch("https://openlibrary.org/search.json?q=fiction&limit=20")
    .then(res => res.json())
    .then(data => {
      suggestionsData = data.docs.map(doc => ({
        title: doc.title,
        author: doc.author_name ? doc.author_name[0] : "Unknown",
        cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : "https://via.placeholder.com/150",
        price: Math.floor(Math.random() * 500) + 100, // random price for demo
        category: "Fiction"
      }));
      showSuggestions(); // show initial dropdown
    });
};

function showSuggestions() {
  const keyword = document.getElementById("searchBar").value.toLowerCase();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  const filtered = keyword
    ? suggestionsData.filter(b => b.title.toLowerCase().includes(keyword))
    : suggestionsData;

  filtered.slice(0, 10).forEach(b => {
    const div = document.createElement("div");
    div.textContent = b.title;
    div.onclick = () => {
      document.getElementById("searchBar").value = b.title;
      addBookFromSuggestion(b);
      suggestions.innerHTML = "";
    };
    suggestions.appendChild(div);
  });
}

function addBookFromSuggestion(b) {
  const id = "BK-" + (books.length + 1);
  const book = { id, ...b, borrowed: false };
  books.push(book);
  renderBooks();
}

function renderBooks(list = books) {
  const container = document.getElementById("books");
  container.innerHTML = "";
  list.forEach(b => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${b.cover}" alt="Book cover">
      <h3>${b.title}</h3>
      <p>by ${b.author}</p>
      <p>₹${b.price} | ${b.category}</p>
      <p>Status: ${b.borrowed ? "Borrowed" : "Available"}</p>
      <button onclick="${b.borrowed ? `returnBook('${b.id}')` : `borrowBook('${b.id}')`}">
        ${b.borrowed ? "Return" : "Borrow"}
      </button>
    `;
    container.appendChild(card);
  });
}
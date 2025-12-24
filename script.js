let books = [];
let members = [];

function addBook() {
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const id = "BK-" + (books.length + 1);
  books.push({ id, title, author, borrowed: false });
  renderBooks();
}

function addMember() {
  const name = document.getElementById("memberName").value;
  const id = "MB-" + (members.length + 1);
  members.push({ id, name });
  renderMembers();
}

function borrowBook(id) {
  const book = books.find(b => b.id === id);
  if (book && !book.borrowed) {
    book.borrowed = true;
    renderBooks();
  }
}

function returnBook(id) {
  const book = books.find(b => b.id === id);
  if (book && book.borrowed) {
    book.borrowed = false;
    renderBooks();
  }
}

function renderBooks() {
  const list = document.getElementById("books");
  list.innerHTML = "";
  books.forEach(b => {
    const li = document.createElement("li");
    li.textContent = `[${b.id}] ${b.title} by ${b.author} — ${b.borrowed ? "Borrowed" : "Available"}`;
    if (!b.borrowed) {
      const btn = document.createElement("button");
      btn.textContent = "Borrow";
      btn.onclick = () => borrowBook(b.id);
      li.appendChild(btn);
    } else {
      const btn = document.createElement("button");
      btn.textContent = "Return";
      btn.onclick = () => returnBook(b.id);
      li.appendChild(btn);
    }
    list.appendChild(li);
  });
}

function renderMembers() {
  const list = document.getElementById("members");
  list.innerHTML = "";
  members.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `[${m.id}] ${m.name}`;
    list.appendChild(li);
  });
}

let books = [];
let members = [];

function addBook() {
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const price = document.getElementById("bookPrice").value;
  const category = document.getElementById("bookCategory").value;
  const id = "BK-" + (books.length + 1);

  const book = { id, title, author, price, category, borrowed:false, cover:null };
  books.push(book);
  fetchCover(book);
  renderBooks();
}

function addMember() {
  const name = document.getElementById("memberName").value;
  const email = document.getElementById("memberEmail").value;
  const id = "MB-" + (members.length + 1);
  members.push({ id, name, email });
  renderMembers();
}

function borrowBook(id) {
  const book = books.find(b => b.id === id);
  if(book && !book.borrowed){ book.borrowed=true; renderBooks(); }
}
function returnBook(id) {
  const book = books.find(b => b.id === id);
  if(book && book.borrowed){ book.borrowed=false; renderBooks(); }
}

function renderBooks(list=books) {
  const container=document.getElementById("books");
  container.innerHTML="";
  list.forEach(b=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <img src="${b.cover||'https://via.placeholder.com/150'}" alt="Book cover">
      <h3>${b.title}</h3>
      <p>by ${b.author}</p>
      <p>₹${b.price} | ${b.category}</p>
      <p>Status: ${b.borrowed?"Borrowed":"Available"}</p>
      <button onclick="${b.borrowed?`returnBook('${b.id}')`:`borrowBook('${b.id}')`}">
        ${b.borrowed?"Return":"Borrow"}
      </button>
    `;
    container.appendChild(card);
  });
}

function renderMembers() {
  const container=document.getElementById("members");
  container.innerHTML="";
  members.forEach(m=>{
    const div=document.createElement("div");
    div.textContent=`[${m.id}] ${m.name} (${m.email})`;
    container.appendChild(div);
  });
}

// 🔍 Dropdown suggestions
function showSuggestions(){
  const keyword=document.getElementById("searchBar").value.toLowerCase();
  const suggestions=document.getElementById("suggestions");
  suggestions.innerHTML="";
  if(!keyword) return;
  const matches=books.filter(b=>b.title.toLowerCase().includes(keyword)||b.author.toLowerCase().includes(keyword));
  matches.forEach(b=>{
    const div=document.createElement("div");
    div.textContent=b.title;
    div.onclick=()=>{
      document.getElementById("searchBar").value=b.title;
      renderBooks([b]);
      suggestions.innerHTML="";
    };
    suggestions.appendChild(div);
  });
}

// 📚 Fetch cover from Open Library
function fetchCover(book){
  const query=encodeURIComponent(book.title);
  fetch(`https://openlibrary.org/search.json?title=${query}`)
    .then(res=>res.json())
    .then(data=>{
      if(data.docs && data.docs.length>0 && data.docs[0].cover_i){
        book.cover=`https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`;
        renderBooks();
      }
    });
}
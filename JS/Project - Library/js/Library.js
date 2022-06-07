class Book {
  constructor(
    title = 'Unknown',
    author = 'Unknown',
    pages = '0',
    isRead = false
  ) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
  }
};

class Library {
  constructor() {
    this.books = []
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook.title)){
      this.books.push(newBook);
    }
  };

  deleteBook(bookToDelete){
    this.books = this.books.filter((book) => book.title !== bookToDelete.title);
  };

  getBook(title){
    return this.books.find((book) => book.title === title);
  };

  isInLibrary(newBook){
    return this.books.find((book) => book.title === newBook.title);
  };
}

// Find HTML elements and set to variables
const bookGrid = document.getElementById('bookGrid');
const newBookModal = document.getElementById('newBookModal');
const newBookModalOpenBtn = document.getElementById("addBookBtn");
const newBookModalCloseBtn = document.getElementById("newBookModalCloseBtn");
const addBookSubmit = document.getElementById("addBookSubmit");

const createBookCard = (book) => {
  const bookCard = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  bookCard.id = book.title;
  title.id = "bookCardContainerTitle";
  author.id = "bookCardContainerAuthor";
  pages.id = "bookCardContainerPages";
  readBtn.id = "buttonGroupContainerReadBtn";
  removeBtn.id = "buttonGroupContainerRemoveBtn";

  bookCard.classList = "bookCardContainer";
  readBtn.onclick = function(){toggleRead(book);};
  removeBtn.classList = "btn";
  removeBtn.onclick = function(){removeBook(book);};

  title.innerHTML = book.title;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = 'Remove';

  if (book.isRead == true) {
    readBtn.textContent = 'Read';
    readBtn.classList = "btn Read";
  } else {
    readBtn.textContent = 'Not Read';
    readBtn.classList = "btn notRead";
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);
  bookGrid.appendChild(bookCard);
};

const updateBookGrid = () => {
  resetBookGrid();
  for (let book of library.books){
    createBookCard(book);
  }
};

const resetBookGrid = () => {
  bookGrid.innerHTML = '';
};

const toggleRead = (book) => {
  bookIndex = library.books.findIndex(bookToChange => bookToChange.title == book.title)
  if (book.isRead == true){
    library.books[bookIndex].isRead = false;
  }else {
    library.books[bookIndex].isRead = true;
  }
  updateBookGrid();
}

const removeBook = async (book) => {
  const bookContainer = document.getElementById(book.title);
  bookContainer.style.display = 'absolute';

  bookContainer.onclick = function() {
    animate({
      duration: 1000,
      timing: function back(x, timeFraction) {
        return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
      }.bind(null, 1.5),
      draw: function(progress) {
        bookContainer.style.right = progress * screen.width + 'px';
        bookContainer.style.zIndex = '10000';
      }
    });
  };
  const delay = ms => new Promise(res => setTimeout(res, ms));

  await delay(1000);
  library.deleteBook(book);
  updateBookGrid();
};

function animate(options) {
  var start = performance.now();
  requestAnimationFrame(function animate(time) {
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;
    var progress = options.timing(timeFraction)
    options.draw(progress);
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

const openAddBookModal = () => {
  newBookModal.style.display = 'block';
}

const closeAddBookModal = () => {
  newBookModal.style.display = 'none';
}

const getAddBookModalValues = () => {
  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isReadString = document.getElementById('isRead').value;

  if (isReadString == 'true'){
    isRead = true;
  } else {
    isRead = false;
  }

  document.getElementById('bookTitle').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('isRead').value = true;

  library.addBook(new Book(title, author, pages, isRead));
  updateBookGrid();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == newBookModal) {
    newBookModal.style.display = "none";
  }
}

newBookModalOpenBtn.onclick = openAddBookModal;
newBookModalCloseBtn.onclick = closeAddBookModal;
addBookSubmit.onclick = getAddBookModalValues;

const library = new Library();

var newBook1 = new Book("Book1", "Author1", "15", true);
var newBook2 = new Book("Book2", "Author2", "25", false);
var newBook3 = new Book("Book3", "Author3", "25", true);
var newBook4 = new Book("Book4", "Author4", "15", true);
var newBook5 = new Book("Book5", "Author5", "25", false);
var newBook6 = new Book("Book6", "Author6", "25", true);
var newBook7 = new Book("Book7", "Author7", "25", true);
var newBook8 = new Book("Book8", "Author8", "25", true);
var newBook9 = new Book("Book9", "Author9", "25", false);
var newBook10 = new Book("Book10", "Author10", "25", false);

library.addBook(newBook1);
library.addBook(newBook2);
library.addBook(newBook3);
library.addBook(newBook4);
library.addBook(newBook5);
library.addBook(newBook6);
library.addBook(newBook7);
library.addBook(newBook8);
library.addBook(newBook9);
library.addBook(newBook10);

updateBookGrid();

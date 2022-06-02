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
    console.log(this.books)
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
const newBookModalCloseBtn = document.getElementsByClassName("newBookModalCloseBtn")[0];

const createBookCard = (book) => {
  const bookCard = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  bookCard.id = "bookCardContainer";
  title.id = "bookCardContainerTitle";
  author.id = "bookCardContainerAuthor";
  pages.id = "bookCardContainerPages";
  readBtn.id = "buttonGroupContainerReadBtn";
  removeBtn.id = "buttonGroupContainerRemoveBtn";

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

const removeBook = (book) => {
  library.deleteBook(book);
  updateBookGrid();
}

const library = new Library();

var newBook1 = new Book("Book1", "Author1", "15", true);
var newBook2 = new Book("Book2", "Author2", "25", true);
var newBook3 = new Book("Book3", "Author3", "25", true);

library.addBook(newBook1);
library.addBook(newBook2);
library.addBook(newBook3);

updateBookGrid();

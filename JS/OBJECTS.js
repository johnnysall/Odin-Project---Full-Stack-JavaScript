function Book(title, author, numPages, read) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.read = read
    this.sayBook = function() {
        console.log(title)
    }
}

const Hobbit = new Book("The Hobbit", "J.R.R. Tolkien" , "295 pages" , "not read yet")

Hobbit.sayBook();
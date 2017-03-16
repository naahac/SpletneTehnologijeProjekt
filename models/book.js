class Book { 
  constructor(bookID, title, releasedate, authorID) {
    this.bookID = bookID;
    this.title = title;
    this.releasedate = releasedate;
    this.authorID = authorID;
  }
}

module.exports = Book;
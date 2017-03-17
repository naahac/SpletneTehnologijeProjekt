var Author = require('./author')

var books = []
var booksId = 1;

class Book { 
  constructor(bookId, title, releasedate, authorId) {
    this.bookId = bookId;
    this.title = title;
    this.releasedate = releasedate;
    this.authorId = authorId;
  }

  static getBookById(bookId) {
    return books.find(function(o){ return o.bookId==bookId;});
  }

  static getUsers() {
    return books;
  }

  static createBook(title, releasedate, authorId){
      if(Author.getAuthorById(authorId) == undefined)
      return false;

      books.push(new Book(booksId++, title, releasedate, authorId))
      return false;
    }

  static updateBook(bookId, title, releasedate, authorId){
    var index = users.indexOf(this.getUserById(bookId));
    users[index] =  new User(bookId, title, releasedate, authorId);
  }

  static deleteBook(bookId) {
    var index = users.indexOf(this.getBookById(bookId));
    if (index > -1) {
        users.splice(index, 1);
    }
  }
}

module.exports = Book;
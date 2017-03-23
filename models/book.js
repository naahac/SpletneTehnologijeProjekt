var Author = require('./author')

var db = require('../database/database');

class Book {
	constructor(bookId, title, releasedate, authorId) {
		this.bookId = bookId;
		this.title = title;
		this.releasedate = releasedate;
		this.authorId = authorId;
	}

	static getBook(bookId) {
		return db.books.find(function (o) { return o.bookId == bookId; });
	}

	static getUsers() {
		return db.books;
	}

	static createBook(title, releasedate, authorId) {
		if (Author.getAuthorById(authorId) == undefined)
			return false;

		db.books.push(new Book(booksId++, title, releasedate, authorId))
		return false;
	}

	static updateBook(bookId, title, releasedate, authorId) {
		var index = db.books.indexOf(this.getBookById(bookId));
		db.books[index] = new Book(bookId, title, releasedate, authorId);
	}

	static deleteBook(bookId) {
		var index = db.books.indexOf(this.getBookById(bookId));
		if (index > -1) {
			db.books.splice(index, 1);
		}
	}
}

var booksId = 1;

module.exports = Book;
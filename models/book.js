var db = require('../database/database');
var Author = require('./author')

class Book {
	constructor(bookId, title, releasedate, authorId) {
	    if(bookId !== null)
		    this.bookId = bookId;
		this.title = title;
		this.releasedate = releasedate;
        if(bookId !== null)
		    this.authorId = authorId;
	}

    static getBooks(callback) {
        new db.Books()
            .fetchAll()
            .then((models) => {
                if(models == null)
                    callback({success: false});
                else
                    callback({success: true, data: models});
            })
            .catch(() => {
                callback({success: false});
            });
    }

	static getBook(bookId, callback) {
        new db.Books({bookId : bookId})
            .fetch()
            .then((model) => {
                if(model == null)
                    callback({success: false});
                else
                    callback({success: true, data: model});
            })
            .catch(() => {
                callback({success: false});
            });
	}

	static createBook(title, releasedate, authorId, callback) {
        let book = new Book(undefined, title, releasedate, undefined);
        new db.Books(book)
            .save(null, { method: 'insert' })
            .then(() => {
                callback({success:true});
            })
            .catch(() => {
                callback({success: false})
            });
		return false;
	}

	static updateBook(bookId, title, releasedate, authorId, callback) {
        new db.Books({bookId: bookId})
            .save({
                title: title,
                releasedate:releasedate
            })
            .then(() => {
                callback({success:true});
            })
            .catch(() => {
                callback({success: false})
            });
	}

	static deleteBook(bookId, callback) {
        new db.Books({bookId: bookId})
            .destroy()
            .then(() => {
                console.log("book deleted");
                callback({success:true});
            })
            .catch(() => {
                callback({success:false});
            });
	}
}

module.exports = Book;
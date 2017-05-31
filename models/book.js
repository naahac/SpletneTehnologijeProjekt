var db = require('../database/database');
var Author = require('./author')

class Book {
	constructor(bookId, title, genreId, authorId) {
	    if(bookId !== null)
		    this.bookId = bookId;
		this.title = title;
		this.genreId = genreId;
        if(authorId !== null)
		    this.authorId = authorId;
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

    static search(title, author, callback) {
        title = '%' + title + '%';

        if(author == null){
            new db.Books()
            .where('title', 'LIKE', title)
            .fetchAll()
            .then((models) => {
                if(models == null)
                    callback({success: false});
                else
                    callback({success: true, data: models});
            })
            .catch((error) => {
                callback({success: false});
            });
        } else{
            new db.Books()
            .query(function(qb) {
                qb.where('title', 'LIKE', title).where('authorId', '=', author);
            }).fetchAll()
            .then((models) => {
                if(models == null)
                    callback({success: false});
                else
                    callback({success: true, data: models});
            })
            .catch((error) => {
                callback({success: false});
            });
        }
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

	static getBooksByUserId(userId, callback) {
        new db.Books({userId: userId})
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

    static insertBook(bookId, title, genreId, authorId, callback) {
        let book;
        
        if(bookId != null){
            book = new Book(bookId, title, genreId, authorId);
        }else{
            book = new Book(null, title, genreId, authorId);
        }

        new db.Books(book)
        .save()
        //null, {  }
        .then((model) => {
            callback({success:true, data: model});
        })
        .catch((error) => {
            callback({success:false});
        });
    }
    
	// static createBook(title, genreId, authorId, callback) {
    //     let book = new Book(undefined, title, genreId, undefined);
    //     new db.Books(book)
    //         .save(null, { method: 'insert' })
    //         .then(() => {
    //             callback({success:true});
    //         })
    //         .catch(() => {
    //             callback({success: false})
    //         });
	// 	return false;
	// }

	// static updateBook(bookId, title, genreId, authorId, callback) {
    //     new db.Books({bookId: bookId})
    //         .save({
    //             title: title,
    //             genreId:genreId
    //         })
    //         .then(() => {
    //             callback({success:true});
    //         })
    //         .catch(() => {
    //             callback({success: false})
    //         });
	// }

	static deleteBook(bookId, callback) {
        new db.Books({bookId: bookId})
            .destroy()
            .then(() => {
                callback({success:true});
            })
            .catch(() => {
                callback({success:false});
            });
	}
}

module.exports = Book;
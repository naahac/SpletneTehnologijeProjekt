var token = require('./token');
var book = require('./book.js');

var db = require('../database/database');

class UserLikesBook {
	constructor(userlikesbookId, userId, bookId) {
		this.userlikesbookId = userlikesbookId;
		this.userId = userId;
		this.bookId = bookId;
	}

	static getItems(tokenId) {
		return db.userLikesBooks.filter(function (o) { return o.userId == token.getUserId(tokenId); });
	}

	static getItem(tokenId, bookId) {
		return db.userLikesBooks.filter(function (o) { return o.userId == token.getUserId(tokenId) && o.bookId == bookId; });
	}

	static likeBook(tokenId, bookId) {
		var userId = token.getUserId(tokenId);
		if (userId == -1)
			return false

		if (book.getBook(bookId) == undefined)
			return false;

		if (this.getItem(tokenId, bookId) != undefined) return true;

		db.userLikesBooks.push(new UserLikesBook(userLikesBooksId++, token.getUserId(tokenId), bookId));
		return true;
	}

	static unlikeBook(tokenId, bookId) {
		var item = this.getItem(tokenId, bookId);
		var index = db.userLikesBooks.indexOf(item);
		if (index > -1) {
			db.userLikesBooks.splice(index, 1);
		}
	}
}

var userLikesBooksId = 1;

module.exports = UserLikesBook;
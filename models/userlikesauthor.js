var token = require('./token');
var author = require('./author.js');

var db = require('../database/database');

class UserLikesAuthor {
	constructor(userlikesauthorId, userId, authorId) {
		this.userlikesauthorId = userlikesauthorId;
		this.userId = userId;
		this.authorId = authorId;
	}

	static getItems(tokenId) {
		return db.userLikesAuthors.filter(function (o) { return o.userId == token.getUserId(tokenId); });
	}

	static getItem(tokenId, authorId) {
		return db.userLikesAuthors.filter(function (o) { return o.userId == token.getUserId(tokenId) && o.authorId == authorId; });
	}

	static likeAuthor(tokenId, authorId) {
		var userId = token.getUserId(tokenId);
		if (userId == -1)
			return false

		if (author.getAuthor(authorId) == undefined)
			return false;

		if (this.getItem(tokenId, authorId) != undefined) return true;

		db.userLikesAuthors.push(new UserLikesAuthor(userLikesAuthorsId++, token.getUserId(tokenId), authorId));
		return true;
	}

	static unlikeAuthor(tokenId, authorId) {
		var item = this.getItem(tokenId, authorId);
		var index = db.userLikesAuthors.indexOf(item);
		if (index > -1) {
			db.userLikesAuthors.splice(index, 1);
		}
	}
}

var userLikesAuthorsId = 1;

module.exports = UserLikesAuthor;
var token = require('./token');
var genre = require('./genre.js');

var db = require('../database/database');

class UserLikesGenre {
	constructor(userlikesgenreId, userId, genreId) {
		this.userlikesgenreId = userlikesgenreId;
		this.userId = userId;
		this.genreId = genreId;
	}

	static getItems(tokenId) {
		return db.userLikesGenres.filter(function (o) { return o.userId == token.getUserId(tokenId); });
	}

	static getItem(tokenId, genreId) {
		return db.userLikesGenres.filter(function (o) { return o.userId == token.getUserId(tokenId) && o.genreId == genreId; });
	}

	static likeGenre(tokenId, genreId) {
		var userId = token.getUserId(tokenId);
		if (userId == -1)
			return false

		if (genre.getGenre(genreId) == undefined)
			return false;

		if (this.getItem(tokenId, authorId) != undefined) return true;

		db.userLikesGenres.push(new UserLikesGenre(userLikesGenresId++, token.getUserId(tokenId), genreId));
		return true;
	}

	static unlikeGenre(tokenId, genreId) {
		var item = this.getItem(tokenId, genreId);
		var index = db.userLikesGenres.indexOf(item);
		if (index > -1) {
			db.userLikesGenres.splice(index, 1);
		}
	}
}

var userLikesGenresId = 1;

module.exports = UserLikesGenre;
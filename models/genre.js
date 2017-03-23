var db = require('../database/database');

class Genre {
	constructor(genreId, genre) {
		this.genreId = genreId;
		this.genre = genre;
	}

	static getGenre(genreId) {
		return db.genres.find(function (o) { return o.genreId == genreId; });
	}

	static getGenres() {
		return db.genres;
	}

	static createGenre(genre) {
		db.genres.push(new Genre(genresId++, genre))
	}

	static updateGenre(genreId, genre) {
		var index = db.genres.indexOf(this.getGenreById(genreId));
		db.genres[index] = new Genre(genreId, genre);
	}

	static deleteGenre(genreId) {
		var index = db.genres.indexOf(this.getGenreById(genreId));
		if (index > -1) {
			db.genres.splice(index, 1);
		}
	}
}

var genresId = 1;

module.exports = Genre;
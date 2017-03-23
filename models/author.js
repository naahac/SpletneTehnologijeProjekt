var Person = require('./person.js');

var db = require('../database/database');

class Author extends Person {
	constructor(personId, name, surname, birthDate, pseudonym) {
		super(personId, name, surname, birthDate);
		this.pseudonym = pseudonym;
	}

	static getAuthor(personId) {
		return db.authors.find(function (o) { return o.personId == personId; });
	}

	static getAuthors() {
		return db.authors;
	}

	static createAuthor(name, surname, birthDate) {
		db.authors.push(new Author(authorsId++, name, surname, birthDate))
	}

	static updateAuthor(personId, name, surname, birthDate) {
		var index = db.authors.indexOf(this.getAuthorById(personId));
		db.authors[index] = new Author(personId, name, surname, birthDate);
	}

	static deleteAuthor(personId) {
		var index = db.authors.indexOf(this.getAuthorById(personId));
		if (index > -1) {
			db.authors.splice(index, 1);
		}
	}
}

var authorsId = 1;

module.exports = Author;
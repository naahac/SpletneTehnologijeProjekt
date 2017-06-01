var db = require('../database/database');

class Author {
	constructor(authorId, author) {
		//super(personId, name, surname, birthDate);
		this.authorId = authorId;
		this.author = author;
	}

	// static getAuthor(personId) {
	// 	return db.authors.find(function (o) { return o.personId == personId; });
	// }

	// static getAuthors() {
	// 	return db.authors;
	// }

	static createAuthor(author, callback) {
        new db.Authors({author: author})
        .fetch()
        .then((existingModel) => {
			if(existingModel == null) {
				new db.Authors({author: author})
				.save()
				.then((model) => {
					callback({success:true, data: model});
				})
				.catch((error) => {
					callback({success:false});
				});
			} else {
				callback({success:true, data: existingModel});
			}
        })
        .catch((error) => {
            callback({success:false});
        });
    }

	static search(author, callback) {
        author = '%' + title + '%';

		new db.Authors()
		.where('author', 'LIKE', author)
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
}

module.exports = Author;
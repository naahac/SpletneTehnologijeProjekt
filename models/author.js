var Person = require('./person.js');

var authors = []
var authorsId = 1;

class Author extends Person {
    constructor(personId, name, surname, birthDate, pseudonym){
        super(personId, name, surname, birthDate);
        this.pseudonym = pseudonym;
    }

  static getAuthorById(personId) {
    return authors.find(function(o){ return o.personId==personId;});
  }

  static getAuthors() {
    return authors;
  }

  static updateAuthor(personId, title, releasedate, authorId){
    var index = users.indexOf(this.getUserById(personId));
    users[index] =  new User(personId, title, releasedate, authorId);
  }

  static deleteAuthor(personId) {
    var index = users.indexOf(this.getAuthorById(personId));
    if (index > -1) {
        users.splice(index, 1);
    }
  }
}

module.exports = Author;
var Person = require('./person.js')

class Author extends Person {
    constructor(personId, name, surname, birthDate, pseudonym){
        super(personId, name, surname, birthDate);
        this.pseudonym = pseudonym;
    }
}

module.exports = Author;
var Person = require('./person.js')

class Author extends Person {
    constructor(personID, name, surname, birthDate, pseudonym){
        super(personID, name, surname, birthDate);
        this.pseudonym = pseudonym;
    }
}

module.exports = Author;
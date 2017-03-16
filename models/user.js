var Person = require('./person.js')

class User extends Person {
    constructor(personId, name, surname, birthDate, location){
        super(personId, name, surname, birthDate);
        this.location = location;
    }
}

module.exports = User;
var Person = require('./person.js')

var users = []
var usersId = 0;

class User extends Person {
    constructor(personId, name, surname, birthDate, location){
        super(personId, name, surname, birthDate);
        this.location = location;
    }

    static insertUser(name, surname, birthDate, location){
        users.push(new User(usersId++,name,surname,birthDate,location))
    }

    static getUserById(personId) {
        return users.find(o => o.personId === personId);
    }
}

module.exports = User;
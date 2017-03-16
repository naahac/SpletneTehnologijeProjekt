var Person = require('./person.js')

var users = []
var usersId = 1;

class User extends Person {
    constructor(personId, name, surname, birthDate, location){
        super(personId, name, surname, birthDate);
        this.location = location;
    }

    static createUser(name, surname, birthDate, location){
        users.push(new User(usersId++,name,surname,birthDate,location))
    }

    static getUserById(personId) {
        return users.find(o => o.personId === personId);
    }

    static deleteUser(personID) {
        var index = users.indexOf(this.getUserById(personID));
        if (index > -1) {
            users.splice(index, 1);
        }
    }
}

module.exports = User;
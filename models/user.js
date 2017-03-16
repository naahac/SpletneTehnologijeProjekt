var Person = require('./person.js')

var users = []
var usersId = 0;

class User extends Person {
    constructor(personID, name, surname, birthDate, location){
        super(personID, name, surname, birthDate);
        this.location = location;
    }

    static insertUser(name, surname, birthDate, location){
        users.push(new User(usersId++,name,surname,birthDate,location))
    }

    static updateUser(personID, name, surname, birthDate, location){
        var index = users.indexOf(this.getUserById(personID));
        users[index] =  new User(personID,name,surname,birthDate,location);
    }

    static getUserById(personID) {
        return users.find(function(value){ return value.personID==personID;});
    }
}

module.exports = User;
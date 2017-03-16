var Person = require('./person.js')

var users = []
var usersId = 1;

class User extends Person {
    constructor(personID, name, surname, birthDate, location){
        super(personID, name, surname, birthDate);
        this.location = location;
    }

    static createUser(name, surname, birthDate, location){
        users.push(new User(usersId++,name,surname,birthDate,location))
    }

    static getUserById(personID) {
        return users.find(function(value){ return value.personID==personID;});
    }

    static updateUser(personID, name, surname, birthDate, location){
        var index = users.indexOf(this.getUserById(personID));
        users[index] =  new User(personID,name,surname,birthDate,location);
    }

    static deleteUser(personID) {
        var index = users.indexOf(this.getUserById(personID));
        if (index > -1) {
            users.splice(index, 1);
        }
    }
}

users.push(new User(usersId++,"Ime","Priimek","8.3.1992","Maribor"));

module.exports = User, users;
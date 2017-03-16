var Person = require('./person.js')
var Token = require('./token')

var users = []
var usersId = 1;

class User extends Person {
    constructor(personID, name, surname, birthDate, username, password, email, location){
        super(personID, name, surname, birthDate);
        this.location = location;

    }

    static getUserById(personID) {
        return users.find(function(value){ return value.personID==personID;});
    }

    static updateUser(personID, name, surname, birthDate, username, password, email, location){
        var index = users.indexOf(this.getUserById(personID));
        users[index] =  new User(personID, name, surname, birthDate, username, password, email, location);
    }

    static deleteUser(personID) {
        var index = users.indexOf(this.getUserById(personID));
        if (index > -1) {
            users.splice(index, 1);
        }
    }

    static Register(name, surname, birthDate, username, password, email, location){
        users.push(new User(usersId++, name, surname, birthDate, username, password, email, location))
    }

    static login(username, password){
        var user = users.find(function(value){ return o.username==username && o.password == password;});

        if(user!=undefined){
            var token = Token.getActiveTokenByUserId(user.personID);

            if(token==undefined)
                token = Token.createToken(user.personID);

            return token.tokenID;
        }
    }

  static logout(tokenID){
      Token.changeStatus(tokenID);
  }
}

users.push(new User(usersId++,"Ime","Priimek","8.3.1992","Maribor"));

module.exports = User;
var Person = require('./person.js')
var Token = require('./token')

var users = []
var usersId = 1;

class User extends Person {
    constructor(personId, name, surname, birthDate, username, password, email, location){
        super(personId, name, surname, birthDate);
        this.location = location;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    static getUserById(personId) {
        return users.find(function(o){ return o.personId==personId;});
    }

    static getUserByTokenId(tokenId) {
        return users.find(function(o){ return o.personId==Token.getUserIdByTokenId(tokenId);});
    }

    static getUserIdByTokenId(tokenId) {
        return users.find(function(o){ return o.personId==Token.getUserIdByTokenId(tokenId);}).personId;
    }

    static getUsers() {
        return users;
    }

    static updateUser(personId, name, surname, birthDate, username, password, email, location){
        var index = users.indexOf(this.getUserById(personId));
        users[index] =  new User(personId, name, surname, birthDate, username, password, email, location);
    }

    static deleteUser(personId) {
        var index = users.indexOf(this.getUserById(personId));
        if (index > -1) {
            users.splice(index, 1);
        }
    }

    static Register(name, surname, birthDate, username, password, email, location){
        users.push(new User(usersId++, name, surname, birthDate, username, password, email, location))
    }

    static login(username, password){
        var user = users.find(function(o){ return o.username==username && o.password == password;});

        if(user!=undefined){
            var token = Token.getActiveTokenByUserId(user.personId);

            if(token==-1){
                token = Token.createToken(user.personId);
                return token;
            }

            return token.tokenId;
        }

        return -1;
    }

  static logout(tokenId){
      Token.changeStatus(tokenId);
  }
}

users.push(new User(usersId++,"Ime","Priimek","8.3.1992", "test", "test", "test@test.com", "Maribor"));

module.exports = User;
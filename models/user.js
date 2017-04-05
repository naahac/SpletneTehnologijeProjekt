var Person = require('./person.js');

var db = require('../database/database');
let knex = require('knex')(require('../knexfile').development);
let bookshelf = require('bookshelf')(knex);
let Users = bookshelf.Model.extend({
    tableName: 'users'
});

class User extends Person {
    constructor(personId, name, surname, birthDate, username, password, email, location) {
        super(personId, name, surname, birthDate);
        this.location = location;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    static getUser(personId) {
        return db.users.find(function (o) { return o.personId == personId; });
    }

    static getUsers() {
        return db.users;
    }

    static updateUser(personId, name, surname, birthDate, username, password, email, location) {
        var index = db.users.indexOf(this.getUser(personId));
        db.users[index] = new User(personId, name, surname, birthDate, username, password, email, location);
    }

    static deleteUser(personId) {

        // var index = db.users.indexOf(this.getUser(personId));
        // if (index > -1) {
        //     db.users.splice(index, 1);
        // }
    }

    static createUser(name, surname, birthDate, username, password, email, location) {
        let user = new User(undefined, name, surname, birthDate, username, password, email, location);
        new Users(user).save(null, {method: 'insert'});
        // db.users.push(new User(usersId++, name, surname, birthDate, username, password, email, location))
    }

    static checkLoginData(username, password) {
        var user = db.users.find(function (o) { return o.username == username && o.password == password; });

        if (user == undefined) return -1;

        return user.personId;
    }
}

var usersId = 1;
db.users.push(new User(usersId++, "Ime", "Priimek", "8.3.1992", "test", "test", "test@test.com", "Maribor"));

module.exports = User;
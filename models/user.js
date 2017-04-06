'use strict';
var Person = require('./person.js');

var db = require('../database/database');
let knex = require('knex')(require('../knexfile').development);
let bookshelf = require('bookshelf')(knex);
let Tokens = bookshelf.Model.extend({
    tableName: 'token',
    user: function (){
        return this.belongsTo(Users, 'personId')
    }
});
let Users = bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'personId',
    token: function() {
        return this.hasMany(Tokens, 'personId');
    }
});

class User extends Person {
    constructor(personId, name, surname, birthDate, username, password, email, location) {
        super(personId, name, surname, birthDate);
        this.location = location;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    static getUser(personId, callback) {
        new Users({personId : personId}).fetch({withRelated: ['token']}).then((model) => {
            callback(model.related('token').toJSON());
        });
    }

    static getUsers(callback) {
        new Users.fetch().then((data) => {
            callback(data);
        });
    }

    static updateUser(personId, name, surname, birthDate, username, password, email, location) {
        var index = db.users.indexOf(this.getUser(personId));
        db.users[index] = new User(personId, name, surname, birthDate, username, password, email, location);
    }

    static deleteUser(personId, callback) {
        new Users().where('personId', personId).destroy().then(() => {
            console.log("user deleted");
        });
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
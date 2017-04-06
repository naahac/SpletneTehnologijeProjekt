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

    static createUser(name, surname, birthDate, username, password, email, location, callback) {
        User.checkUsername(username, (usernameExists) => {
            if (usernameExists) {
                callback(false);
                return;
            }

            let user = new User(undefined, name, surname, birthDate, username, password, email, location);
            new Users(user).save(null, { method: 'insert' });

            callback(true);
        });
    }

    static checkUsername(username, callback) {
        new Users({ 'username': username })
            .fetch()
            .then((model) => {
                if (model == null)
                    callback(false);
                else
                    callback(true);
            })
            .catch((err) => {
                callback(false);
            });
    }



    static getUserIdByLoginData(username, password, callback) {
        new Users({ 'username': username, 'password': password })
            .fetch()
            .then((model) => {
                if (model == null)
                    callback({success:false});
                
                callback({success:true, data:model.get('personId')});
            })
            .catch((err) => {
                callback({success:false});
            });
    }
}

module.exports = User;
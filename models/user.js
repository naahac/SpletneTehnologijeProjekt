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



    static getUserIdByLoginData(username, password) {
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
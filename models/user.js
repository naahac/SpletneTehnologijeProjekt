var db = require('../database/database');
var Person = require('./person.js');

class User extends Person {
    constructor(personId, name, surname, birthDate, username, password, email) {
        super(personId, name, surname, birthDate);  
        this.username = username;
        this.password = password;
        this.email = email;
    }

    static getUser(personId, callback) {
        new db.Users({personId : personId})
        .fetch()
        .then((model) => {
            if(model == null)
                callback({success: false});
            else
                callback({success: true, data :model});
        });
    }

    static createUser(name, surname, birthDate, username, password, email, callback) {
        User.checkUsername(username, (usernameExists) => {
            if (this.usernameExists) {
                callback({success:false, status: 'username already exists'});
                return;
            }

            if (username.length > 20) {
                callback({success:false, status: 'username is too long'});
                return;
            }

            if (!this.validateEmail(email)) {
                callback({success:false, status: 'email not valid'});
                return;
            }

            let user = new User(undefined, name, surname, birthDate, username, password, email, location);
            new db.Users(user).save(null, { method: 'insert' });

            callback({success:true});
        });
    }

    static updateUser(personId, name, surname, birthDate, email, location, callback) {
        new db.Users({ personId: personId })
			.save({ personId:personId, name:name, surname:surname, 
                birthDate:birthDate,
                email:email, location:location }, {patch: true})
			.then((model) => {
				if (model == null)
					callback({ success: false });
                else
				    callback({ success: true });
			})
			.catch((err) => {
				callback({ success: false });
			});
    }

    static changePassword(personId, oldPassword, newPassword, callback) {
        new db.Users({ personId: personId, password:oldPassword })
            .save({ personId:personId, password:newPassword }, {patch: true})
            .then((model) => {
                if (model == null)
                    callback({ success: false });
                else
                    callback({ success: true });
            })
            .catch((err) => {
                callback({ success: false });
            });
    }

    static deleteUser(personId, callback) {
        new db.Users()
        .where('personId', personId)
        .destroy()
        .then(() => {
            callback({success:true});
        })
        .catch( (err) => {
            callback({success:false});
        });
    }

    static checkUsername(username, callback) {
        new db.Users({ 'username': username })
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
        new db.Users({ 'username': username, 'password': password })
            .fetch()
            .then((model) => {
                if (model == null)
                    callback({success:false});
                else
                    callback({success:true, data:model.get('personId')});
            })
            .catch((err) => {
                callback({success:false});
            });
    }

    static validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}

module.exports = User;
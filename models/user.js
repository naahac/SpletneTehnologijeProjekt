var db = require('../database/database');
var Person = require('./person.js');

class User extends Person {
    constructor(personId, name, surname, birthDate, username, password, email, location) {
        super(personId, name, surname, birthDate);
        this.location = location;
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

    static updateUser(personId, name, surname, birthDate, username, password, email, location, callback) {
        new db.Users({ personId: personId })
			.save({ personId:personId, name:name, surname:surname, 
                birthDate:birthDate, username:username, password:password, 
                email:email, location:location }, {patch: true})
			.then((model) => {
				if (model == null)
					callback({ success: false });

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

    static createUser(name, surname, birthDate, username, password, email, location, callback) {
        User.checkUsername(username, (usernameExists) => {
            if (usernameExists) {
                callback(false);
                return;
            }

            let user = new User(undefined, name, surname, birthDate, username, password, email, location);
            new db.Users(user).save(null, { method: 'insert' });

            callback(true);
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
                
                callback({success:true, data:model.get('personId')});
            })
            .catch((err) => {
                callback({success:false});
            });
    }
}

module.exports = User;
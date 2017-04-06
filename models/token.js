var db = require('../database/database');
let knex = require('knex')(require('../knexfile').development);
let bookshelf = require('bookshelf')(knex);
let Tokens = bookshelf.Model.extend({
	tableName: 'Token'
});

class Token {
	constructor(tokenId, createDate, active, userId) {
		this.tokenId = tokenId;
		this.createDate = createDate;
		this.active = active;
		this.userId = userId;
	}

	static login(userId, callback) {
		this.getActiveTokenIdByUserId(userId, (result) => {
			if (!result.success) {
				this.createToken(userId, (result) => {
					callback(result);
				});
			}

			result.data = result.data.get('tokenId');
			callback(result);
		});

		// var token = this.getActiveTokenByUserId(userId);

		// if (token == -1) {
		// 	token = this.createToken(userId);
		// 	return token;
		// }

		// return token.tokenId;
	}

	static logout(tokenId, callback) {
		let user = new User(undefined, name, surname, birthDate, username, password, email, location);

		new Tokens({ tokenId: tokenId })
			.save({ active: true })
			.then((model) => {
				if (model == null)
					callback({ success: false });

				callback({ success: true });
			})
			.catch((err) => {
				callback({ success: false });
			});

		// User.checkUsername(username, (usernameExists) => {
		//     if (usernameExists) {
		//         callback(false);
		//         return;
		//     }

		//     let user = new User(undefined, name, surname, birthDate, username, password, email, location);
		//     new Users(user).save();

		//     callback(true);
		// });


		// var token = this.getToken(tokenId);

		// if (token == undefined) return false;

		// var index = db.tokens.indexOf(token);
		// db.tokens[index].active = false;

		// return true;
	}

	static createToken(userId) {
		tokenId = this.CreateGUID();

		let token = new Token(tokenId, Date.now(), true, userId);

		new Tokens(token)
			.save(null, { method: 'insert' })
			.then((model) => {
				callback({ success: true, data: tokenId });
			})
			.catch((err) => {
				callback({ success: false });
			});

	}

	static isActive(tokenId) {
		var token = db.tokens.find(function (o) { return o.tokenId == tokenId && o.active == true; });

		if (token == undefined) return false;

		return true;
	}

	static getToken(tokenId) {
		return db.tokens.find(function (o) { return o.tokenId == tokenId; });
	}

	static getActiveTokenIdByUserId(userId) {
		new Tokens({ 'userId':userId, 'active':true })
			.fetch()
			.then((model) => {
				if (model == null)
					callback({success:false});
				else
					callback({success:true, data:model.get('tokenId')});
			})
			.catch((err) => {
				callback({success:false});
			});
	}

	static getUserId(tokenId) {
		var token = db.tokens.find(function (o) { return o.tokenId == tokenId && o.active == true; });

		if (token == undefined)
			token = -1;

		return token.userId;
	}

	static S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	static CreateGUID() {
		return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
	}
}

module.exports = Token;
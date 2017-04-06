var db = require('../database/database');
let knex = require('knex')(require('../knexfile').development);
let bookshelf = require('bookshelf')(knex);
let Tokens = bookshelf.Model.extend({
	tableName: 'Token',
	idAttribute: 'tokenId'
});

class Token {
	constructor(tokenId, createDate, active, userId) {
		this.tokenId = tokenId;
		this.createDate = createDate;
		this.active = active;
		this.personId = userId;
	}

	static login(userId, callback) {
		this.getActiveTokenIdByUserId(userId, (result) => {
			if (!result.success) {
				this.createToken(userId, (result) => {
					callback(result);
				});
			}else
				callback(result);
		});
	}

	static logout(tokenId, callback) {
		new Tokens({ tokenId: tokenId })
			.save({ active: false }, {patch: true})
			.then((model) => {
				if (model == null)
					callback({ success: false });

				callback({ success: true });
			})
			.catch((err) => {
				callback({ success: false });
			});
	}

	static createToken(userId, callback) {
		let tokenId = this.CreateGUID();
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

	static isActive(tokenId, callback) {
		new Tokens({ 'tokenId':tokenId, 'active':true })
			.fetch()
			.then((model) => {
				if (model == null)
					callback({success:false});
				else
					callback({success:true});
			})
			.catch((err) => {
				callback({success:false});
			});
	}

	static getToken(tokenId) {
		return db.tokens.find(function (o) { return o.tokenId == tokenId; });
	}

	static getActiveTokenIdByUserId(userId, callback) {
		new Tokens({ 'personId':userId, 'active':true })
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
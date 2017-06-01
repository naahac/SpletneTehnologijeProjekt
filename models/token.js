var db = require('../database/database');

class Token {
	constructor(tokenId, createDate, active, userId) {
		this.tokenId = tokenId;
		this.createDate = createDate;
		this.active = active;
		this.personId = userId;
	}

	static login(userId, callback) {
		this.logoutByUserId(userId, (result) => {
			if(result.success){
				this.createToken(userId, (createTokenResponse) => {
				callback(createTokenResponse);
				});
			} else {
				callback(result);
			}
		});
	}

	static logout(tokenId, callback) {
		new db.Tokens({ tokenId: tokenId })
			.save({ active: false }, {patch: true})
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

	static logoutByUserId(personId, callback) {
		new db.Tokens()
			.where('personId', personId)
			.save({ active: false }, {patch: true, require: false})
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

	static createToken(userId, callback) {
		let tokenId = this.CreateGUID();
		let token = new Token(tokenId, Date.now(), true, userId);

		new db.Tokens(token)
			.save(null, { method: 'insert' })
			.then((model) => {
				callback({ success: true, data: model });
			})
			.catch((err) => {
				callback({ success: false });
			});
	}

	static getActiveToken(tokenId, callback) {
		new db.Tokens({ 'tokenId':tokenId, 'active':true })
			.fetch()
			.then((model) => {
				if (model == null)
					callback({success:false});
				else
					callback({success:true, data:model});
			})
			.catch((err) => {
				callback({success:false});
			});
	}

	static getUserId(tokenId, callback) {
		new db.Tokens({ 'tokenId':tokenId, 'active':true })
			.fetch()
			.then((model) => {
				if (model == null)
					callback({success:false});
				else
					callback({success:true, data:model.attributes.personId});
			})
			.catch((err) => {
				callback({success:false});
			});
	}

	static getActiveTokenIdByUserId(userId, callback) {
		new db.Tokens({ 'personId':userId, 'active':true })
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

	static S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	static CreateGUID() {
		return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
	}
}

module.exports = Token;
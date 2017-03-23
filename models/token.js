var db = require('../database/database');

class Token {
	constructor(tokenId, createDate, active, userId) {
		this.tokenId = tokenId;
		this.createDate = createDate;
		this.active = active;
		this.userId = userId;
	}

	static login(userId) {
		var token = this.getActiveTokenByUserId(userId);

		if (token == -1) {
			token = this.createToken(userId);
			return token;
		}

		return token.tokenId;
	}

	static logout(tokenId) {
		var token = this.getToken(tokenId);

		if (token == undefined) return false;

		var index = db.tokens.indexOf(token);
		db.tokens[index].active = false;

		return true;
	}

	static createToken(userId) {
		var tokenId = this.CreateGUID();
		db.tokens.push(new Token(tokenId, Date.now(), true, userId));
		return tokenId;
	}

	static isActive(tokenId) {
		var token = db.tokens.find(function (o) { return o.tokenId == tokenId && o.active == true; });

		if (token == undefined) return false;

		return true;
	}
	
	static getToken(tokenId){
		return db.tokens.find(function (o) { return o.tokenId == tokenId; });
	}

	static getActiveTokenByUserId(userId) {
		var token = db.tokens.find(function (o) { return o.userId == userId && o.active == true; });

		if (token == undefined)
			token = -1;

		return token;
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
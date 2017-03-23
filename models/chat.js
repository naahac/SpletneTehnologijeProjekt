var db = require('../database/database');

class Chat {
	constructor(chatID, startdate) {
		this.chatID = chatID;
		this.startdate = startdate;
	}

	static getChatById(chatId) {
		return db.chats.find(function (o) { return o.chatId == chatId; });
	}

	static createChat(chat, dateadded, listingID) {
		db.chats.push(new Chat(chatsId++, chat, dateadded, listingID))
	}

	static deleteChat(chatId) {
		var index = db.chats.indexOf(this.getChatById(chatId));
		if (index > -1) {
			db.chats.splice(index, 1);
		}
	}
}

var chatsId = 1;

module.exports = Chat;
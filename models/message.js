var db = require('../database/database');

var Chat = require('./chat');

class Message {
	constructor(message, chatId, userId) {
		this.message = message;
		this.date = Date.now();
		this.chatId = chatId;
		this.userId = userId;
	}

	static createMessage(message, chatId, userId, callback) {
		let msg = new Message(message, chatId, userId);

		Chat.chatExists(chatId, response => {
			if(!response.success) {
				callback({success: false});
			} else {
				new db.Messages(msg)
				.save()
				.then(() => {
					callback({success: true});
				})
				.catch((error) => {
					callback({success: false});
				});
			}
		});
	}
}

module.exports = Message;
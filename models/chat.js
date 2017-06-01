var db = require('../database/database');

class Chat {
	constructor(user1, user2) {
		this.user1 = user1;
		this.user2 = user2;
		this.date = Date.now();
	}

	static getChat(chatId, callback) {
        new db.Chats({chatId: chatId})
        .fetch({withRelated: ['message']})
        .then((model) => {
            if(model == null)
                callback({success: false});
            else
                callback({success: true, data: model});
        })
        .catch((error) => {
            callback({success: false});
        });
    }

	static chatExists(chatId, callback) {
        new db.Chats({chatId: chatId})
        .fetch()
        .then((model) => {
            if(model == null)
                callback({success: false});
            else
                callback({success: true});
        })
        .catch((error) => {
            callback({success: false});
        });
    }

	static getChatId(user1, user2, callback) {
        new db.Chats()
        .where({user1: user1, user2: user2})
		.orWhere({user1: user2, user2: user1})
        .fetch()
        .then((model) => {
            if(model == null)
                callback({success: false});
            else
                callback({success: true, data: model.get('chatId')});
        })
        .catch((error) => {
            callback({success: false});
        });
    }

	static getChatsByUserId(userId, callback) {
        new db.Chats()
        .where({user1: userId})
		.orWhere({user2: userId})
        .fetchAll()
        .then((models) => {
            if(models.length == 0)
                callback({success: false});
            else
                callback({success: true, data: models});
        })
        .catch((error) => {
            callback({success: false});
        });
    }

	static createChat(user1, user2, callback) {
		let chat = new Chat(user1, user2);

		new db.Chats(chat)
        .save()
        .then((model) => {
			callback({success: true, data: model.get('chatId')});
        })
        .catch((error) => {
            callback({success: false});
        });
	}
}

module.exports = Chat;
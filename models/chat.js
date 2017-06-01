var db = require('../database/database');

class Chat {
	constructor(user1, user2) {
		this.user1 = user1;
		this.user2 = user2;
		this.date = Date.now();
	}

	// static getChat(listingId, callback) {
    //     new db.Listings()
    //     .where({listingId: listingId, status: true})
    //     .fetch({withRelated: ['book', 'book.author', 'book.genre']})
    //     .then((model) => {
    //         if(model == null)
    //             callback({success: false});
    //         else
    //             callback({success: true, data: model});
    //     })
    //     .catch((error) => {
    //         callback({success: false});
    //     });
    // }

	static createChat() {
		
	}

	// static getChatById(chatId) {
	// 	return db.chats.find(function (o) { return o.chatId == chatId; });
	// }

	// static createChat(chat, dateadded, listingID) {
	// 	db.chats.push(new Chat(chatsId++, chat, dateadded, listingID))
	// }

	// static deleteChat(chatId) {
	// 	var index = db.chats.indexOf(this.getChatById(chatId));
	// 	if (index > -1) {
	// 		db.chats.splice(index, 1);
	// 	}
	// }
}

module.exports = Chat;
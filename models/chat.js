var db = require('../database/database');

class Chat {
    constructor(user1, user2) {
        this.user1 = user1;
        this.user2 = user2;
        this.date = Date.now();
    }

    static getChat(chatId, callback) {
        new db.Chats({ chatId: chatId })
            .fetch({ withRelated: ['message'] })
            .then((model) => {
                if (model == null)
                    callback({ success: false });
                else {
                    new db.Users()
                        .query({ where: { personId: model.get('user1') }, orWhere: { personId: model.get('user2') } })
                        .fetchAll()
                        .then((users) => {
                            if (users == null)
                                callback({ success: false });
                            else {
                                var jsonChat = model.serialize();
                                var jsonUsers = users.serialize();

                                jsonUsers.forEach((user) => {
                                    if(jsonChat.user1 == user.personId) {
                                        jsonChat.username1 = user.username;
                                    } else if (jsonChat.user2 == user.personId) {
                                        jsonChat.username2 = user.username;
                                    }
                                });

                                callback({ success: true, data: jsonChat });
                            }
                        })
                        .catch((error) => {
                            callback({ success: false });
                        });
                }
            })
            .catch((error) => {
                callback({ success: false });
            });
    }

    static chatExists(chatId, callback) {
        new db.Chats({ chatId: chatId })
            .fetch()
            .then((model) => {
                if (model == null)
                    callback({ success: false });
                else
                    callback({ success: true });
            })
            .catch((error) => {
                callback({ success: false });
            });
    }

    static getChatId(user1, user2, callback) {
        new db.Chats()
            .query({ where: { user1: user1, user2: user2 }, orWhere: { user1: user2, user2: user1 } })
            .fetch()
            .then((model) => {
                if (model == null)
                    callback({ success: false });
                else
                    callback({ success: true, data: model.get('chatId') });
            })
            .catch((error) => {
                callback({ success: false });
            });
    }

    static getChatsByUserId(userId, callback) {
        new db.Chats()
            .query({ where: { user1: userId }, orWhere: { user2: userId } })
            .fetchAll()
            .then((models) => {
                if (models.length == 0)
                    callback({ success: false });
                else {
                    var jsonChats = models.serialize();
                    let itemsProcessed = 0;

                    jsonChats.forEach((chat) => {
                        new db.Users()
                            .query({ where: { personId: chat.user1 }, orWhere: { personId: chat.user2 }})
                            .fetchAll()
                            .then((users) => {
                                if (users.length == 2) {
                                    var jsonUsers = users.serialize();

                                    jsonUsers.forEach((user) => {
                                        if(chat.user1 == user.personId) {
                                            chat.username1 = user.username;
                                        } else if(chat.user2 == user.personId) {
                                            chat.username2 = user.username;
                                        }
                                    });

                                    itemsProcessed++;
                                    if(itemsProcessed === jsonChats.length) {
                                        callback({success: true, data: jsonChats});
                                    }
                                }
                            })
                            .catch((error) => {
                                callback({ success: false });
                            });
                    });
                }
            })
            .catch((error) => {
                callback({ success: false });
            });
    }

    static createChat(user1, user2, callback) {
        let chat = new Chat(user1, user2);

        new db.Chats(chat)
            .save()
            .then((model) => {
                callback({ success: true, data: model.get('chatId') });
            })
            .catch((error) => {
                callback({ success: false });
            });
    }
}

module.exports = Chat;
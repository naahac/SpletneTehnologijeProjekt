var db = require('../database/database');

class Message { 
  constructor(messageId, text, datetime, chatId, userId) {
    this.messageId = messageId;
    this.text = text;
    this.datetime = datetime;
    this.chatId = chatId;
    this.userId = userId;
  }

  static getMessageById(messageId) {
    return db.messages.find(function(o){ return o.messageId==messageId;});
  }

  static createMessage(message, text, datetime, chatId, userId){
        db.messages.push(new Message(messagesId++, text, datetime, chatId, userId))
    }

  static deleteMessage(messageId) {
    var index = db.messages.indexOf(this.getMessageById(messageId));
    if (index > -1) {
        db.messages.splice(index, 1);
    }
  }
}

var messagesId = 1;

module.exports = Message;
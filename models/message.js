var messages = []
var messagesId = 1;

class Message { 
  constructor(messageID, text, datetime, chatID, userID) {
    this.messageID = messageID;
    this.text = text;
    this.datetime = datetime;
    this.chatID = chatID;
    this.userID = userID;
  }

  static getMessageById(messageId) {
    return messages.find(function(o){ return o.messageId==messageId;});
  }

  static createMessage(message, dateadded, listingID){
        messages.push(new Message(messagesId++, message, dateadded, listingID))
    }

  static deleteMessage(messageId) {
    var index = users.indexOf(this.getMessageById(messageId));
    if (index > -1) {
        users.splice(index, 1);
    }
  }
}

module.exports = Message;
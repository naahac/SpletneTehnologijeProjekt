class Message { 
  constructor(messageID, text, datetime, chatID, userID) {
    this.messageID = messageID;
    this.text = text;
    this.datetime = datetime;
    this.chatID = chatID;
    this.userID = userID;
  }
}

module.exports = Message;
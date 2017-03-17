var chats = []
var chatsId = 1;

class Chat { 
  constructor(chatID, startdate) {
    this.chatID = chatID;
    this.startdate = startdate;
  }

  static getChatById(chatId) {
    return chats.find(function(o){ return o.chatId==chatId;});
  }

  static createChat(chat, dateadded, listingID){
        chats.push(new Chat(chatsId++, chat, dateadded, listingID))
    }

  static deleteChat(chatId) {
    var index = users.indexOf(this.getChatById(chatId));
    if (index > -1) {
        users.splice(index, 1);
    }
  }
}

module.exports = Chat;
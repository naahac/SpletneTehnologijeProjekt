var User = require('./user')

var userLikesBooks = []
var userLikesBooksId = 1;

class UserLikesBook { 
  constructor(userlikesbookId, userId, bookId) {
    this.userlikesbookId = userlikesbookId;
    this.userId = userId;
    this.bookId = bookId;
  }

  static getBooks(tokenId){
    return userLikesBooks.filter(function(o){ return o.userId==User.getUserIdByTokenId(tokenId);});
  }

  static likeBook(tokenId, bookId){
    userLikesBooks.push(new UserLikesBook(userLikesBooksId++, User.getUserIdByTokenId(tokenId), bookId));
  }

  static unlikeBook(tokenId, bookId){
    var item = userLikesBooks.find(function(o){ return o.userId==User.getUserIdByTokenId(tokenId) && o.bookId==bookId;});
    var index = users.indexOf(item);
        if (index > -1) {
            users.splice(index, 1);
        }
  }
}

module.exports = UserLikesBook;
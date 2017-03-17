var User = require('./user');
var Book = require('./book.js');

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

  static getBook(tokenId, bookId){
    return userLikesBooks.filter(function(o){ return o.userId==User.getUserIdByTokenId(tokenId) && o.bookId==bookId;});
  }

  static likeBook(tokenId, bookId){
    if(User.getUserById(userId) == undefined)
      return false;

    if(Book.getBookById(bookId) == undefined)
      return false;

    var item = Book.getBook(tokenId, bookId);
    if(item==undefined)
      userLikesBooks.push(new UserLikesBook(userLikesBooksId++, User.getUserIdByTokenId(tokenId), bookId));
    return true;
}

  static unlikeBook(tokenId, bookId){
    var item = Book.getBook(tokenId, bookId);
    var index = users.indexOf(item);
        if (index > -1) {
            users.splice(index, 1);
        }
  }
}

module.exports = UserLikesBook;
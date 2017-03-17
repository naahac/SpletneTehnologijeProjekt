var User = require('./user');
var Author = require('./author.js');

var userLikesAuthors = []
var userLikesAuthorsId = 1;

class UserLikesAuthor { 
  constructor(userlikesauthorId, userId, authorId) {
    this.userlikesauthorId = userlikesauthorId;
    this.userId = userId;
    this.authorId = authorId;
  }

  static getAuthors(tokenId){
    return userLikesAuthors.filter(function(o){ return o.userId==User.getUserIdByTokenId(tokenId);});
  }

  static getAuthor(tokenId, authorId){
    return userLikesAuthors.filter(function(o){ return o.userId==User.getUserIdByTokenId(tokenId) && o.authorId==authorId;});
  }

  static likeAuthor(tokenId, authorId){
    if(User.getUserById(userId) == undefined)
      return false;

    if(Author.getAuthorById(authorId) == undefined)
      return false;

    var item = Author.getAuthor(tokenId, authorId);
    if(item==undefined)
      userLikesAuthors.push(new UserLikesAuthor(userLikesAuthorsId++, User.getUserIdByTokenId(tokenId), authorId));
    return true;
}

  static unlikeAuthor(tokenId, authorId){
    var item = Author.getAuthor(tokenId, authorId);
    var index = users.indexOf(item);
        if (index > -1) {
            users.splice(index, 1);
        }
  }
}

module.exports = UserLikesAuthor;
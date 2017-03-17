var User = require('./user')

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

  static likeAuthor(tokenId, authorId){
    userLikesAuthors.push(new UserLikesAuthor(userLikesAuthorsId++, User.getUserIdByTokenId(tokenId), authorId));
  }

  static unlikeAuthor(tokenId, authorId){
    var item = userLikesAuthors.find(function(o){ return o.userId==User.getUserIdByTokenId(tokenId) && o.authorId==authorId;});
    var index = users.indexOf(item);
        if (index > -1) {
            users.splice(index, 1);
        }
  }
}

module.exports = UserLikesAuthor;
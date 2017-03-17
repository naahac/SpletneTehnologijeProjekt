var User = require('./user')

var userLikesGenres = []
var userLikesGenresId = 1;

class UserLikesGenre { 
  constructor(userlikesgenreId, userId, genreId) {
    this.userlikesgenreId = userlikesgenreId;
    this.userId = userId;
    this.genreId = genreId;
  }

  static getGenres(tokenId){
    return userLikesGenres.filter(function(o){ return o.userId==User.getUserIdByTokenId(tokenId);});
  }

  static likeGenre(tokenId, genreId){
    userLikesGenres.push(new UserLikesGenre(userLikesGenresId++, User.getUserIdByTokenId(tokenId), genreId));
  }

  static unlikeGenre(tokenId, genreId){
    var item = userLikesGenres.find(function(o){ return o.userId==User.getUserIdByTokenId(tokenId) && o.genreId==genreId;});
    var index = users.indexOf(item);
        if (index > -1) {
            users.splice(index, 1);
        }
  }
}

module.exports = UserLikesGenre;
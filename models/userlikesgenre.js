var User = require('./user');
var Genre = require('./genre.js');

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

  static getGenre(tokenId, genreId){
    return userLikesGenres.filter(function(o){ return o.userId==User.getUserIdByTokenId(tokenId) && o.genreId==genreId;});
  }

  static likeGenre(tokenId, genreId){
    if(User.getUserById(userId) == undefined)
      return false;

    if(Genre.getGenreById(genreId) == undefined)
      return false;

    var item = Genre.getGenre(tokenId, genreId);
    if(item==undefined)
      userLikesGenres.push(new UserLikesGenre(userLikesGenresId++, User.getUserIdByTokenId(tokenId), genreId));
    return true;
}

  static unlikeGenre(tokenId, genreId){
    var item = Genre.getGenre(tokenId, genreId);
    var index = users.indexOf(item);
        if (index > -1) {
            users.splice(index, 1);
        }
  }
}

module.exports = UserLikesGenre;
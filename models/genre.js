var genres = []
var genresId = 1;

class Genre { 
  constructor(genreId, genre) {
    this.genreId = genreId;
    this.genre = genre;
  }

  static getGenreById(genreId) {
    return genres.find(function(o){ return o.genreId==genreId;});
  }

  static getGenres() {
    return genres;
  }

  static updateGenre(genreId, title, releasedate, authorId){
    var index = users.indexOf(this.getUserById(genreId));
    users[index] =  new User(genreId, title, releasedate, authorId);
  }

  static deleteGenre(genreId) {
    var index = users.indexOf(this.getGenreById(genreId));
    if (index > -1) {
        users.splice(index, 1);
    }
  }
}

module.exports = Genre;
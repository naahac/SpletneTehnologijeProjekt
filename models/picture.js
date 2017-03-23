var Listing = require('./listing');

var db = require('../database/database');

class Picture { 
  constructor(pictureId, picture, dateadded, listingId) {
    this.pictureId = pictureId;
    this.picture = picture;
    this.dateadded = dateadded;
    this.listingId = listingId;
  }

  static getPicturesByListingId(listingId) {
    return db.pictures.filter(function(o){ return o.listingId==listingId;});
  }

  static createPicture(picture, dateadded, listingId){
    if(Listing.getListingById(listingId) == undefined)
      return false;

      db.pictures.push(new Picture(picturesId++, picture, dateadded, listingId))
      return true;
    }

  static deletePicture(pictureId) {
    var index = db.pictures.indexOf(this.getPictureById(pictureId));
    if (index > -1) {
        db.pictures.splice(index, 1);
    }
  }
}

var picturesId = 1;

module.exports = Picture;
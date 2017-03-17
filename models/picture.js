var Listing = require('./listing');

var pictures = []
var picturesId = 1;

class Picture { 
  constructor(pictureId, picture, dateadded, listingId) {
    this.pictureId = pictureId;
    this.picture = picture;
    this.dateadded = dateadded;
    this.listingId = listingId;
  }

  static getPicturesByListingId(listingId) {
    return pictures.filter(function(o){ return o.listingId==listingId;});
  }

  static createPicture(picture, dateadded, listingId){
    if(Listing.getListingById(listingId) == undefined)
      return false;

      pictures.push(new Picture(picturesId++, picture, dateadded, listingId))
      return true;
    }

  static deletePicture(pictureId) {
    var index = users.indexOf(this.getPictureById(pictureId));
    if (index > -1) {
        users.splice(index, 1);
    }
  }
}

module.exports = Picture;
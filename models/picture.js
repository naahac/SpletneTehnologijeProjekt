var Picture = require('../models/picture');

var db = require('../database/database');

class Picture { 
  constructor(pictureId, picture, dateadded, listingId) {
      if(pictureId != undefined)
          this.pictureId = pictureId;
    this.picture = picture;
    this.listingId = listingId;
  }

  static getPicturesByListingId(listingId, callback) {
      new db.Pictures()
          .where('listingId', '=', listingId)
          .fetch()
          .then((model) => {
              if (model === null)
                  callback({success: false});
              else
                  callback({success: true, data: model});
          });
  }

  static createPicture(picture, listingId, callback){
      let pic = new Picture(undefined, picture, listingId);
      new db.Pictures(pic)
          .save()
          .then((result) => {
                callback(true);
          })
          .catch((error) => {
                callback(false);
          });
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
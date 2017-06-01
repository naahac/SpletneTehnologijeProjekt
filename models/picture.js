var db = require('../database/database');

class Picture { 
  constructor(pictureId, picture, listingId) {
      if(pictureId != null)
          this.pictureId = pictureId;
    this.picture = picture;
    this.listingId = listingId;
  }

  static getPicturesByListingId(listingId, callback) {
      new db.Pictures()
          .where('listingId', listingId)
          .fetch()
          .then((model) => {
              if (model === null)
                  callback({success: false});
              else
                  callback({success: true, data: model});
          });
  }

  static createPicture(picture, listingId, callback){
      let pic = new Picture(null, picture, listingId);

      new db.Pictures({listingId: listingId})
        .fetch()
        .then((existingModel) => {
			if(existingModel == null) {		
                new db.Pictures(pic)
                .save()
                .then(() => {
                        callback({success: true});
                })
                .catch((error) => {
                        callback({success: false});
                });
			} else {
				callback({success:true});
			}
        })
        .catch((error) => {
            callback({success:false});
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
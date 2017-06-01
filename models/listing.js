var db = require('../database/database');

var Book = require('./book');
var Author = require('./author');
var Picture = require('./picture');
var Token = require('./token');

class Listing { 
  constructor(listingId, title, description, latitude, longitude, location, userId, bookId) {
    if(listingId != null)
        this.listingId = listingId;
    this.title = title;
    this.description = description;
    this.dateadded = Date.now();
    this.longitude = longitude;
    this.latitude = latitude;
    this.location = location;
    this.status = true;
    this.userId = userId;
    this.bookId = bookId;
  }

  static getListing(listingId, callback) {
        new db.Listings()
        .where({listingId: listingId, status: true})
        .fetch({withRelated: ['book', 'book.author', 'book.genre']})
        .then((model) => {
            if(model == null)
                callback({success: false});
            else
                callback({success: true, data: model});
        })
        .catch((error) => {
            callback({success: false});
        });
    }

    static getListings(callback) {
        new db.Listings()
            .where({status: true})
            .fetchAll({withRelated: ['book', 'book.author', 'book.genre']})
            .then((models) => {
                if(models == null)
                    callback({success: false});
                else
                    callback({success: true, data: models});
            })
            .catch(() => {
                callback({success: false});
            });
    }

  static getListingsByUserId(userId, callback) {
        new db.Listings()
        .where({userId: userId})
        .fetchAll({withRelated: ['book', 'book.author', 'book.genre']})
        .then((models) => {
            if(models == null)
                callback({success: false});
            else
                callback({success: true, data: models});
        })
        .catch((error) => {
            callback({success: false});
        });
  }

  static search(userId, latitude, longitude, title, callback) {
        if(title == null)
            title = "";

        title = '%' + title + '%';

        new db.Listings()
        .where('title', 'LIKE', title)
        .where('userId', '<>', userId)
        .where('status', true)
        .fetchAll({withRelated: ['book', 'book.author', 'book.genre']})
        .then((results) => {
            if(results == null)
                callback({success: false});
            else if (!latitude || !longitude)
                callback({success: true, data: results});
            else {

                var sortable = [];
                var json = results.serialize();

                // results.models.forEach((model) => {
                //     // model.set('distance') = Location.getDistance(latitude, longitude, model.get('latitude'), model.get('longitude'));
                // });

                json.forEach((model) => {
                    model.distance = this.getDistance(latitude, longitude, model.latitude, model.longitude);
                });

                // for (var model in json) {
                //     //model.distance = Location.getDistance(latitude, longitude, model.get('latitude'), model.get('longitude'));
                //     model.distance = 1;
                //     //sortable.push()
                // }

                json.sort((a, b) => {
                    return a.distance - b.distance;
                });

                callback({success: true, data: json});
            }
        })
        .catch((error) => {
            callback({success: false});
        });

        // if(author == null){
        //     new db.Books()
        //     .where('title', 'LIKE', title)
        //     .fetchAll({withRelated: ['author']})
        //     .then((models) => {
        //         if(models == null)
        //             callback({success: false});
        //         else
        //             callback({success: true, data: models});
        //     })
        //     .catch((error) => {
        //         callback({success: false});
        //     });
        // } else{
        //     new db.Books()
        //     .query(function(qb) {
        //         qb.where('title', 'LIKE', title).where('authorId', author);
        //     }).fetchAll()
        //     .then((models) => {
        //         if(models == null)
        //             callback({success: false});
        //         else
        //             callback({success: true, data: models});
        //     })
        //     .catch((error) => {
        //         callback({success: false});
        //     });
        // }
	}

    static insertListing(listingId, title, description, latitude, longitude, location, userId, bookId, callback) {
        let listing;

        if(listingId != null) {
            listing = new Listing(listingId, title, description, latitude, longitude, location, userId, bookId);
        } else {
            listing = new Listing(null, title, description, latitude, longitude, location, userId, bookId);
        }

        new db.Listings(listing)
        .save()
        .then((model) => {
            callback({success:true, data: model});
        })
        .catch((error) => {
            callback({success:false});
        });
    }

    static insertListingWithNewBook(listingId, userId, listingTitle, description, latitude, longitude, location, picture, bookTitle, author, genreId, callback) {
        // TODO: Validations

        // if (!this.validateLocation(longitude) || !this.validateLocation(latitude)) {
        //     callback({success:false, status: 'Longitude or latitude format is not valid'});
        //     return;
        // }

        Author.createAuthor(author, (createAuthorResponse) => {
            if (createAuthorResponse.success) {

                Book.insertBook(null, bookTitle, genreId, createAuthorResponse.data.get('authorId'), (insertBookResponse) => {
                    if (insertBookResponse.success) {

                        this.insertListing(listingId, listingTitle, description, latitude, longitude, location, userId, insertBookResponse.data.get('bookId'), (insertListingResponse) => {
                            if (insertListingResponse.success) {
                                
                                Picture.createPicture(picture, insertListingResponse.data.get('listingId'), (createPictureResponse) => {
                                    callback(createPictureResponse);
                                    return;
                                })

                            } else {
                                callback(insertListingResponse);
                                return;
                            }
                        })

                    } else {
                        callback(insertBookResponse);
                        return;
                    }
                });

            } else {
                callback(createAuthorResponse);
                return;
            }
        });

    }

    static insertListingWithSavedBook(listingId, userId, listingTitle, description, latitude, longitude, location, picture, bookId, callback) {
        // TODO: Validations

        // if (!this.validateLocation(longitude) || !this.validateLocation(latitude)) {
        //         callback({success:false, status: 'Longitude or latitude format is not valid'});
        //         return;
        // }

        this.insertListing(listingId, listingTitle, description, latitude, longitude, location, userId, bookId, (insertListingResponse) => {
            if (insertListingResponse.success) {
                
                Picture.createPicture(picture, insertListingResponse.data.get('listingId'), (createPictureResponse) => {
                    callback(createPictureResponse);
                    return;
                })

            } else {
                callback(insertListingResponse);
                return;
            }
        })
    }

  static deleteListing(listingId, callback) {
        new db.Listings()
        .where('listingId', listingId)
        .save({status: false}, {patch: true})
        .then(() => {
            callback({success:true});
        })
        .catch( (err) => {
            callback({success:false});
        });
    }

    static validateLocation(location) {
        var re = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");
        return re.test(location);
    }

    static getDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
    }

    static deg2rad(deg) {
        return deg * (Math.PI/180)
    }
}

module.exports = Listing;
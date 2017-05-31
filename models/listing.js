var db = require('../database/database');

var Book = require('./book');
var Author = require('./author');
var Picture = require('./picture');
var Token = require('./token');

class Listing { 
  constructor(listingId, title, description, dateadded, latitude, longitude, status, userId, bookId) {
    if(listingId != null)
        this.listingId = listingId;
    this.title = title;
    this.description = description;
    this.dateadded = dateadded;
    this.longitude = longitude;
    this.latitude = latitude;
    if(status != null)
        this.status = status;
    this.userId = userId;
    this.bookId = bookId;
  }

  static getListing(listingId, callback) {
        new db.Listings()
        .where({listingId: listingId})
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
        .where('userId', userId)
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

    static insertListing(listingId, title, description, dateadded, latitude, longitude, userId, bookId, callback) {
        let listing;

        if(listingId != null){
            listing = new Listing(listingId, title, description, dateadded, latitude, longitude, null, userId, bookId);
        }else{
            listing = new Listing(null, title, description, dateadded, latitude, longitude, true, userId, bookId);
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

    static insertListingWithNewBook(tokenId, listingTitle, description, dateAdded, latitude, longitude, picture, bookTitle, author, genreId, callback) {
        // TODO: Validations

        // if (!this.validateLocation(longitude) || !this.validateLocation(latitude)) {
        //     callback({success:false, status: 'Longitude or latitude format is not valid'});
        //     return;
        // }

        Token.getUserId(tokenId, (getUserIdResponse) => {
            if(getUserIdResponse.success){

                Author.createAuthor(author, (createAuthorResponse) => {
                    if (createAuthorResponse.success) {

                        Book.insertBook(null, bookTitle, genreId, createAuthorResponse.data.get('authorId'), (insertBookResponse) => {
                            if (insertBookResponse.success) {

                                this.insertListing(null, listingTitle, description, dateAdded, latitude, longitude, getUserIdResponse.data, insertBookResponse.data.get('bookId'), (insertListingResponse) => {
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

            } else {
                callback(getUserIdResponse);
                return;
            }
        });
    }

    static insertListingWithSavedBook(tokenId, listingTitle, description, dateAdded, latitude, longitude, picture, bookId, callback) {
        // TODO: Validations

        // if (!this.validateLocation(longitude) || !this.validateLocation(latitude)) {
        //         callback({success:false, status: 'Longitude or latitude format is not valid'});
        //         return;
        // }

        Token.getUserId(tokenId, (getUserIdResponse) => {
            if(getUserIdResponse.success){

                this.insertListing(null, listingTitle, description, dateAdded, latitude, longitude, getUserIdResponse.data, bookId, (insertListingResponse) => {
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
                callback(getUserIdResponse);
                return;
            }
        });
    }

  // static createListing(title, description, dateadded, status, userId, bookId, callback){
  //   if(User.getUserById(userId) == undefined){
  //     callback(false);
  //     return;
  //   }
      
  //   if(Book.getBookById(bookId) == undefined){
  //     callback(false);
  //      return;
  //   }
     
  //   db.Listings.push(new Listing(listingsId++, title, description, dateadded, status, userId, bookId))
  //   callback(true);
  // }

  // static updateListing(listingId, title, description, dateadded, status, userId, bookId, callback) {
  //       new db.Listings({ personId: personId })
	// 		.save({ listingId:listingId, title:title, description:description, dateadded:dateadded, status:status, userId:userId, bookId:bookId }, {patch: true})
	// 		.then((model) => {
	// 			if (model == null)
	// 				callback({ success: false });
  //               else
	// 			    callback({ success: true });
	// 		})
	// 		.catch((err) => {
	// 			callback({ success: false });
	// 		});
  //   }

  static deleteListing(listingId, callback) {
        new db.Listings()
        .where('listingId', listingId)
        .destroy()
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
}

module.exports = Listing;
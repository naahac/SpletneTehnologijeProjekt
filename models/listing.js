var db = require('../database/database');
var Book = require('./book');
var User = require('./user')

class Listing { 
  constructor(listingId, title, description, dateadded, status, userId, bookId) {
    this.listingId = listingId;
    this.title = title;
    this.description = description;
    this.dateadded = dateadded;
    this.status = status;
    this.personId = userId;
    this.bookId = bookId;
  }

  static getListing(listingId, callback) {
        new db.Listings({listingId: listingId})
        .fetch()
        .then((model) => {
            if(model == null)
                callback({success: false});
            else
                callback({success: true, data :model});
        });
    }

    static getListings(callback) {
        new db.Listings()
            .fetchAll()
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
    new db.Books({userId: userId})
            .fetchAll()
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

    static insertListing(listingId, title, description, dateadded, status, userId, bookId, callback) {
        if(listingId != null){
            let book = new Book(listingId, title, description, dateadded, status, userId, bookId);
        }else{
            let book = new Book(title, description, dateadded, status, userId, bookId);
        }

        new db.Listing(listing)
        .save()
        .then(() => {
            callback({success:true});
        })
        .catch(() => {
            callback({success:false});
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
}

module.exports = Listing;
var Book = require('./book');
var User = require('./user')

var db = require('../database/database');

class Listing { 
  constructor(listingId, title, description, dateadded, status, userId, bookId) {
    this.listingId = listingId;
    this.title = title;
    this.description = description;
    this.dateadded = dateadded;
    this.status = status;
    this.userId = userId;
    this.bookId = bookId;
  }

  static getListingById(listingId) {
    return db.listings.find(function(o){ return o.listingId==listingId;});
  }

  static getListings() {
    return db.listings;
  }

  static createListing(title, description, dateadded, status, userId, bookId){
    if(User.getUserById(userId) == undefined)
      return false;

    if(Book.getBookById(bookId) == undefined)
      return false;

    db.listings.push(new Listing(listingsId++, title, description, dateadded, status, userId, bookId))
    return true;
  }

  static updateListing(listingId, title, description, dateadded, status, userId, bookId){
    var index = db.listings.indexOf(this.getListingById(listingId));
    db.listings[index] =  new Listing(listingId, title, description, dateadded, status, userId, bookId);
  }

  static deleteListing(listingId) {
    var index = db.listings.indexOf(this.getListingById(listingId));
    if (index > -1) {
        db.listings.splice(index, 1);
    }
  }
}

var listingsId = 1;

module.exports = Listing;
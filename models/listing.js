var listings = []
var listingsId = 1;

class Listing { 
  constructor(listingsId, title, description, dateadded, status, userId, bookId) {
    this.listingsId = listingsId;
    this.title = title;
    this.description = description;
    this.dateadded = dateadded;
    this.status = status;
    this.userId = userId;
    this.bookId = bookId;
  }

  static getListingById(listingId) {
    return listings.find(function(o){ return o.listingId==listingId;});
  }

  static getListings() {
    return listings;
  }

  static updateListing(listingId, title, releasedate, authorId){
    var index = users.indexOf(this.getUserById(listingId));
    users[index] =  new User(listingId, title, releasedate, authorId);
  }

  static deleteListing(listingId) {
    var index = users.indexOf(this.getListingById(listingId));
    if (index > -1) {
        users.splice(index, 1);
    }
  }
}

module.exports = Listing;
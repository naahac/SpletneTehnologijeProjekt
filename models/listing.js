class Listing { 
  constructor(listingID, title, description, dateadded, status, userID, bookID) {
    this.listingID = listingID;
    this.title = title;
    this.description = description;
    this.dateadded = dateadded;
    this.status = status;
    this.userID = userID;
    this.bookID = bookID;
  }
}

module.exports = Listing;
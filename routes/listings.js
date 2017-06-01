var express = require('express');
var router = express.Router();

var checkToken = require('../utilities/checkToken');

// var Token = require("./../models/token");
var Listing = require('../models/listing');

router.get('/', function(req, res, next) {
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
            return;

		Listing.getListing(req.query.listingId, (getListingResponse) => {
			if (!getListingResponse.success) {
				res.status(404);
				res.send({success: false, status: 'Listing not found'});
			} else {
				res.json(getListingResponse);
			}
		});
	}));
});

router.get('/byuserid', function(req, res, next) {
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
            return;

		Listing.getListingsByUserId(checkTokenResponse.data.get('personId'), (response) => {
			if (!response.success) {
				res.status(404);
				res.send({success: false, status: 'Listings not found'});
			} else {
				res.json(response);
			}
		});
	}));
});

router.get('/all', function(req, res, next) {
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
            return;

		Listing.getListings((response) => {
			if (!response.success) {
				res.status(404);
				res.send({success: false, status: 'Listings not found'});
			} else {
				res.json(response);
			}
		});
	}));
});

router.post('/', function(req, res, next){
	checkToken(req.body.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
            return;

		if (req.body.listingTitle && req.body.description && req.body.longitude && req.body.latitude && req.body.location && req.body.picture) {
			if(req.body.bookId) {
				Listing.insertListingWithSavedBook(null, checkTokenResponse.data.get('personId'), req.body.listingTitle, req.body.description,
					req.body.latitude, req.body.longitude, req.body.location, req.body.picture, req.body.bookId,
					(response) => {
						if (!response.success) {
							res.status(404);
							res.send({success: false, status: 'Error while inserting data'});
						}
						else {
							res.send(response);
						}
				});
			} else if (req.body.bookTitle && req.body.author && req.body.genreId) {
				Listing.insertListingWithNewBook(null, checkTokenResponse.data.get('personId'), req.body.listingTitle, req.body.description,
					req.body.latitude, req.body.longitude, req.body.location, req.body.picture, req.body.bookTitle, req.body.author, req.body.genreId,
					(response) => {
						if (!response.success) {
							res.status(404);
							res.send({success: false, status: 'Error while inserting data'});
						}
						else {
							res.send(response);
						}
				});
			} else {
				res.status(400);
            	res.send({success: false, status: 'Requested data not received!'});
			}
		} else {
			res.status(400);
            res.send({success: false, status: 'Requested data not received!'});
		}	
	}));
});

router.put('/', function (req, res, next) {
	checkToken(req.body.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
            return;

		if (req.body.listingId && req.body.listingTitle && req.body.description && req.body.longitude && req.body.latitude && req.body.location && req.body.picture) {
			if(req.body.bookId) {
				Listing.insertListingWithSavedBook(req.body.listingId, checkTokenResponse.data.get('personId'), req.body.listingTitle, req.body.description,
					req.body.latitude, req.body.longitude, req.body.location, req.body.picture, req.body.bookId,
					(response) => {
						if (!response.success) {
							res.status(404);
							res.send({success: false, status: 'Error while inserting data'});
						}
						else {
							res.send(response);
						}
				});
			} else if (req.body.bookTitle && req.body.author && req.body.genreId) {
				Listing.insertListingWithNewBook(req.body.listingId, checkTokenResponse.data.get('personId'), req.body.listingTitle, req.body.description,
					req.body.latitude, req.body.longitude, req.body.location, req.body.picture, req.body.bookTitle, req.body.author, req.body.genreId,
					(response) => {
						if (!response.success) {
							res.status(404);
							res.send({success: false, status: 'Error while inserting data'});
						}
						else {
							res.send(response);
						}
				});
			} else {
				res.status(400);
            	res.send({success: false, status: 'Requested data not received!'});
			}
		} else {
			res.status(400);
            res.send({success: false, status: 'Requested data not received!'});
		}	
	}));
});

router.delete('/', function (req, res, next) {
	checkToken(req.body.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
            return;

		Listing.deleteListing(req.body.listingId, (response) => {
                    if (!response.success) {
                        res.status(404);
                        res.send('Error while deleting data!');
                    }
                    else {
                        res.send({status: 'OK'});
                    }
                });
	}));
});

module.exports = router;
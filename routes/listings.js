var express = require('express');
var router = express.Router();

var checkToken = require('../utilities/checkToken');
var Token = require("./../models/token");
var Listing = require('../models/listing');

router.get('/', function(req, res, next) {
	checkToken(req.query.tokenId, res, (authorized => {
		if(!authorized)
            return;

		Listing.getListing(req.body.listingId, (response) => {
			if (!response.success) {
				res.status(404);
				res.send({status: 'Listing not found'});
			} else {
				res.json(response.data);
			}
		});
	}));
});

router.get('/byuserid', function(req, res, next) {
	checkToken(req.query.tokenId, res, (authorized => {
		if(!authorized)
            return;

		Token.getUserId(req.query.tokenId, (userId) => {
            if(userId.success){
                Listing.getListingsByUserId(userId.data, (response) => {
					if (!response.success) {
						res.status(404);
						res.send({status: 'Listing not found'});
					} else {
						res.json(response.data);
					}
				});
            } else {
                res.status(404);
                res.send('Error while getting your user data!');
            }
        });
	}));
});

router.get('/all', function(req, res, next) {
	checkToken(req.query.tokenId, res, (authorized => {
		if(!authorized)
            return;

		Listing.getListings((response) => {
			if (!response.success) {
				res.status(404);
				res.send({status: 'Listing not found'});
			} else {
				res.json(response.data);
			}
		});
	}));
});

router.post('/', function(req, res, next){
	checkToken(req.body.tokenId, res, (authorized => {
		if(!authorized)
            return;

		if (req.body.tokenId && req.body.listingTitle && req.body.description && req.body.dateAdded && req.body.longitude && req.body.latitude && req.body.picture) {
			if(req.body.bookId) {
				Listing.insertListingWithSavedBook(req.body.tokenId, req.body.listingTitle, req.body.description, req.body.dateAdded,
					req.body.latitude, req.body.longitude, req.body.picture, req.body.bookId, req.body.bookId,
					(response) => {
						if (!response.success) {
							res.status(404);
							res.send({success: false, status: 'Error while inserting data'});
						}
						else {
							res.send({success: true});
						}
				});
			} else if (req.body.bookTitle && req.body.author && req.body.genreId) {
				Listing.insertListingWithNewBook(req.body.tokenId, req.body.listingTitle, req.body.description, req.body.dateAdded,
					req.body.latitude, req.body.longitude, req.body.picture, req.body.bookTitle, req.body.author, req.body.genreId,
					(response) => {
						if (!response.success) {
							res.status(404);
							res.send({success: false, status: 'Error while inserting data'});
						}
						else {
							res.send({success: true});
						}
				});
			} else {
				res.status(400);
            	res.send({status: 'Requested data not received!'});
			}
		} else {
			res.status(400);
            res.send({status: 'Requested data not received!'});
		}
		
		// if (!req.body.title || !req.body.description || !req.body.dateAdded || !req.body.status || !req.body.bookId) {
        //     res.status(400);
        //     res.send({status: 'Requested data not received!'});
        // } else {
		// 	Token.getUserId(req.query.tokenId, (userId) => {
		// 		if(userId.success){
		// 			Listing.insertListing(null, req.body.title, req.body.description, req.body.dateAdded,
		// 			req.body.status, userId.data, req.body.bookId,
		// 			(response) => {
		// 				if (!response.success) {
		// 					res.status(404);
		// 					res.send('Error while inserting data!');
		// 				}
		// 				else {
		// 					res.send('OK');
		// 				}
		// 			});
		// 		} else {
		// 			res.status(404);
		// 			res.send('Error while getting your user data!');
		// 		}
		// 	});
		// }		
	}));
});

router.put('/', function (req, res, next) {
    checkToken(req.query.tokenId, res, (authorized => {
        if(!authorized)
            return;
        
		if (!req.body.listingId || !req.body.title || !req.body.description || !req.body.dateAdded || !req.body.status || !req.body.bookId) {
            res.status(400);
            res.send({status: 'Requested data not received!'});
        } else {
			Token.getUserId(req.query.tokenId, (userId) => {
				if(userId.success){
					Listing.insertListing(req.body.listingId, req.body.title, req.body.description, 
					req.body.dateAdded, req.body.status, userId.data, req.body.bookId,
					(result) => {
						if (!result.success) {
							res.status(404);
							res.send({status: 'Error while updating!'});
						}
						else {
							res.send({status: 'OK'});
						}
					});
				} else {
					res.status(404);
					res.send('Error while getting your user data!');
				}
			});
		}
    }));
});

router.delete('/', function (req, res, next) {
	checkToken(req.query.tokenId, res, (authorized => {
		if(!authorized)
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
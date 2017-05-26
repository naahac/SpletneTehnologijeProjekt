var express = require('express');
var router = express.Router();

var Book = require("./../models/book");
var Token = require("./../models/token");
var checkToken = require('../utilities/checkToken');

router.get('/', function(req, res, next) {
	checkToken(req.query.tokenId, res, (authorized => {
		if(!authorized)
            return;

		Book.getBook(req.body.bookId, (response) => {
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
                Book.getBooksByUserId(userId.data, (response) => {
                    if (!response.success) {
                        res.status(404);
                        res.send({status: 'Books not found'});
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

		Book.getBooks((response) => {
			if (!response.success) {
				res.status(404);
				res.send({status: 'Books not found'});
			} else {
				res.json(response.data);
			}
		});
	}));
});

router.post('/', function(req, res, next){
	checkToken(req.query.tokenId, res, (authorized => {
		if(!authorized)
            return;
		
		if (!req.body.title || !req.body.releasedate || !req.body.authorId) {
            res.status(400);
            res.send({status: 'Requested data not received!'});
        } else {
			Book.insertBook(null, req.body.title, req.body.releasedate, req.body.authorId,
            (response) => {
                if (!response.success) {
                    res.status(404);
                    res.send('Error while inserting data!');
                }
                else {
                    res.send('OK');
                }
            });
		}		
	}));
});

router.put('/', function (req, res, next) {
    checkToken(req.query.tokenId, res, (authorized => {
        if(!authorized)
            return;
        
		if (!req.body.bookId || !req.body.title || !req.body.releasedate || !req.body.authorId) {
            res.status(400);
            res.send({status: 'Requested data not received!'});
        } else {
			Book.insertBook(req.body.bookId, req.body.title, req.body.releasedate, req.body.authorId,
			(result) => {
				if (!result.success) {
					res.status(404);
					res.send({status: 'Error while updating!'});
				}
				else {
					res.send({status: 'OK'});
				}
			});
		}
    }));
});

router.delete('/', function (req, res, next) {
	checkToken(req.query.tokenId, res, (authorized => {
		if(!authorized)
            return;

		Book.deleteBook(req.body.bookId, (response) => {
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
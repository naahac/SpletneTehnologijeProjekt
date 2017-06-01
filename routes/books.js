var express = require('express');
var router = express.Router();

var Book = require("./../models/book");
var Token = require("./../models/token");
var Genre = require("./../models/genre");
var Author = require("./../models/author");

var checkToken = require('../utilities/checkToken');

router.get('/', function(req, res, next) {
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
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
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
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
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
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

router.get('/genres', function(req, res, next) {
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
            return;

		Genre.getGenres((response) => {
			if (!response.success) {
				res.status(404);
				res.send({status: 'No genres'});
			} else {
				res.json(response.data);
			}
		});
	}));
});

router.get('/search', function(req, res, next) {
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
            return;

		if (!req.query.title) {
            res.status(400);
            res.send({status: 'Requested data not received!'});
        } else {
			let author = null;

			if(req.query.authorId){
				author = req.query.authorId;
			}		

			Book.booksAutocomplete(req.query.title, author, (response) => {
				if (!response.success) {
					res.status(404);
					res.send({status: 'No books.'});
				} else {
					res.json(response.data);
				}
			});
		}
	}));
});

router.get('/authors', function(req, res, next) {
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
            return;

		if (!req.query.author) {
            res.status(400);
            res.send({status: 'Requested data not received!'});
        } else {
			Author.search(req.query.author, (response) => {
				if (!response.success) {
					res.status(404);
					res.send({status: 'No authors.'});
				} else {
					res.json(response.data);
				}
			});
		}
	}));
});

router.post('/', function(req, res, next){
	checkToken(req.body.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
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
    checkToken(req.body.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
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
	checkToken(req.body.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
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
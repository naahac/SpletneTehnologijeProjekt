var express = require('express');
var router = express.Router();

var Chat = require("./../models/chat");

var checkToken = require('../utilities/checkToken');

router.get('/', function (req, res, next) {
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
		if (!checkTokenResponse.success)
			return;
		
		if (!req.query.userId) {
			res.status(400);
            res.send({success: false, status: 'Requested data not received!'});
		}

		Book.getBook(req.body.bookId, (response) => {
			if (!response.success) {
				res.status(404);
				res.send({ status: 'Listing not found' });
			} else {
				res.json(response.data);
			}
		});
	}));
});

module.exports = router;
var express = require('express');
var router = express.Router();

var Chat = require("./../models/chat");

var checkToken = require('../utilities/checkToken');

router.get('/', function (req, res, next) {
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
		if (!checkTokenResponse.success)
			return;
		
		if (!req.query.chatId) {
			res.status(400);
            res.send({success: false, status: 'Requested data not received!'});
		}

		Chat.getChat(req.query.chatId, (response) => {
			if (!response.success) {
				res.status(404);
				res.send({success: false, status: 'Error while getting chat' });
			} else {
				res.json(response);
			}
		});
	}));
});

router.get('/id', function (req, res, next) {
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
		if (!checkTokenResponse.success)
			return;
		
		if (!req.query.userId) {
			res.status(400);
            res.send({success: false, status: 'Requested data not received!'});
		}

		Chat.getChatId(checkTokenResponse.data.get('personId'), req.query.userId, (response) => {
			if (!response.success) {
				Chat.createChat( checkTokenResponse.data.get('personId'), req.query.userId, (createChatResponse) => {
					if(!response.success) {
						res.status(404);
						res.send({success: false, status: 'Error while creating chat' });
					} else {
						res.json(response);
					}
				});
			} else {
				res.json(response);
			}
		});
	}));
});

router.get('/byuserid', function (req, res, next) {
	checkToken(req.query.tokenId, res, (checkTokenResponse => {
		if (!checkTokenResponse.success)
			return;

		Chat.getChatsByUserId(checkTokenResponse.data.get('personId'), (response) => {
			if (!response.success) {
				Chat.createChat( checkTokenResponse.data.get('personId'), req.query.userId, (createChatResponse) => {
					if(!response.success) {
						res.status(404);
						res.send({success: false, status: 'Error while creating chat' });
					} else {
						res.json(response);
					}
				});
			} else {
				res.json(response);
			}
		});
	}));
});

module.exports = router;
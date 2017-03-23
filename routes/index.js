var express = require('express');
var router = express.Router();

var User = require("./../models/user");
var Token = require("./../models/token");

router.get('/', function (req, res, next) {
	res.render('index', { title: 'Book4Book' });
});

router.post('/login', function (req, res, next) {
	if (!req.body.username || !req.body.password) {
		res.status(400 )
		res.send("Login data not received!");
	}

	var userId = User.checkLoginData(req.body.username, req.body.password);
	var tokenId = Token.login(userId);

	if (tokenId == -1) {
		res.status(404)
		res.send("User not found");
	}

	res.json(tokenId);
});

router.post('/logout', function (req, res, next) {
	if (req.body.tokenId)
		res.json(Token.logout(req.body.tokenId))

	res.status(400 )
	res.send("Token not received");
});

module.exports = router;

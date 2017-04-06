var express = require('express');
var router = express.Router();

var User = require("./../models/user");
var Token = require("./../models/token");

router.get('/', function (req, res, next) {
	res.render('index', { title: 'Book4Book' });
});

router.post('/login', function (req, res, next) {
	if (!req.body.username || !req.body.password) {
		res.status(400);
		res.send({ status: 'Login data not received!' });
	}

	User.getUserIdByLoginData(req.body.username, req.body.password, (result) => {
		if (!result.success) {
			res.status(404);
			res.send({ status: 'User not found' });
		}

		Token.login(userId, (result) => {
			if (!result.success) {
				res.status(404);
				res.send({ status: 'Encountered error while logging in' });
			}

			res.json(result.data);
		});
	});
});

router.post('/logout', function (req, res, next) {
	if (req.body.tokenId)
		res.json(Token.logout(req.body.tokenId))

	res.status(400);
	res.send({ status: 'Token not received' });
});

module.exports = router;

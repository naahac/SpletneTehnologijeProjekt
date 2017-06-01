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
	}else{
        User.getUserIdByLoginData(req.body.username, req.body.password, (result) => {
            if (!result.success) {
                res.status(404);
                res.send({success: false, status: 'User not found' });
            }else{
                Token.login(result.data, (loginResponse) => {
                    if (!loginResponse.success) {
                        res.status(404);
                        res.send({success: false, status: 'Encountered error while logging in' });
                    } else {
                        res.json(loginResponse);
                    }
                });
            }
        });
    }
});

router.post('/logout', function (req, res, next) {
	if (req.body.tokenId) {
		Token.logout(req.body.tokenId, (result) => {
			res.json(result);
		});
	} else {
		res.status(400);
		res.send({success: false, status: 'Token not received' });
	}
});

module.exports = router;

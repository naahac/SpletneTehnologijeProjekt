var express = require('express');
var router = express.Router();

var checkToken = require('../utilities/checkToken');

var User = require('../models/user');
var Token = require('../models/token');

router.get('/', function (req, res, next) {
    checkToken(req.query.tokenId, res);

    Token.getUserId(req.query.tokenId, (userId) => {
        if (userId == null) {
            res.status(404);
            res.send({ status: 'Token not found!' });
        }

        User.getUser(userId, (user) => {
            if (user == null) {
                res.status(404);
                res.send({ status: 'User not found' });
            } else
                res.json(user);
        });
    });
});

router.put('/', function (req, res, next) {
    checkToken(req.body.tokenId, res);

    if (!req.body.name || !req.body.surname || !req.body.username || !req.body.password || !req.body.email) {
        res.status(400);
        res.send({ status: 'Requested data not received!' });
    }

    var userId = Token.getUserId(req.body.tokenId);
    User.updateUser(userId, req.body.name, req.body.surname, req.body.birthDate, req.body.username, req.body.password, req.body.email, req.body.location)
    res.send({ status: 'OK' });
});

router.post('/', function (req, res, next) {
    if (!req.body.name || !req.body.surname || !req.body.username || !req.body.password || !req.body.email) {
        res.status(400);
        res.send({ status: 'Requested data not received!' });
    }

    User.createUser(req.body.name, req.body.surname, req.body.birthDate, req.body.username, req.body.password, req.body.email, req.body.location)
    res.send('OK');
});

router.delete('/', function (req, res, next) {
    checkToken(req.body.tokenId, res);

    var userId = Token.getUserId(req.body.tokenId);
    User.deleteUser(userId);
    res.send({ status: 'OK' });
});

module.exports = router;
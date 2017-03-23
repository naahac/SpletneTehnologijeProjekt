var express = require('express');
var router = express.Router();

var checkToken = require('../utilities/checkToken');

var User = require('../models/user');
var Token = require('../models/token');

router.get('/', function(req, res, next) {
    //checkToken(req.query.tokenId, res);

    res.json(User.getUsers());
});

// router.get('/', function (req, res, next) {
//     checkToken(req.query.tokenId, res);

//     var userId = Token.getUserId(req.query.tokenId);
//     var user = User.getUser(userId);
//     if (user === undefined) {
//         res.status(404);
//         res.send("User not found");
//     }
//     res.json(user);
// });

router.put('/', function (req, res, next) {
    checkToken(req.body.tokenId, res);

    if (!req.body.name || !req.body.surname || !req.body.username || !req.body.password || !req.body.email) {
        res.status(400)
        res.send("Requested data not received!");
    }

    var userId = Token.getUserId(req.body.tokenId);
    User.updateUser(userId, req.body.name, req.body.surname, req.body.birthDate, req.body.username, req.body.password, req.body.email, req.body.location)
    res.send('OK');
});

router.post('/', function (req, res, next) {
    if (!req.body.name || !req.body.surname || !req.body.username || !req.body.password || !req.body.email) {
        res.status(400)
        res.send("Requested data not received!");
    }

    User.createUser(req.body.name, req.body.surname, req.body.birthDate, req.body.username, req.body.password, req.body.email, req.body.location)
    res.send('OK');
});

router.delete('/', function (req, res, next) {
    checkToken(req.body.tokenId, res);

    var userId = Token.getUserId(req.body.tokenId);
    User.deleteUser(userId)
    res.send('OK');
});

module.exports = router;
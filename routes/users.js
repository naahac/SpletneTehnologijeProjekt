var express = require('express');
var router = express.Router();

var checkToken = require('../utilities/checkToken');

var User = require('../models/user');
var Token = require('../models/token');

router.get('/', function (req, res, next) {
    checkToken(req.query.tokenId, res, (authorized => {
        if(!authorized)
            return;
        Token.getActiveToken(req.query.tokenId, (result) => {
            if (!result.success) {
                res.status(404);
                res.send({status: 'Token not found!'});
            } else {
                User.getUser(result.data.get('personId'), (user) => {
                    if (user === null) {
                        res.status(404);
                        res.send({status: 'User not found'});
                    } else {
                        res.json(user);
                    }
                });
            }
        });
    }));
});

router.put('/', function (req, res, next) {
    checkToken(req.query.tokenId, res, (authorized => {
        if(!authorized)
            return;
        if (!req.body.name || !req.body.surname || !req.body.password || !req.body.birthDate || !req.body.email || !req.body.location) {
            res.status(400);
            res.send({status: 'Requested data not received!'});
        } else {
            Token.getActiveToken(req.query.tokenId, (result) => {
                if (!result.success) {
                    res.status(400);
                    res.send({status: 'User was not found!'});
                }else{
                    User.updateUser(result.data.attributes.personId, req.body.name, req.body.surname, req.body.birthDate, req.body.email, req.body.location,
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
            });
        }
    }));
});

router.put('/changePassword', function (req, res, next) {
    checkToken(req.query.tokenId, res, (authorized => {
        if(!authorized)
            return;
        if (!req.body.oldPassword || !req.body.newPassword) {
            res.status(400);
            res.send({status: 'Requested data not received!'});
        } else {
            Token.getActiveToken(req.query.tokenId, (result) => {
                if (!result.success) {
                    res.status(400);
                    res.send({status: 'User was not found!'});
                }else{
                    User.changePassword(result.data.attributes.personId, req.body.oldPassword, req.body.newPassword,
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
            });
        }
    }));
});

router.post('/', function (req, res, next) {
    if (!req.body.name || !req.body.surname || !req.body.username || !req.body.password || !req.body.birthDate || !req.body.email || !req.body.location) {
        res.status(400);
        res.send({status: 'Requested data not received!'});
    }else{
        User.createUser(req.body.name, req.body.surname, req.body.birthDate, req.body.username, req.body.password, req.body.email, req.body.location,
            (result) => {
                if (!result) {
                    res.status(404);
                    res.send('Error while inserting data!');
                }
                else {
                    res.send('OK');
                }
            });
    }
});

router.delete('/', function (req, res, next) {
    checkToken(req.body.tokenId, res, (authorized) => {
        if(!authorized)
            return;
        Token.getActiveToken(req.body.tokenId, (result) => {
            if (!result.success) {
                res.status(400);
                res.send({status: 'Token was not found!'});
            }else {
                User.deleteUser(result.data.get('personId'), (result) => {
                    if (!result.success) {
                        res.status(404);
                        res.send('Error while deleting data!');
                    }
                    else {
                        res.send({status: 'OK'});
                    }
                });
            }
        });
    });
});

module.exports = router;
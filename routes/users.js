var express = require('express');
var router = express.Router();

var checkToken = require('../utilities/checkToken');

var User = require('../models/user');

router.get('/', function (req, res, next) {
    checkToken(req.query.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
            return;

        User.getUser(checkTokenResponse.data.get('personId'), (getUserResponse) => {
            if (getUserResponse === null) {
                res.status(404);
                res.send({success: false, status: 'User not found'});
            } else {
                res.json(getUserResponse);
            }
        });
    }));
});

router.put('/', function (req, res, next) {
    checkToken(req.body.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
            return;

        if (!req.body.name || !req.body.surname || !req.body.password || !req.body.birthDate || !req.body.email) {
            res.status(400);
            res.send({success: false, status: 'Requested data not received!'});
        } else {
            User.updateUser(checkTokenResponse.data.get('personId'), req.body.name, req.body.surname, req.body.birthDate, req.body.email,
            (updateUserResponse) => {
                if (!updateUserResponse.success) {
                    res.status(404);
                    res.send({success: false, status: 'Error while updating!'});
                } else {
                    res.send({success: true});
                }
            });
        }
    }));
});

router.put('/changePassword', function (req, res, next) {
    checkToken(req.body.tokenId, res, (checkTokenResponse => {
        if(!checkTokenResponse.success)
            return;

        if (!req.body.oldPassword || !req.body.newPassword) {
            res.status(400);
            res.send({success: false, status: 'Requested data not received!'});
        } else {
            User.changePassword(checkTokenResponse.data.get('personId'), req.body.oldPassword, req.body.newPassword,
            (changePasswordResponse) => {
                if (!changePasswordResponse.success) {
                    res.status(404);
                    res.send({success: false, status: 'Error while updating!'});
                } else {
                    res.send({success: true});
                }
            });
        }
    }));
});

router.post('/', function (req, res, next) {
    if (!req.body.name || !req.body.surname || !req.body.username || !req.body.password || !req.body.birthDate || !req.body.email) {
        res.status(400);
        res.send({status: 'Requested data not received!'});
    } else {
        User.createUser(req.body.name, req.body.surname, req.body.birthDate, req.body.username, req.body.password, req.body.email,
        (createUserResponse) => {
            if (!createUserResponse.success) {
                res.status(404);
                res.send({success: false, status: createUserResponse.status});
            } else {
                res.send({success: true});
            }
        });
    }
});

router.delete('/', function (req, res, next) {
    checkToken(req.body.tokenId, res, (checkTokenResponse) => {
        if(!checkTokenResponse.success)
            return;

        User.deleteUser(checkTokenResponse.data.get('personId'), (deleteUserResponse) => {
            if (!deleteUserResponse.success) {
                res.status(404);
                res.send({success: false, status: 'Error while deleting data!'});
            } else {
                res.send({success: true});
            }
        });
    });
});

module.exports = router;
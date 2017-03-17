var express = require('express');
var router = express.Router();

var classes = require("./../controllers/classes");

router.get('/', function(req, res, next) {
    classes.checkUser(req.query.tokenId, res);

    res.json(classes.User.getUsers());
});

router.get('/:id', function(req, res, next) {
    classes.checkUser(req.query.tokenId, res);

    var user = classes.User.getUserById(req.params.id);
    if(user === undefined){
            res.status(404)
            res.send("User not found");
        }else {
            res.json(user);
        }
});

router.put('/', function(req, res, next){
    classes.checkUser(req.body.tokenId, res);

    classes.User.updateUser(req.body.personID,req.body.name, req.body.surname, req.body.birthDate, req.body.location)
    res.send('OK');
});

router.post('/', function(req, res, next){
    classes.checkUser(req.body.tokenId, res);

    classes.User.createUser(req.body.name, req.body.surname, req.body.birthDate, req.body.location)
    res.send('OK');
});

router.delete('/', function(req, res, next){
    classes.checkUser(req.body.tokenId, res);
    
    classes.User.deleteUser(req.body.listingId)
    res.send('OK');
});

module.exports = router;
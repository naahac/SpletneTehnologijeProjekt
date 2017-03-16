var express = require('express');
var router = express.Router();

var classes = require("./../controllers/classes");

/* GET users listing. */
router.get('/', function(req, res, next) {

});

router.get('/:id', function(req, res, next) {
    var user = classes.User.getUserById(req.params.id);
    if(user === undefined){
        res.status(404)
        res.send("User not found");
    }else {
        res.json(user);
    }

});

router.put('/', function(req, res, next){
    classes.User.updateUser(req.body.personID,req.body.name, req.body.surname, req.body.birthDate, req.body.location)
    res.send('OK');
});

router.post('/', function(req, res, next){
    classes.User.createUser(req.body.name, req.body.surname, req.body.birthDate, req.body.location)
    res.send('OK');
});

router.delete('/:id', function(req, res, next){
    classes.User.deleteUser(req.params.id)
    res.send('OK');
});

module.exports = router;

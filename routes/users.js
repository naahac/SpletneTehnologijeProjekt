var express = require('express');
var router = express.Router();

var classes = require("./../controllers/classes");

/* GET users listing. */
router.get('/', function(req, res, next) {

});

router.get('/:id', function(req, res, next) {
  res.json(classes.User.getUserById(req.params.id));
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

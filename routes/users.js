var express = require('express');
var router = express.Router();

var exp = require("./../controllers/classes");

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');

  res.json(new exp.Person(1, "Nataghanaeel", "ahac", "19.08.1993"));
});

router.get('/:id', function(req, res, next) {
  // res.send('respond with a resource');

  res.json(new exp.Person(req.params.id, "Nataghanaeel", "ahac", "19.08.1993"));
});

router.post('/', function(req, res, next){
  console.log(req.body);
});

module.exports = router;

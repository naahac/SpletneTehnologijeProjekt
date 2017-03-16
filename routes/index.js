var express = require('express');
var router = express.Router();

var classes = require("./../controllers/classes");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next){
  var tokenId = classes.User.login(req.body.username, req.body.password);

  if(tokenId == -1){
    res.status(404)
    res.send("User not found");
  }
  
  res.json(tokenId);
});

router.post('/logout', function(req, res, next){
    res.json(classes.User.logout(req.body.tokenId))
});

module.exports = router;

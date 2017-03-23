// var express = require('express');
// var router = express.Router();

// var classes = require("./../controllers/classes");
// var util = require('./utilities');

// router.get('/', function(req, res, next) {
//     util.checkToken(req.query.tokenId, res);

//     res.json(classes.Listing.getListings());
// });

// router.get('/', function(req, res, next) {
//     util.checkToken(req.query.tokenId, res);

//     var user = classes.Listing.getListingById(req.body.listingId);
//     if(user === undefined){
//             res.status(404)
//             res.send("User not found");
//         }else {
//             res.json(user);
//         }
// });

// router.put('/', function(req, res, next){
//     util.checkToken(req.body.tokenId, res);

//     classes.Listing.updateListing(req.body.listingId, req.body.title, req.body.releaseDate, req.body.authorId);
//     res.send('OK');
// });

// router.post('/', function(req, res, next){
//     util.checkToken(req.body.tokenId, res);

//     classes.Listing.createListing(req.body.title, req.body.releaseDate, req.body.authorId)
//     res.send('OK');
// });

// router.delete('/', function(req, res, next){
//     util.checkToken(req.body.tokenId, res);
    
//     classes.User.deleteListing(req.body.listingId)
//     res.send('OK');
// });

// module.exports = router;
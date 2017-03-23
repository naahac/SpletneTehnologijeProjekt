// var express = require('express');
// var router = express.Router();

// var classes = require("./../controllers/classes");
// var util = require('./utilities');

// router.get('/', function(req, res, next) {
//     util.checkToken(req.query.tokenId, res);

//     var pictures = classes.Picture.getPicturesByListingId(req.body.listingId);
//     if(pictures === undefined){
//             res.status(404)
//             res.send("User not found");
//         }else {
//             res.json(pictures);
//         }
// });

// router.post('/', function(req, res, next){
//     util.checkToken(req.body.tokenId, res);

//     classes.Listing.createListing(req.body.title, req.body.releaseDate, req.body.authorId)
//     res.send('OK');
// });

// router.delete('/', function(req, res, next){
//     util.checkToken(req.body.tokenId, res);
    
//     classes.Picture.deletePicture(req.body.pictureId)
//     res.send('OK');
// });

// module.exports = router;
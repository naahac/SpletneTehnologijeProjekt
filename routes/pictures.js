var express = require('express');
var router = express.Router();

var Picture = require("./../models/picture");


router.get('/:listingId', function(req, res, next) {
    // util.checkToken(req.query.tokenId, res);

    Picture.getPicturesByListingId(req.params.listingId, (result) =>{
        if(result === undefined || !result.success){
            res.status(404)
            res.send("User not found");
        }else {
            var imageBuffer = decodeBase64Image(result.data.attributes.picture);
            res.writeHead(200, {'Content-Type': imageBuffer.type});
            res.end(imageBuffer.buffer, 'binary'); // Send the file data to the browser.
        }
    });

});

function decodeBase64Image(dataString) {
    dataString = dataString.replace(/\n/g, '');
    let matches = dataString.match(/data:([A-Za-z-+\/]+);base64,(.+)/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.buffer = new Buffer(matches[2], 'base64');
    return response;
}

router.post('/', function(req, res, next){
    Picture.createPicture(req.body.picture, req.body.listingId)
    classes.Listing.createListing(req.body.title, req.body.releaseDate, req.body.authorId)
    res.send('OK');
});

router.delete('/', function(req, res, next){
    util.checkToken(req.body.tokenId, res);
    
    classes.Picture.deletePicture(req.body.pictureId)
    res.send('OK');
});

module.exports = router;
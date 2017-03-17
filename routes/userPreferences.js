var express = require('express');
var router = express.Router();

var classes = require("./../controllers/classes");

router.get('/books', function(req, res, next) {
    classes.checkUser(req.query.tokenId, res);

    var likes = classes.UserLikesBook.getBooks(req.query.tokenId);
    if(likes === undefined){
            res.status(404)
            res.send("Book not found");
        }else {
            res.json(likes);
        }
});

router.post('/books', function(req, res, next){
    classes.checkUser(req.body.tokenId, res);

    classes.UserLikesBook.likeBook(req.body.tokenId, req.body.bookId)
    res.send('OK');
});

router.delete('/books', function(req, res, next){
    classes.checkUser(req.body.tokenId, res);
    
    classes.UserLikesBook.unlikeBook(req.body.tokenId, req.body.bookId)
    res.send('OK');
});

router.get('/author', function(req, res, next) {
    classes.checkUser(req.query.tokenId, res);

    var likes = classes.UserLikesAuthor.getAuthor(req.query.tokenId);
    if(likes === undefined){
            res.status(404)
            res.send("Author not found");
        }else {
            res.json(likes);
        }
});

router.post('/author', function(req, res, next){
    classes.checkUser(req.body.tokenId, res);

    classes.UserLikesAuthor.likeAuthor(req.body.tokenId, req.body.authorId)
    res.send('OK');
});

router.delete('/author', function(req, res, next){
    classes.checkUser(req.body.tokenId, res);
    
    classes.UserLikesAuthor.unlikeAuthor(req.body.tokenId, req.body.authorId)
    res.send('OK');
});

router.get('/genre', function(req, res, next) {
    classes.checkUser(req.query.tokenId, res);

    var likes = classes.UserLikesBook.getBooks(req.query.tokenId);
    if(likes === undefined){
            res.status(404)
            res.send("Genre not found");
        }else {
            res.json(likes);
        }
});

router.post('/genre', function(req, res, next){
    classes.checkUser(req.body.tokenId, res);

    classes.UserLikesGenre.likeGenre(req.body.tokenId, req.body.genreId)
    res.send('OK');
});

router.delete('/genre', function(req, res, next){
    classes.checkUser(req.body.tokenId, res);
    
    classes.UserLikesGenre.unlikeGenre(req.body.tokenId, req.body.genreId)
    res.send('OK');
});

module.exports = router;
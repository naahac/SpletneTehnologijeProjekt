var express = require('express');
var router = express.Router();

var Book = require("./../models/book");
var checkToken = require('../utilities/checkToken');

router.get('/', function(req, res, next) {
    checkToken(req.query.tokenId, res);
    Book.getBooks((books) => {
        res.json(books);
    });
});

router.get('/:id', function(req, res, next) {
    checkToken(req.query.tokenId, res);

    Book.getBook(req.params.id, (result) => {
        if(result.success){
            res.json(result.data);
        }else {
            res.status(404);
            res.send("Book not found");
        }
    });
});

router.put('/', function(req, res, next){
    if (!req.body.tokenId || !req.body.bookId || !req.body.title || !req.body.releasedate || !req.body.authorId) {
        res.status(400);
        res.send({ status: 'Required data not received!' });
    }
    checkToken(req.body.tokenId, res);

    Book.updateBook(req.body.bookId,req.body.title, req.body.releasedate, req.body.authorId, (result) => {
        if(result.success){
            res.status(204)
            res.send('OK');
        }else{
            res.status(404);
            res.send('Update failed!');
        }
    });
});

router.post('/', function(req, res, next){
    if (!req.body.tokenId || !req.body.title || !req.body.releasedate || !req.body.authorId) {
        res.status(400);
        res.send({ status: 'Required data not received!' });
    }
    checkToken(req.body.tokenId, res);

    Book.createBook(req.body.title, req.body.releasedate, req.body.authorId, (result) => {
        if(result.success){
            res.status(204)
            res.send('OK');
        }else{
            res.status(404);
            res.send('Insert failed!');
        }
    });
});

router.delete('/', function(req, res, next){
    checkToken(req.body.tokenId, res);
    
    Book.deleteBook(req.body.bookId, (result) => {
        if(result.success){
            res.status(204)
            res.send('OK');
        }else{
            res.status(404);
            res.send('Delete failed!');
        }
    });
});

module.exports = router;
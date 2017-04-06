var express = require('express');
var router = express.Router();

var Book = require("./../models/book");
var checkToken = require('../utilities/checkToken');

router.get('/', function(req, res, next) {
    checkToken(req.query.tokenId, res);

    res.json(classes.Book.getBooks());
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
    checkToken(req.body.tokenId, res);

    Book.updateBook(req.body.personID,req.body.name, req.body.surname, req.body.birthDate, req.body.location, (result) => {
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
    checkToken(req.body.tokenId, res);

    Book.createBook(req.body.name, req.body.surname, req.body.birthDate, req.body.location, (result) => {
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
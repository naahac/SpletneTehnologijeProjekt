// var express = require('express');
// var router = express.Router();

// var classes = require("./../controllers/classes");
// var util = require('./utilities');

// router.get('/', function(req, res, next) {
//     util.checkToken(req.query.tokenId, res);

//     res.json(classes.Book.getBooks());
// });

// router.get('/:id', function(req, res, next) {
//     util.checkToken(req.query.tokenId, res);

//     var book = classes.Book.getBookById(req.params.id);
//     if(book === undefined){
//             res.status(404)
//             res.send("Book not found");
//         }else {
//             res.json(book);
//         }
// });

// router.put('/', function(req, res, next){
//     util.checkToken(req.body.tokenId, res);

//     classes.Book.updateBook(req.body.personID,req.body.name, req.body.surname, req.body.birthDate, req.body.location)
//     res.send('OK');
// });

// router.post('/', function(req, res, next){
//     util.checkToken(req.body.tokenId, res);

//     classes.Book.createBook(req.body.name, req.body.surname, req.body.birthDate, req.body.location)
//     res.send('OK');
// });

// router.delete('/', function(req, res, next){
//     util.checkToken(req.body.tokenId, res);
    
//     classes.Book.deleteBook(req.body.bookId)
//     res.send('OK');
// });

// module.exports = router;
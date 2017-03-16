var Person = require('./../models/person')
var User = require('./../models/user')
var Author = require('./../models/author')
var Book = require('./../models/book')
var Listing = require('./../models/listing')
var Chat = require('./../models/chat')
var Message = require('./../models/message')
var Picture = require('./../models/picture')
var Token = require('./../models/token')
var Genre = require('./../models/genre')
var UserLikesGenre = require('./../models/userlikesgenre')
var UserLikesAuthor = require('./../models/userlikesauthor')
var UserLikesBook = require('./../models/userlikesbook')
var SearchParameters = require('./../models/searchparameters')

function Testing(){
    var p = new Person(1, "Samo", "Taciga", "19.8.1993");
    console.log(u);

    var u = new User(1, "Samo", "Taciga", "19.8.1993", "Maribor");
    console.log(u);

    var a = new Author(1, "Samo", "Taciga", "19.8.1993", "Samo");
    console.log(a);
}

module.exports = {Person, User, Author, Book, Listing, Chat, Message, Picture, Token, Genre, UserLikesGenre, UserLikesAuthor, UserLikesBook, SearchParameters, Testing };


  
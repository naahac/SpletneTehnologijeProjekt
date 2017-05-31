let knex = require('knex')(require('../knexfile').development);
let bookshelf = require('bookshelf')(knex);

let Tokens = bookshelf.Model.extend({
    tableName: 'token',
	idAttribute: 'tokenId',
    user: function (){
        return this.belongsTo(Users, 'personId')
    }
});

let Users = bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'personId',
    token: function() {
        return this.hasMany(Tokens, 'personId');
    },
	listing: function() {
        return this.hasMany(Listings, 'userId');
    }
});

let Listings = bookshelf.Model.extend({
    tableName: 'listing',
	idAttribute: 'listingId',
    user: function (){
        return this.belongsTo(Users, 'personId')
    },
    book: function() {
        return this.belongsTo(Books, 'bookId');
    },
    picture: function() {
        return this.hasOne(Pictures, 'pictureId');
    }
});

let Books = bookshelf.Model.extend({
    tableName: 'book',
    idAttribute: 'bookId',
    author: function (){
        return this.belongsTo(Authors, 'authorId');
    },
    genre: function (){
        return this.belongsTo(Genres, 'genreId');
    },
    listing: function (){
        return this.hasOne(Listings, 'listingId');
    }
});

let Pictures = bookshelf.Model.extend({
    tableName: 'picture',
    idAttribute: 'pictureId',
    book: function() {
        return this.belongsTo(Listings, 'listingId');
    }
});

let Authors = bookshelf.Model.extend({
    tableName: 'author',
    idAttribute: 'authorId',
    book: function (){
        return this.hasOne(Books, 'bookId');
    }
});

let Genres = bookshelf.Model.extend({
    tableName: 'genre',
    idAttribute: 'genreId',
    book: function (){
        return this.hasOne(Books, 'bookId');
    }
});

module.exports = {Tokens, Users, Listings, Books, Pictures, Authors, Genres};
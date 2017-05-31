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
    }
});

let Books = bookshelf.Model.extend({
    tableName: 'book',
    idAttribute: 'bookId'
});

let Pictures = bookshelf.Model.extend({
    tableName: 'picture',
    idAttribute: 'pictureId'
});

let Authors = bookshelf.Model.extend({
    tableName: 'author',
    idAttribute: 'authorId'
});

let Genres = bookshelf.Model.extend({
    tableName: 'genre',
    idAttribute: 'genreId'
});

module.exports = {Tokens, Users, Listings, Books, Pictures, Authors, Genres};
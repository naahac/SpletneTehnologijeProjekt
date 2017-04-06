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
        return this.hasMany(Listings, 'personId');
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

module.exports = {Tokens, Users, Listings, Books};
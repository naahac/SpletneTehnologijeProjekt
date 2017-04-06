
exports.up = function(knex, Promise) {

    return knex.schema.createTable('user',(table) => {
        table.increments('personId').primary();
        table.string('birthDate');
        table.string('username');
        table.string('password');
        table.string('email');
        table.string('name');
        table.string('surname');
        table.string('location');
    }).createTable('token', (table) => {
        table.string('tokenId').primary();
        table.date('createDate');
        table.bool('active');
        table.integer('personId')
            .references('personId').inTable('user');
    }).createTable('author', (table) => {
        table.increments('personId').primary();
        table.string('birthDate');
        table.string('name');
        table.string('surname');
        table.string('pseudonym');
    }).createTable('genre', (table) => {
        table.increments('genreId').primary();
        table.string('genre');
    }).createTable('book', (table) => {
        table.increments('bookId').primary();
        table.string('title');
        table.date('releasedate');
        table.integer('authorId')
            .references('authorId').inTable('author');
    }).createTable('bookhasgenre', (table) => {
        table.increments('bookhasgenreId').primary();
        table.integer('bookId')
            .references('bookId').inTable('book');
        table.integer('genreId')
            .references('genreId').inTable('genre');
    }).createTable('listing', (table) => {
        table.increments('listingId').primary();
        table.string('title');
        table.string('description');
        table.date('dateadded');
        table.boolean('status');
        table.integer('userId')
            .references('personId').inTable('user');
        table.integer('bookId')
            .references('bookId').inTable('book');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user')
        .dropTable('token')
        .dropTable('author')
        .dropTable('genre')
        .dropTable('book')
        .dropTable('bookhasgenre')
        .dropTable('listing');
};

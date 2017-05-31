
exports.up = function(knex, Promise) {
	return knex.schema.createTable('author', (table) => {
      table.increments('authorId').primary();
      table.string('author');
	}).createTable('listing', (table) => {
        table.increments('listingId').primary();
        table.string('title');
        table.string('description');
        table.date('dateadded');
		table.float('latitude');
		table.float('longitude');
		table.boolean('status');
        table.integer('userId')
            .references('personId').inTable('user');
        table.integer('bookId')
            .references('bookId').inTable('book');
    }).createTable('book', (table) => {
        table.increments('bookId').primary();
        table.string('title');
        table.integer('genreId')
            .references('genreId').inTable('genre');
        table.integer('authorId')
            .references('authorId').inTable('author');
    });
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('author')
	.dropTable('listing')
    .dropTable('book')
    .dropTable('bookhasgenre');
};


exports.up = function(knex, Promise) {
	return knex.schema.createTable('chat', (table) => {
        table.increments('chatId').primary();
        table.date('date');
        table.integer('user1')
            .references('personId').inTable('user');
        table.integer('user2')
            .references('personId').inTable('user');
    }).createTable('message', (table) => {
        table.increments('messageId').primary();
		table.string('message');
        table.date('date');
        table.integer('chatId')
            .references('chatId').inTable('chat');
        table.integer('userId')
            .references('personId').inTable('user');
    });
};

exports.down = function(knex, Promise) {
  
};


exports.up = function(knex, Promise) {

    return knex.schema.createTable('users',(table) => {
        table.increments('personId').primary();
        table.string('birthDate');
        table.string('username');
        table.string('password');
        table.string('email');
        table.string('name');
        table.string('surname');
        table.string('location');
    }).createTable('token', (table) => {
        table.increments('tokenId').primary();
        table.date('createDate');
        table.bool('active');
        table.integer('userId')
            .unique().references('userId').inTable('users');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users').dropTable('token');
};
